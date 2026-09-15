import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

export const sayHelloTool = (server: McpServer) => {
	server.registerTool(
		"say_hello",
		{
			inputSchema: z.object({ name: z.string().describe("Your name") }),
			description: "Say hello to the world",
			annotations: {
				readOnlyHint: true,
			},
		},
		({ name }) => ({
			content: [{ type: "text", text: `Hello world, I'm ${name}!` }],
		}),
	);
};
