# CLAUDE.md

Scouting411 (scouting411.org) is an Astro + React site that aggregates official Scouting America news and resources. Two content systems: a **news aggregator** (a cron-refreshed cache of external Scouting feeds, browsable and filterable) and a **resources directory** (a hand-maintained list of official links).

## Working here

Package manager is pnpm; scripts live in `package.json`.

- `pnpm check` is the gate — `astro check`, prettier write, eslint, knip. A change is done when it passes, not before.
- Knip runs with `--treat-config-hints-as-errors`: an unused export, file, or dependency fails the build. Remove dead exports as part of the refactor that orphans them.
- `pnpm validateResourceLinks` fetches every URL in `src/lib/resources/config.ts`. Run it after touching resources; CI runs it too.
- There is no unit test framework. Verify against `pnpm dev`, or drive the API by hand from the Scalar docs at `/api`.

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

Callers reach `queryPosts` through the `news.posts.query` procedure (see **API** below). Two exceptions call it directly: `src/lib/news/feeds/consumerOutput.ts`, because lib code sits below the router, and the MCP tools in `src/mcp/tools/`.

Re-publishing routes: `src/pages/feeds/[slug]/rss.ts` and `atom.ts` serve one source's cached posts; `feeds/all/opml.ts` lists them all.

### The browse island

`src/pages/news/browse/index.astro` decodes URL params server-side into `initialQuery`, then hands off to the `client:load` React island `_index.tsx`, which owns query state in `useState` and pushes it back to the URL with `history.replaceState`.

That island's effect holds a **stale-response guard**: a narrow query resolves faster than a broad one (one Redis read per selected feed), so an in-flight broad query can otherwise land last and clobber a narrow one. Preserve it when editing the effect.

## Resources

`src/lib/resources/config.ts` is a hand-maintained `Resource[]`. Inclusion criteria are in `README.md` — apply them as written; they are stricter than they look (national-level official publications only, no single item from a series, no superseded versions, no individual forms). Requests arrive as GitHub issues via `.github/ISSUE_TEMPLATE/`.

## API — `src/rpc/`

One oRPC router is the backend boundary for islands, SSR pages, and the public REST API. oRPC is on the **v2 beta** (exact-pinned); v1 docs and examples do not match its API.

- `router.ts` assembles the procedures in `procedures/`. A procedure is a thin wrapper over `src/lib`; logic lives in lib. Lib code imports nothing from `src/rpc/` — it would close a cycle (router → procedure → lib → client → `ssrClient.ts` → router).
- **Callers** import `rpc` from `@/rpc/client`, on server and client alike. Under `import.meta.env.SSR` it loads `ssrClient.ts`, which registers an in-process router client on `globalThis.$client`, so SSR never makes HTTP calls; in the browser that import is stripped and calls go to `/rpc`. Keep the router import in `client.ts` type-only — a value import bundles the router, and Redis with it, into every island.
- `$client` is shared across requests, so procedures get no per-request context. Astro has no request-scoped store: when a procedure needs one (auth), pass context per call or build a client per request in middleware on `Astro.locals`.

Two handlers serve the same router:

1. `src/pages/rpc/[...path].ts` — the RPC protocol, for islands only.
2. `src/pages/api/[...path].ts` — REST, public, CORS `*`. Treat its shape as a published contract. Also serves the spec at `/api/spec.json` and Scalar docs at `/api`, which `/developers` links to.

REST paths come from `.meta(openapi({ method, path }))` on each procedure; `method` defaults to POST, and a procedure without a path gets one derived from its router key. A specific file under `src/pages/api/` outranks the catch-all, so it silently shadows any procedure at the same path — `updateAllFeeds.ts` is the only one that belongs there.

The feed re-publishing routes are plain Astro routes, documented by hand in `openapi/feedPaths.ts` (merged into the spec as `base.paths`, with a per-path `servers` override so they resolve at the site root). Update it when those routes change.

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
