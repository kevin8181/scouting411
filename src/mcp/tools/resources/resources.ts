import { rpc } from "@/rpc/client";
import type { McpServer } from "@modelcontextprotocol/server";

export function queryResourcesTool(server: McpServer) {
	server.registerTool(
		"query_resources",
		{
			description: `A list of all resources on Scouting411. Resources are external links to
websites, tools, reference documents, and other items of interest.`,
			annotations: {
				readOnlyHint: true,
				title: "Get Resources",
			},
		},
		async () => {
			const resources = await rpc.resources.query();

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(resources, null, "\t"),
					},
				],
			};
		},
	);
}
