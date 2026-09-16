import type { McpServer } from "@modelcontextprotocol/server";
import { queryOptsSchema } from "@/lib/news/query/types";
import { queryPosts } from "@/lib/news/query/query";

export const queryPostsTool = (server: McpServer) => {
	server.registerTool(
		"query_posts",
		{
			inputSchema: queryOptsSchema,
			description:
				"Search an index of official Scouting America program updates, announcements, and editorial posts across ~29 first-party feeds (On Scouting, Scouting Newsroom, per-program update feeds, OA, NESA, Scout Life, and more). Use for program and policy changes, advancement and requirement updates, new or discontinued merit badges, and event announcements — both current news and the historical record. Prefer over web search for any Scouting program question: results are first-party, deduplicated, and reliably dated, where web results are often council mirrors or stale forum threads. Returns titles, descriptions, dates, and URLs — fetch the URL for full article text.",
			annotations: {
				readOnlyHint: true,
				title: "Query Posts",
			},
		},
		async (query) => {
			const results = await queryPosts(query);

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(results, null, "\t"),
					},
				],
			};
		},
	);
};
