import type { McpServer } from "@modelcontextprotocol/server";
import { safe } from "@orpc/client";
import { z } from "zod";
import { rpc } from "@/rpc/client";
import { rankSlugSchema } from "@/lib/advancement/ranks/types";

export function listRanksTool(server: McpServer) {
	server.registerTool(
		"list_ranks",
		{
			description: `Every current Scouting America rank - Cub Scouting (Lion through Arrow of Light),
Scouts BSA (Scout through Eagle Scout), Sea Scouting, and Venturing - with its
slug, program, level, and rank art, ordered by program and then by level.
Sourced from the official Scouting America advancement API and refreshed daily.
Call get_rank with a slug for a rank's requirements.`,
			annotations: {
				readOnlyHint: true,
				title: "List Ranks",
			},
		},
		async () => {
			const ranks = await rpc.advancement.ranks.list();

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(ranks, null, "\t"),
					},
				],
			};
		},
	);
}

export function getRankTool(server: McpServer) {
	server.registerTool(
		"get_rank",
		{
			inputSchema: z.object({ slug: rankSlugSchema }),
			description: `A rank and its current official requirements, straight from the Scouting
America advancement API. Requirements change between versions, so use this
rather than memory when stating what a rank requires. \`versions\` lists the
requirement versions in use, newest first - usually one, but a rank being
transitioned to new requirements keeps the outgoing version too. Each version's
requirements are a flat list in display order; \`parentId\` and \`depth\` carry
the hierarchy, \`choose\` marks "do N of the following", and unlabeled entries
are notes rather than requirements. A version's \`footerHtml\` holds caveats
(alternative requirements, footnotes marked with <sup> in requirement text) that
matter when answering questions. Get slugs from list_ranks.`,
			annotations: {
				readOnlyHint: true,
				title: "Get Rank",
			},
		},
		async ({ slug }) => {
			const { error, data } = await safe(rpc.advancement.ranks.get({ slug }));

			if (error) {
				return {
					isError: true,
					content: [
						{
							type: "text",
							text: `${error.message}. Call list_ranks for valid slugs.`,
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
