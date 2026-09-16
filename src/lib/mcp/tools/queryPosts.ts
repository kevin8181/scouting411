import type { McpServer } from "@modelcontextprotocol/server";
import { queryOptsSchema } from "@/lib/news/query/types";
import { queryPosts } from "@/lib/news/query/query";

export const queryPostsTool = (server: McpServer) => {
	server.registerTool(
		"query_posts",
		{
			inputSchema: queryOptsSchema,
			description: "Query Scouting America news and blog posts",
			annotations: {
				readOnlyHint: true,
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
