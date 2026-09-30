import { ORPCError, os } from "@orpc/server";
import { openapi } from "@orpc/openapi";
import { z } from "zod";
import {
	getAdventure,
	listAdventures,
} from "@/lib/advancement/adventures/query";
import {
	adventureDetailSchema,
	adventureSchema,
	adventureSlugSchema,
} from "@/lib/advancement/adventures/types";
import { rankSlugSchema } from "@/lib/advancement/ranks/types";

export const listAdventuresProcedure = os
	.meta(
		openapi({
			summary: "List adventures",
			method: "GET",
			path: "/advancement/adventures",
			tags: ["Advancement"],
			description:
				"Every current Cub Scout adventure, from Lion through Arrow of Light, with its rank, whether it is required or an elective, and adventure art. Ordered by rank, with each rank's required adventures before its electives. Sourced from the official Scouting America advancement API and refreshed daily. Use an adventure's slug to fetch its requirements.",
		}),
	)
	.input(
		z.object({
			rank: rankSlugSchema
				.optional()
				.describe(
					'Only return adventures for this rank, by its slug, e.g. "wolf".',
				),
		}),
	)
	.output(z.array(adventureSchema))
	.handler(({ input }) => listAdventures(input.rank));

export const getAdventureProcedure = os
	.meta(
		openapi({
			summary: "Get an adventure",
			method: "GET",
			path: "/advancement/adventures/{slug}",
			tags: ["Advancement"],
			description:
				"A Cub Scout adventure and its current official requirements. Requirements are a flat list in display order; `parentId` and `depth` carry the hierarchy, and `choose` marks a requirement where only that many of its children need to be completed. Requirement text is sanitized HTML.",
		}),
	)
	.input(z.object({ slug: adventureSlugSchema }))
	.output(adventureDetailSchema)
	.handler(async ({ input }) => {
		const adventure = await getAdventure(input.slug);

		if (!adventure) {
			throw new ORPCError("NOT_FOUND", {
				message: `no adventure with slug "${input.slug}"`,
			});
		}

		return adventure;
	});
