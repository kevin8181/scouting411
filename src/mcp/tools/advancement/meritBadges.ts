import type { McpServer } from "@modelcontextprotocol/server";
import { safe } from "@orpc/client";
import { z } from "zod";
import { rpc } from "@/rpc/client";
import { meritBadgeSlugSchema } from "@/lib/advancement/meritBadges/types";

export function listMeritBadgesTool(server: McpServer) {
	server.registerTool(
		"list_merit_badges",
		{
			description: `Every current Scouting America merit badge, with its slug, categories, whether it is
required for Eagle, and badge art. Sourced from the official Scouting America
advancement API and refreshed daily, so it reflects the current official list -
prefer it over memory or web search for which badges exist and which are
Eagle-required. Call get_merit_badge with a slug for a badge's requirements.`,
			annotations: {
				readOnlyHint: true,
				title: "List Merit Badges",
			},
		},
		async () => {
			const meritBadges = await rpc.advancement.meritBadges.list();

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(meritBadges, null, "\t"),
					},
				],
			};
		},
	);
}

export function getMeritBadgeTool(server: McpServer) {
	server.registerTool(
		"get_merit_badge",
		{
			inputSchema: z.object({ slug: meritBadgeSlugSchema }),
			description: `A merit badge and its current official requirements, straight from the Scouting
America advancement API. Requirements change between versions, so use this
rather than memory when stating what a badge requires. Requirements are a flat
list in display order; \`parentId\` and \`depth\` carry the hierarchy, \`choose\`
marks "do N of the following", and unlabeled entries are notes rather than
requirements. Get slugs from list_merit_badges.`,
			annotations: {
				readOnlyHint: true,
				title: "Get Merit Badge",
			},
		},
		async ({ slug }) => {
			const { error, data } = await safe(
				rpc.advancement.meritBadges.get({ slug }),
			);

			if (error) {
				return {
					isError: true,
					content: [
						{
							type: "text",
							text: `${error.message}. Call list_merit_badges for valid slugs.`,
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
