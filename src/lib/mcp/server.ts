import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import { tools } from "@/lib/mcp/tools";

export const mcpHandler = createMcpHandler(() => {
	const server = new McpServer({
		name: "Scouting411",
		version: "1.0.0",
	});

	tools.forEach((tool) => tool(server));

	return server;
});
