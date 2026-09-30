import { ORPCError, os } from "@orpc/server";
import { openapi } from "@orpc/openapi";
import { z } from "zod";
import { getRank, listRanks } from "@/lib/advancement/ranks/query";
import {
	rankDetailSchema,
	rankSchema,
	rankSlugSchema,
} from "@/lib/advancement/ranks/types";

export const listRanksProcedure = os
	.meta(
		openapi({
			summary: "List ranks",
			method: "GET",
			path: "/advancement/ranks",
			tags: ["Advancement"],
			description:
				"Every current Scouting America rank across Cub Scouting, Scouts BSA, Sea Scouting, and Venturing, ordered by program and then by level within each program. Sourced from the official Scouting America advancement API and refreshed daily. Use a rank's slug to fetch its requirements.",
		}),
	)
	.output(z.array(rankSchema))
	.handler(() => listRanks());

export const getRankProcedure = os
	.meta(
		openapi({
			summary: "Get a rank",
			method: "GET",
			path: "/advancement/ranks/{slug}",
			tags: ["Advancement"],
			description:
				"A rank and its current official requirements. A rank transitioning to new requirements has more than one version in use, newest first. Each version's requirements are a flat list in display order; `parentId` and `depth` carry the hierarchy, and `choose` marks a requirement where only that many of its children need to be completed. Requirement text and version notes are sanitized HTML.",
		}),
	)
	.input(z.object({ slug: rankSlugSchema }))
	.output(rankDetailSchema)
	.handler(async ({ input }) => {
		const rank = await getRank(input.slug);

		if (!rank) {
			throw new ORPCError("NOT_FOUND", {
				message: `no rank with slug "${input.slug}"`,
			});
		}

		return rank;
	});
