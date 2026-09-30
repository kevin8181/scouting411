import { z } from "zod";
import { requirementSchema } from "@/lib/advancement/requirements";

export type Adventure = z.infer<typeof adventureSchema>;
export const adventureSchema = z
	.object({
		id: z.string().describe("Scouting America's id for the adventure."),
		slug: z
			.string()
			.describe(
				'A URL-safe identifier derived from the name, e.g. "tigers-in-the-wild". Use it to fetch the adventure\'s requirements.',
			),
		name: z
			.string()
			.describe(
				'The official name, e.g. "Tigers in the Wild". Adventures offered at more than one rank carry the rank in parentheses, e.g. "Archery (Tiger)".',
			),
		rank: z
			.object({
				slug: z
					.string()
					.describe(
						"The rank's slug, e.g. \"arrow-of-light\". Use it to fetch the rank's requirements.",
					),
				name: z.string().describe('The rank\'s name, e.g. "Arrow of Light".'),
			})
			.describe("The Cub Scout rank the adventure counts toward."),
		required: z
			.boolean()
			.describe(
				"Whether the adventure is required for its rank. The rest are electives, of which a Cub Scout picks some number to complete the rank.",
			),
		images: z
			.object({
				small: z.url().describe("100px adventure art."),
				medium: z.url().describe("200px adventure art."),
				large: z.url().describe("300px adventure art."),
			})
			.describe(
				"URLs of the official adventure loop or pin art, as square PNGs.",
			),
	})
	.describe("A current Cub Scout adventure.");

export type AdventureDetail = z.infer<typeof adventureDetailSchema>;
export const adventureDetailSchema = adventureSchema
	.extend({
		version: z
			.string()
			.describe(
				'The version of the requirements, the year the program was issued, e.g. "2024".',
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
	.describe("A current Cub Scout adventure and its requirements.");

export const adventureSlugSchema = z
	.string()
	.regex(/^[a-z0-9-]+$/, { error: "is not an adventure slug" })
	.describe(
		'The adventure\'s slug, as returned by the list endpoint, e.g. "tigers-in-the-wild".',
	);

/** the page for an adventure */
export function adventurePath(slug: string) {
	return `/advancement/adventures/${slug}`;
}
