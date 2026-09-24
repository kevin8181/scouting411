import { os } from "@orpc/server";
import { getFeedConsumerOutput } from "@/lib/news/feeds/consumerOutput";
import { openapi } from "@orpc/openapi";

/** metadata and content-quality stats for every feed. returns no posts */
export const listFeedsProcedure = os
	.meta(
		openapi({
			summary: "List all feeds",
			method: "GET",
			path: "/news/feeds",
			tags: ["News"],
			description: `Catalog of all indexed news feeds — the map of what this server covers. Returns each feed's slug, a description of its editorial character, its source homepage, and post counts.

Call it to find out more about the feeds on offer, what they're about, how much they lean authoritative vs editorial, metrics about the quality of their post data, and other metadata.`,
		}),
	)
	.handler(() => getFeedConsumerOutput());
