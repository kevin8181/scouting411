export const prerender = false;

import type { APIRoute } from "astro";
import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

const handler = createMcpHandler(() => {
	const server = new McpServer({
		name: "Scouting411",
		version: "1.0.0",
	});

	server.registerTool(
		"say_hello",
		{
			inputSchema: z.object({ name: z.string().describe("Your name") }),
			description: "Say hello to the world",
		},
		({ name }) => ({
			content: [{ type: "text", text: `Hello world, I'm ${name}!` }],
		}),
	);

	return server;
});

export const ALL: APIRoute = ({ request }) => handler.fetch(request);
