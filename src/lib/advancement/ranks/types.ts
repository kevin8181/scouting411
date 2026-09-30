import { z } from "zod";
import { requirementSchema } from "@/lib/advancement/requirements";

export type Rank = z.infer<typeof rankSchema>;
export const rankSchema = z
	.object({
		id: z.string().describe("Scouting America's id for the rank."),
		slug: z
			.string()
			.describe(
				'A URL-safe identifier derived from the name, e.g. "second-class". Use it to fetch the rank\'s requirements.',
			),
		name: z.string().describe('The official name, e.g. "First Class".'),
		program: z
			.string()
			.describe(
				'The program the rank belongs to: "Cub Scouting", "Scouts BSA", "Sea Scouting", or "Venturing".',
			),
		level: z
			.number()
			.int()
			.describe(
				"The rank's position in its program's sequence. Higher is more advanced; numbering starts at 0 or 1 depending on the program.",
			),
		images: z
			.object({
				small: z.url().describe("50px rank art."),
				medium: z.url().describe("100px rank art."),
				large: z.url().describe("200px rank art."),
			})
			.describe("URLs of the official rank art, as square PNGs."),
	})
	.describe("A current Scouting America rank.");

const rankVersionSchema = z
	.object({
		version: z
			.string()
			.describe(
				'The version of the requirements, usually the year they were issued, e.g. "2026".',
			),
		headerHtml: z
			.string()
			.optional()
			.describe(
				"Sanitized HTML introducing the requirements, when there is any.",
			),
		footerHtml: z
			.string()
			.optional()
			.describe(
				"Sanitized HTML notes on the requirements, when there are any: alternative requirements for Scouts with disabilities, which ranks may be worked on together, and the footnotes that `<sup>` markers in requirement text refer to.",
			),
		requirements: z
			.array(requirementSchema)
			.describe("The requirements, as a flat list in display order."),
	})
	.describe("One version of a rank's official requirements.");

export type RankDetail = z.infer<typeof rankDetailSchema>;
export const rankDetailSchema = rankSchema
	.extend({
		versions: z
			.array(rankVersionSchema)
			.min(1)
			.describe(
				"The versions of the requirements currently in use, newest first. Usually there is one; a rank transitioning to new requirements lists the outgoing version too.",
			),
	})
	.describe("A current Scouting America rank and its requirements.");

export const rankSlugSchema = z
	.string()
	.regex(/^[a-z0-9-]+$/, { error: "is not a rank slug" })
	.describe(
		'The rank\'s slug, as returned by the list endpoint, e.g. "star-scout".',
	);

/** the page for a rank, optionally showing a version other than the newest */
export function rankPath(slug: string, version?: string) {
	const path = `/advancement/ranks/${slug}`;

	return version ? `${path}?version=${version}` : path;
}
