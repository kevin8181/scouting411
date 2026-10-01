import { ORPCError, os } from "@orpc/server";
import { openapi } from "@orpc/openapi";
import { z } from "zod";
import {
	getMeritBadge,
	listMeritBadges,
} from "@/lib/advancement/meritBadges/query";
import {
	meritBadgeDetailSchema,
	meritBadgeSchema,
	meritBadgeSlugSchema,
} from "@/lib/advancement/meritBadges/types";

export const listMeritBadgesProcedure = os
	.meta(
		openapi({
			summary: "List merit badges",
			method: "GET",
			path: "/advancement/merit-badges",
			tags: ["Advancement"],
			description:
				"Every current Scouting America merit badge, with its categories, whether it is required for Eagle, and badge art. Sourced from the official Scouting America advancement API and refreshed daily. Use a badge's slug to fetch its requirements.",
		}),
	)
	.output(z.array(meritBadgeSchema))
	.handler(() => listMeritBadges());

export const getMeritBadgeProcedure = os
	.meta(
		openapi({
			summary: "Get a merit badge",
			method: "GET",
			path: "/advancement/merit-badges/{slug}",
			tags: ["Advancement"],
			description:
				"A merit badge and its current official requirements. Requirements are a flat list in display order; `parentId` and `depth` carry the hierarchy, and `choose` marks a requirement where only that many of its children need to be completed. Requirement text is sanitized HTML.",
		}),
	)
	.input(z.object({ slug: meritBadgeSlugSchema }))
	.output(meritBadgeDetailSchema)
	.handler(async ({ input }) => {
		const meritBadge = await getMeritBadge(input.slug);

		if (!meritBadge) {
			throw new ORPCError("NOT_FOUND", {
				message: `no merit badge with slug "${input.slug}"`,
			});
		}

		return meritBadge;
	});
