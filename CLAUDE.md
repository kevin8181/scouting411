# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Scouting411 (scouting411.org) is an Astro + React site that aggregates official Scouting America news and resources. It has two main content systems: a **news aggregator** (fetches/caches posts from external Scouting-related feeds) and a **resources directory** (a curated, hand-maintained list of official Scouting America links).

## Commands

Package manager is pnpm (enforced via `preinstall`; do not use npm/yarn).

- `pnpm dev` — start the Astro dev server
- `pnpm build` — production build
- `pnpm check` — runs the full CI suite locally: `astro check` (typecheck) + `format` (prettier write) + `lint` (eslint) + `knip` (unused code) — run this before considering a change done
- `pnpm format` / `pnpm format:check` — prettier write/check
- `pnpm lint` — eslint on `src/**/*`
- `pnpm knip` — finds unused files/exports/deps
- `pnpm validateResourceLinks` — runs `scripts/validateResourceLinks.ts`, which checks every URL in the resources data actually resolves; also run in CI
- `pnpm astro check` — Astro/TypeScript typechecking alone

There is no unit test runner in this repo (no test script/framework configured). CI (`.github/workflows/check.yaml`) runs prettier check, `astro check`, eslint, `validateResourceLinks`, and knip on every PR.

## Architecture

### News aggregator (`src/lib/news/`)

- **`config.ts`** — the single source of truth for all news feeds (`feedConfigs`). Each entry defines `name`, `slug`, `description`, `homepageUrl`, and an `adapter`. Many entries are commented out with `todo` notes explaining why a source is currently broken/disabled — check here before assuming a feed exists or works.
- **`fetching/adapters/`** — one adapter per upstream source type: `rss.ts` (generic RSS/Atom via `feedsmith`), `wordpress.ts` (WordPress REST API), `tta.ts` (bespoke Trail to Adventure adapter, currently unused/excluded from knip). Adapters implement `FeedAdapter` (`fetching/types.ts`) and expose `.execute()` returning normalized `PostData[]`.
- **`fetching/cache.ts`** — reads/writes each feed's fetched posts to Upstash Redis under key `posts:{slug}`. Feeds are never fetched live on request; only the cron job refreshes the cache.
- **`fetching/update.ts`** — `updateAllFeeds()` calls every adapter and writes results to the cache. Triggered by `src/pages/api/updateAllFeeds.ts`, which is invoked by a Vercel cron job (`vercel.json`, daily at midnight) and secured by the `CRON_SECRET` env var.
- **`feeds/feed.ts` / `feeds/feedManager.ts`** — `Feed` wraps a `FeedConfig` and reads its cached posts; `FeedManager` is the static registry over all feeds (`FeedManager.feeds`, `getFeedBySlug`, `getAllPosts()` merges+sorts posts across all feeds by date).
- **`posts/post.ts`** — post domain model built from cached `PostData`.
- **`query/`** — filtering (`filter.ts`), sorting (`sort.ts`), and query-param parsing (`queryParams.ts`, uses `qs`) for the news browse UI, exposed via `query/index.ts`.
- Feed pages: `src/pages/feeds/[slug]/rss.ts` and `atom.ts` re-publish a single source's cached posts as RSS/Atom; `src/pages/feeds/all/opml.ts` emits an OPML list of all feeds.

### Resources directory (`src/lib/resources/`)

- **`data.ts`** — hand-maintained array of `Resource` objects (see `types.ts`): each has `url`, `title`, `description`, and `tags` (`resourceType` + `topic`, drawn from `tags.ts`).
- Inclusion criteria for resources are documented in `README.md` — official Scouting America national-level publications only, not council/district/unit/third-party, not part of a series, not superseded, not a single document/form. New resources are requested via GitHub issues (see `.github/ISSUE_TEMPLATE/`).
- `scripts/validateResourceLinks.ts` validates every resource URL resolves; run this after adding/editing resources.

### Frontend

- Astro pages in `src/pages/`; interactive UI is React islands under `src/components/react/` and `src/components/layout/` (e.g. `cardList.tsx`, `post.tsx`, `resource.tsx`, sidebar nav components).
- `src/components/ui/` holds shadcn/ui components (config in `components.json`, style `base-luma`, icon library `lucide`). Add new shadcn components via the `shadcn` CLI rather than hand-writing them, so they stay consistent with the configured style/aliases.
- State: `nanostores` (`src/stores/postsQuery.ts`) for the news browse query state, persisted via `@nanostores/persistent`.
- Styling: Tailwind CSS v4 via `@tailwindcss/vite` (no separate tailwind config file — see `global.css` and `components.json`).
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).

### Env / secrets

Server-only env vars are schema-validated in `astro.config.ts` (`env.schema`): `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (Redis cache), `CRON_SECRET` (protects the feed-update cron endpoint). Local values live in `.env` (gitignored).

### Deployment

Deployed to Vercel via `@astrojs/vercel` adapter (`maxDuration: 300` for the feed-update function). Sitemap generation (`@astrojs/sitemap`) uses a custom XSLT stylesheet at `public/xslt/sitemap.xslt`.
