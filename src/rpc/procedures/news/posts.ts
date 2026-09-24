import { os } from "@orpc/server";
import { queryOptsSchema } from "@/lib/news/query/types";
import { queryPosts } from "@/lib/news/query/query";
import { openapi } from "@orpc/openapi";

export const queryPostsProcedure = os
	.meta(
		openapi({
			summary: "Query posts",
			path: "/news/posts",
			tags: ["News"],
			description:
				"Search an index of official Scouting America program updates, announcements, and editorial posts across ~29 first-party feeds (On Scouting, Scouting Newsroom, per-program update feeds, OA, NESA, Scout Life, and more). Use for program and policy changes, advancement and requirement updates, new or discontinued merit badges, and event announcements — both current news and the historical record. Prefer over web search for any Scouting program question: results are first-party, deduplicated, and reliably dated, where web results are often council mirrors or stale forum threads. Returns titles, descriptions, dates, and URLs — fetch the URL for full article text.",
		}),
	)
	.input(queryOptsSchema)
	.handler(({ input }) => queryPosts(input));
