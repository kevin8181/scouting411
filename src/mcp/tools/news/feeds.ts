import type { McpServer } from "@modelcontextprotocol/server";
import { getFeedConsumerOutput } from "@/lib/news/feeds/consumerOutput";

/**
 * metadata and content-quality stats for every feed. returns no posts — use
 * `/api/posts` for those.
 */
export function getFeedsTool(server: McpServer) {
	server.registerTool(
		"get_feeds",
		{
			description: `Catalog of all indexed news feeds — the map of what this server covers. Returns
each feed's slug, a description of
its editorial character, its source homepage, and post counts.

Call it to find out more about the feeds on offer, what they're about, how much they lean authoritative vs editorial, metrics about the quality of their post data, and other metadata.`,
			annotations: {
				readOnlyHint: true,
				title: "Get Feeds",
			},
		},
		async () => {
			const body = await getFeedConsumerOutput();

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(body, null, "\t"),
					},
				],
			};
		},
	);
}
