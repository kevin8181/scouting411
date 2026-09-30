import { os } from "@orpc/server";
import { openapi } from "@orpc/openapi";
import { getSystemStatus, systemStatusSchema } from "@/lib/status/status";

export const getSystemStatusProcedure = os
	.meta(
		openapi({
			summary: "Get system status",
			method: "GET",
			path: "/status",
			tags: ["Status"],
			description:
				"The live state of every system monitored on the official Scouting America status page (status.scouting.org), such as my.Scouting, Scoutbook, and the Scouting API. `operational` is false when any monitor is down. Read live from upstream and reused for up to a minute.",
		}),
	)
	.output(systemStatusSchema)
	.handler(() => getSystemStatus());
