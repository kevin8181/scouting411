import type { McpServer } from "@modelcontextprotocol/server";
import { safe } from "@orpc/client";
import { z } from "zod";
import { rpc } from "@/rpc/client";
import { adventureSlugSchema } from "@/lib/advancement/adventures/types";
import { rankSlugSchema } from "@/lib/advancement/ranks/types";

export function listAdventuresTool(server: McpServer) {
	server.registerTool(
		"list_adventures",
		{
			inputSchema: z.object({
				rank: rankSlugSchema
					.optional()
					.describe(
						'Only return adventures for this Cub Scout rank, by its slug: "lion", "tiger", "wolf", "bear", "webelos", or "arrow-of-light". Omit for every rank.',
					),
			}),
			description: `Every current Cub Scout adventure, with its slug, rank, whether it is required
for that rank or an elective, and adventure art. Ordered by rank, required
adventures before electives. Sourced from the official Scouting America
advancement API and refreshed daily, so it reflects the current program - prefer
it over memory or web search for which adventures exist, since the program was
overhauled in 2024. Call get_adventure with a slug for an adventure's
requirements, and get_rank with a rank's slug for how many electives it needs.`,
			annotations: {
				readOnlyHint: true,
				title: "List Adventures",
			},
		},
		async ({ rank }) => {
			const adventures = await rpc.advancement.adventures.list({ rank });

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(adventures, null, "\t"),
					},
				],
			};
		},
	);
}

export function getAdventureTool(server: McpServer) {
	server.registerTool(
		"get_adventure",
		{
			inputSchema: z.object({ slug: adventureSlugSchema }),
			description: `A Cub Scout adventure and its current official requirements, straight from the
Scouting America advancement API. Requirements changed substantially in 2024, so
use this rather than memory when stating what an adventure requires.
Requirements are a flat list in display order; \`parentId\` and \`depth\` carry
the hierarchy, \`choose\` marks "do N of the following", and unlabeled entries
are notes rather than requirements. Get slugs from list_adventures.`,
			annotations: {
				readOnlyHint: true,
				title: "Get Adventure",
			},
		},
		async ({ slug }) => {
			const { error, data } = await safe(
				rpc.advancement.adventures.get({ slug }),
			);

			if (error) {
				return {
					isError: true,
					content: [
						{
							type: "text",
							text: `${error.message}. Call list_adventures for valid slugs.`,
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
