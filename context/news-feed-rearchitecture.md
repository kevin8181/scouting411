# News feed system re-architecture

Notes from a design interview about re-architecting `src/lib/news/`. Captures the
reasoning and decisions made; implementation specifics are still open where noted.

## Motivating reasons

1. **Durability** — a single feed's fetch failure shouldn't take down the whole
   update run or go unnoticed.
2. **Boundary clarity** — the ingestion/caching side and the query/consumption
   side are too tangled; you shouldn't have to hold both mental models at once
   when working on either.
3. **Functional query system** — the query layer (filter/sort/paginate) exists
   but isn't actually wired up to a working UI.
4. **Performance/scale** — the current read path doesn't scale with more feeds
   or more posts per feed.

## Current state (as found)

- `cache/update.ts`: `updateAllFeeds()` runs every feed's `adapter.execute()`
  concurrently via `Promise.all` and each feed writes its own cache entry
  independently as it finishes. So one feed's cache isn't corrupted by another
  feed's failure — but the `Promise.all` itself rejects on the first throw,
  the cron API route (`src/pages/api/updateAllFeeds.ts`) has no try/catch, and
  there's no per-feed failure record beyond ephemeral Vercel logs.
- `cache/cache.ts`: `getFeedPosts()` reads a feed's *entire* cached JSON array
  from Redis (`redis.json.get`) and hydrates it into `Post[]`. It's called
  directly by `FeedManager.getAllPosts()`, bypassing the query layer. There's
  already a `todo` comment on this function: "push all post access to go
  through the query system. keep this internal."
- `query/index.ts`: `queryPosts()` calls `FeedManager.getAllPosts()` — i.e.
  pulls full history for *every* feed — then filters/sorts/paginates in
  memory. Cost scales with total history × feed count regardless of what's
  actually requested.
- `pages/news/browse/_index.tsx`: mostly a static mock. Hardcoded select
  options, `href="#"` pagination links, sources checkboxes always checked —
  not wired to `$postsQuery` (nanostore) or any fetch call.
- `src/pages/news/browse/index.astro` currently does SSR: decodes URL params,
  calls `queryPosts` server-side, passes `results` as a prop, `client:load`.
- `src/pages/api/posts.ts` (REST GET/POST) and `src/stores/postsQuery.ts`
  (persistent nanostore) exist but are leftover exploration — not part of the
  target design.

## Decisions made

### 1. Durability
- Per-feed fetch failures should not abort the whole update run or destroy
  other feeds' cached data (largely already true structurally — needs the
  `Promise.all` rejection / missing try-catch fixed so the *reporting* matches
  the *actual* per-feed isolation).
- Open / not yet decided:
  - What happens to a feed's cached posts when its fetch fails (leave stale
    cache as-is vs. mark it errored so the UI can surface it).
  - Alerting channel for failures beyond Vercel's auto-clearing logs (email,
    Slack/Discord webhook, Sentry, etc.) — undecided.

### 2. Boundary clarity (ingestion/caching vs. query/consumption)
- Principle: keep ingestion/caching as far from UI-level consumers as
  possible. There should be a clean read interface for feed/post data that has
  conceptually nothing to do with adapters or cache writing — working on one
  side should never require holding the other side's internals in your head.
- Exact shape of the interface (a single query-API entry point vs. a fully
  independent read-model with its own types distinct from ingestion's
  `PostData`/`Feed`) is **not yet decided** — flagged for later.
- This principle is reinforced by decision 4 below: the storage/ingestion
  layer sits behind an interface that the query layer depends on, so it can be
  swapped later without the query layer changing.

### 3. Functional query system
- The browse page (`/news/browse`) becomes a **fully static/prerendered
  shell** (`prerender: true`) — no server-side `queryPosts` call in the
  `.astro` file at all.
- A client-side island fetches data on mount and on every filter/sort/page
  change (client-rendered, no SSR for the results).
- **Not a REST API** — explicitly rejected `/api/posts` to avoid maintaining
  duplicate request/response types by hand. Instead, use an **Astro Action**:
  the existing `queryOptsSchema` (already zod) becomes the action's input
  validator directly, and the action calls `queryPosts` server-side. This
  gives full type inference client → server with no schema duplication, and
  Astro Actions can serialize richer types (e.g. `Post.date` as a real `Date`)
  without extra work.
- **URL query params are the source of truth** for filter/sort/page state —
  results must be shareable and bookmarkable via URL.
- The existing `$postsQuery` nanostore and `src/pages/api/posts.ts` REST route
  are leftover exploration and should be dropped/replaced by the above.

### 4. Performance/scale
- Current read path (full per-feed JSON blob × every feed × every query) is
  the specific bottleneck flagged for fixing.
- Open to changing the Redis storage shape (e.g. sorted sets by date enabling
  range reads instead of one JSON blob per feed) **or** replacing Redis
  entirely (a real database, or even a self-hosted RSS engine like Miniflux/
  FreshRSS — which would also help with reason 1's per-feed retry/alerting).
- No commitment yet on which backend — but the requirement is that the
  storage/ingestion layer must sit behind an interface, so switching backends
  later is "write a new implementation," not a query-layer rewrite. This is
  the same seam identified in decision 2.

## Open questions (deferred, not decided)

- Exact shape of the read-side interface/types (how independent from
  ingestion's `PostData`/`FeedConfig` should `Post`/`Feed` be).
- Stale-cache behavior on a feed fetch failure.
- Alerting channel/mechanism for fetch failures.
- Final storage backend/schema for scale (Redis reshape vs. DB vs. hosted RSS
  engine) — deliberately left open, pending a decision on operational
  complexity appetite (Vercel + managed store only, vs. running an
  always-on second service).
- Sequencing of the four workstreams relative to each other.
