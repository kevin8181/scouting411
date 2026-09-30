import { z } from "zod";
import { requirementSchema } from "@/lib/advancement/requirements";

export type MeritBadge = z.infer<typeof meritBadgeSchema>;
export const meritBadgeSchema = z
	.object({
		id: z.string().describe("Scouting America's id for the merit badge."),
		slug: z
			.string()
			.describe(
				'A URL-safe identifier derived from the name, e.g. "signs-signals-and-codes". Use it to fetch the badge\'s requirements.',
			),
		name: z
			.string()
			.describe('The official name, without "Merit Badge", e.g. "First Aid".'),
		category: z
			.string()
			.describe(
				'The official category the badge is grouped under, e.g. "Public Service".',
			),
		eagleRequired: z
			.boolean()
			.describe(
				"Whether the badge is on the list required for the rank of Eagle Scout.",
			),
		images: z
			.object({
				small: z.url().describe("50px badge art."),
				medium: z.url().describe("100px badge art."),
				large: z.url().describe("200px badge art."),
			})
			.describe("URLs of the official badge art, as square PNGs."),
	})
	.describe("A current Scouting America merit badge.");

export type MeritBadgeDetail = z.infer<typeof meritBadgeDetailSchema>;
export const meritBadgeDetailSchema = meritBadgeSchema
	.extend({
		version: z
			.string()
			.describe(
				'The version of the requirements, usually the year they were issued, e.g. "2025".',
			),
		versionEffective: z.iso
			.date()
			.optional()
			.describe("The date this version of the requirements took effect."),
		requirements: z
			.array(requirementSchema)
			.describe(
				"The current official requirements, as a flat list in display order.",
			),
	})
	.describe("A current Scouting America merit badge and its requirements.");

export const meritBadgeSlugSchema = z
	.string()
	.regex(/^[a-z0-9-]+$/, { error: "is not a merit badge slug" })
	.describe(
		'The merit badge\'s slug, as returned by the list endpoint, e.g. "first-aid".',
	);

/** the page for a merit badge */
export function meritBadgePath(slug: string) {
	return `/advancement/merit-badges/${slug}`;
}
