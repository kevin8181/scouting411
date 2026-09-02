# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Scouting411 (scouting411.org) is an Astro + React site that aggregates official Scouting America news and resources. Two content systems: a **news aggregator** (cron-refreshed cache of external Scouting feeds, browsable/filterable) and a **resources directory** (a hand-maintained list of official Scouting America links).

## Commands

Package manager is pnpm (`packageManager` pinned; Node >= 22.13.0 enforced via `engineStrict`).

- `pnpm dev` — Astro dev server
- `pnpm build` / `pnpm preview`
- `pnpm check` — the local CI suite: `astro check` (typecheck) + `format` (prettier write) + `lint` + `knip`. Run before considering a change done.
- `pnpm format:check` / `pnpm lint` / `pnpm knip` — individual checks
- `pnpm validateResourceLinks` — hits every URL in `src/lib/resources/config.ts` to confirm it resolves. Run after touching resources; also runs in CI.

There is no unit test framework in this repo. CI (`.github/workflows/check.yaml`, on PRs) runs prettier check, `astro check`, eslint, `validateResourceLinks`, and knip.

`knip --treat-config-hints-as-errors` means unused exports/files/deps fail the build. Don't leave dead exports behind after a refactor.

The `bruno/` directory holds a [Bruno](https://usebruno.com) collection for hitting the posts API by hand.

## Architecture

### News: ingest vs. query

The news system is deliberately split into two halves that meet only at the Redis cache. Keep that boundary — `context/news-feed-rearchitecture.md` records the design reasoning behind it.

**Write side (cron only):**

- `src/lib/news/feeds/config.ts` — single source of truth for every feed. Each entry: `name`, `slug`, `description`, `homepageUrl`, `adapter`, `defaultVisible`. Many entries are commented out with `todo` notes explaining why the source is broken or unavailable — read here before assuming a feed exists. The exported array's literal type drives `FeedSlug` (a `z.enum` over the slugs), so adding a feed propagates types everywhere.
- `src/lib/news/ingest/adapters/` — one adapter per upstream type: `rss.ts` (generic RSS/Atom via `feedsmith`), `wordpress.ts` (WordPress REST API), `tta.ts` (bespoke Trail to Adventure). Each implements `FeedAdapter` (`ingest/types.ts`) with `.execute(): Promise<PostData[]>`.
- `src/lib/news/posts/update.ts` — `updateAllFeeds()` runs every adapter concurrently, isolating failures per feed so one bad source doesn't abort the run. A feed that returns zero posts is treated as a failure and its existing cache is kept.
- `src/pages/api/updateAllFeeds.ts` — the only caller; a Vercel cron job (`vercel.json`, daily at midnight) guarded by a `Bearer ${CRON_SECRET}` auth header.

**Read side (every request):**

- `src/lib/news/posts/cache.ts` — Redis JSON get/set at key `posts:{slug}`. Feeds are **never** fetched live on a page request.
- `src/lib/news/posts/fetch.ts` — `getMultipleFeedsPosts(slugs)` does one Redis read per selected feed and hydrates `PostData` into `Post` (`posts/post.ts`) with its `Feed` attached. There's a `todo` to make these internal — prefer routing new post access through the query layer.
- `src/lib/news/query/` — `query.ts`'s `queryPosts(opts)` is the entry point: fetch selected feeds → `filter.ts` → `sort.ts` → `paginateArray`. `types.ts` defines `queryOptsSchema` (zod), whose defaults (`defaultVisibleFeeds`, date-desc, 20/page) are what an empty query resolves to. `queryParams.ts` encodes/decodes that shape to/from URL search params via `qs` — note the `allowEmptyArrays` comment there; dropping it silently resurrects all feeds when the user deselects every source.

**Feeds are data; config supplies the types.** `feeds/feedManager.ts` exposes the hydrated, alphabetized `feeds` array plus `getFeedBySlug` / `isFeedSlug`. `defaultVisibleFeeds` lives in `feeds/config.ts` instead, derived from the raw configs: hydration imports `query/queryParams.ts`, so sourcing it from `feedManager` made `query/types.ts` → `feedManager` → `feed` → `queryParams` → `query/types.ts` a cycle and blew up island hydration with a tdz error. Keep the query layer off `feedManager`. `feeds/feed.ts` hydration is what assigns each feed its canonical URLs (`/news/sources/{slug}`, `/feeds/{slug}/rss`, `/feeds/{slug}/atom`), so link to `feed.urls.*` rather than rebuilding paths.

Re-publishing routes: `src/pages/feeds/[slug]/rss.ts` and `atom.ts` serve a single source's cached posts; `src/pages/feeds/all/opml.ts` emits an OPML list of all feeds.

### How the browse UI talks to the server

Three entry points into `queryPosts`, all sharing `queryOptsSchema`:

1. **Astro action** (`src/actions/index.ts`) — what the browse island uses for interactive re-queries.
2. **REST** (`src/pages/api/posts.ts`) — public GET (query params) / POST (JSON body), documented on the `/developers` page.
3. **Direct call** — SSR pages (`index.astro`, `news/stats`) call `queryPosts` server-side.

`src/pages/news/browse/index.astro` decodes URL params server-side into `initialQuery`, then hands off to the `client:load` React island `_index.tsx`, which owns query state in `useState`. That island's effect has a deliberate stale-response guard (narrow queries resolve faster than broad ones, so an in-flight broad query can otherwise land last and clobber a narrow one); preserve it when editing.

### Resources

`src/lib/resources/config.ts` is a hand-maintained `Resource[]` (`url`, `title`, `description`). Inclusion criteria are in `README.md`: official Scouting America national-level publications only — no council/district/unit/third-party, not one item in a series, not a superseded version, not an individual document or form. Requests come in as GitHub issues (`.github/ISSUE_TEMPLATE/`).

### Frontend conventions

- Routes are `.astro` files under `src/pages/`. Files prefixed with `_` (e.g. `_index.tsx`, `_filterSidebar.tsx`) are **not routes** — they're that page's React island, colocated with it. Follow the convention for new page-specific components.
- `Layout.astro` wraps `RootLayout.astro` + the `AppShell` island (sidebar chrome, command palette, dark mode); pages just supply `title` and children.
- `src/components/ui/` is shadcn/ui — style `base-vega`, icons `lucide`, built on `@base-ui/react` (not Radix). Add components via the `shadcn` CLI so they match the configured style and aliases (`components.json`). Knip is configured to ignore unused exports in this directory.
- Cross-page reusable islands live in `src/components/react/`; layout/sidebar pieces in `src/components/layout/`.
- Tailwind v4 via `@tailwindcss/vite` — there is no `tailwind.config`; the theme lives in `src/global.css`. Fonts are declared in `astro.config.ts` via Astro font providers, not imported in CSS.
- Path alias `@/*` → `src/*`. Imports are written as full `@/`-prefixed paths even within the same directory — match that.
- Prettier uses **tabs**, with the tailwind class-sorting plugin.

### Env / deployment

Server env vars are schema-validated in `astro.config.ts` and imported from `astro:env/server`: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `CRON_SECRET`. Local values live in `.env` (gitignored). Deployed to Vercel via `@astrojs/vercel` (`maxDuration: 300` for the feed-update function). `trailingSlash: "never"`. Sitemap uses a custom XSLT at `public/xslt/sitemap.xslt`.

Pages and routes that read Redis must set `export const prerender = false`.
