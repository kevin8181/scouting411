# CLAUDE.md

Scouting411 (scouting411.org) is an Astro + React site that aggregates official Scouting America news and resources. Two content systems: a **news aggregator** (a cron-refreshed cache of external Scouting feeds, browsable and filterable) and a **resources directory** (a hand-maintained list of official links).

## Working here

Package manager is pnpm; scripts live in `package.json`.

- `pnpm check` is the gate — `astro check`, prettier write, eslint, knip. A change is done when it passes, not before.
- Knip runs with `--treat-config-hints-as-errors`: an unused export, file, or dependency fails the build. Remove dead exports as part of the refactor that orphans them.
- `pnpm validateResourceLinks` fetches every URL in `src/lib/resources/config.ts`. Run it after touching resources; CI runs it too.
- There is no unit test framework. Verify against `pnpm dev`, or drive the posts API by hand with the Bruno collection in `bruno/`.

## News: ingest, cache, query

Three layers that meet only at the Redis cache. **A page request never fetches upstream** — it only reads Redis.

### Feed config is the source of truth

`src/lib/news/feeds/config.ts` holds every feed as a `const satisfies FeedConfig[]`, so the literal type drives `FeedSlug` (a `z.enum` in `feeds/types.ts`) and adding a feed propagates types everywhere. Entries carry `todo` notes explaining why a candidate source is broken, paginated badly, or unavailable — read them before concluding a feed is missing by oversight. `context/notes.md` is the scratchpad of candidate sources not yet built.

`feeds/feed.ts` hydrates configs into the alphabetized `feeds` array and assigns each feed its canonical `links` (overview, browsePosts, rss, atom). Link to `feed.links.*` rather than rebuilding those paths.

**The cycle trap:** `feed.ts` imports `query/queryParams.ts` to build `links.browsePosts`. So `query/types.ts` sources `defaultVisibleFeeds` from `feeds/config.ts`, not `feeds/feed.ts` — importing it from `feed.ts` closes a cycle back through `queryParams.ts` and breaks island hydration with a TDZ error at runtime, which typecheck will not catch. Keep the query layer importing from `feeds/config.ts` and `feeds/types.ts` only.

### Ingest (cron only) — `src/lib/news/ingest/`

One adapter per upstream type in `upstream/adapters/` (`rss.ts` via feedsmith, `wordpress.ts` REST, `statuspage.ts`, `podcast-archive/`), each implementing `FeedAdapter` from `upstream/types.ts`. New upstream shape means a new adapter, not a special case inside an existing one.

`upstream/ingestFeed.ts` runs one feed's adapter and pipes the output through `upstream/normalize.ts` — a zod schema that strips HTML, decodes entities, pins URLs to http(s), and coerces each upstream's date format to an ISO string. Adapters return raw-ish data; normalize enforces the invariants `PostData` claims.

`execute/ingestAllFeeds.ts` runs every feed concurrently and isolates failures per feed, so one bad upstream cannot abort the run. **Zero posts counts as a failure** and the existing cache is left in place. Its only caller is `src/pages/api/updateAllFeeds.ts`, a daily Vercel cron (`vercel.json`) guarded by a `Bearer ${CRON_SECRET}` header.

### Cache — `src/lib/news/cache/`

`cache.ts` is the whole Redis surface: JSON read/write at key `posts:{slug}`. `fetch.ts` reads one key per selected feed and hydrates `PostData` into `Post` with its `Feed` attached. Route new post access through the query layer rather than calling `fetch.ts` directly.

### Query — `src/lib/news/query/`

`query.ts`'s `queryPosts(opts)` is the single entry point: fetch selected feeds → `filter.ts` → `sort.ts` → `paginateArray`. `types.ts` defines `queryOptsSchema`, whose defaults are what an empty query resolves to.

`queryParams.ts` encodes that shape to and from URL search params via `qs`. Its header comment explains why `allowEmptyArrays` and `arrayFormat: "brackets"` are both load-bearing — read it before changing those options; either one silently resurrects every feed when the user deselects all sources.

### Three ways in

All three share `queryOptsSchema`, so a change to the schema changes all of them at once:

1. **Astro action** (`src/actions/index.ts`) — what the browse island calls for interactive re-queries.
2. **REST** (`src/pages/api/news/posts.ts`, `feeds.ts`) — public, documented on the `/developers` page. Treat the shape as a published contract.
3. **Direct call** — SSR pages (`index.astro`, `news/stats`) call `queryPosts` server-side.

Re-publishing routes: `src/pages/feeds/[slug]/rss.ts` and `atom.ts` serve one source's cached posts; `feeds/all/opml.ts` lists them all.

### The browse island

`src/pages/news/browse/index.astro` decodes URL params server-side into `initialQuery`, then hands off to the `client:load` React island `_index.tsx`, which owns query state in `useState` and pushes it back to the URL with `history.replaceState`.

That island's effect holds a **stale-response guard**: a narrow query resolves faster than a broad one (one Redis read per selected feed), so an in-flight broad query can otherwise land last and clobber a narrow one. Preserve it when editing the effect.

## Resources

`src/lib/resources/config.ts` is a hand-maintained `Resource[]`. Inclusion criteria are in `README.md` — apply them as written; they are stricter than they look (national-level official publications only, no single item from a series, no superseded versions, no individual forms). Requests arrive as GitHub issues via `.github/ISSUE_TEMPLATE/`.

## Conventions

- Routes are `.astro` files under `src/pages/`. Files prefixed with `_` (`_index.tsx`, `_filterSidebar.tsx`) are that page's React island, colocated with it — follow this for new page-specific components. Cross-page islands go in `src/components/react/`, chrome in `src/components/layout/`.
- **Any page or route that reads Redis must `export const prerender = false`.**
- `Layout.astro` wraps `RootLayout.astro` plus the `AppShell` island (sidebar, command palette, dark mode); pages supply `title` and children.
- `src/components/ui/` is shadcn/ui, style `base-vega`, icons `lucide`, built on `@base-ui/react` (not Radix). Add components with the `shadcn` CLI so they match `components.json`. Knip ignores unused exports here.
- Tailwind v4 via `@tailwindcss/vite` — there is no `tailwind.config`; the theme lives in `src/global.css`. Fonts are declared in `astro.config.ts` via Astro font providers, not imported in CSS.
- Path alias `@/*` → `src/*`. Write imports as full `@/` paths even within the same directory — match the surrounding files.
- Prettier uses **tabs**, with the Tailwind class-sorting plugin.

## Env and deployment

Server env vars are schema-validated in `astro.config.ts` and imported from `astro:env/server`: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `CRON_SECRET`. Local values live in a gitignored `.env`. Deployed to Vercel via `@astrojs/vercel` (`maxDuration: 300` for the feed-update function). `trailingSlash: "never"`.
