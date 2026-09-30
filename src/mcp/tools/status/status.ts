import type { McpServer } from "@modelcontextprotocol/server";
import { safe } from "@orpc/client";
import { rpc } from "@/rpc/client";

export function getSystemStatusTool(server: McpServer) {
	server.registerTool(
		"get_system_status",
		{
			description: `The live state of every system on the official Scouting America status page
(status.scouting.org) - my.Scouting, Scoutbook, Scoutbook Plus, Be-A-Scout,
Training, Scoutshop, the Scouting API, authentication, and more. Each monitor is
up, down, pending (a check is failing but not yet confirmed down), maintenance,
or unknown (no checks yet). \`operational\` is false when any monitor is down.
Call it when someone reports a Scouting site or app not working, to tell an
outage apart from a problem on their end. Read live and reused for up to a
minute. It carries no incident history, and covers national Scouting America
systems only - Order of the Arrow systems post maintenance to the
oa-system-maintenance feed in query_posts instead.`,
			annotations: {
				readOnlyHint: true,
				title: "Get System Status",
			},
		},
		async () => {
			const { error, data } = await safe(rpc.status.get());

			if (error) {
				return {
					isError: true,
					content: [
						{
							type: "text",
							text: `Could not read status.scouting.org: ${error.message}. The status page itself may be down.`,
						},
					],
				};
			}

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(data, null, "\t"),
					},
				],
			};
		},
	);
}
