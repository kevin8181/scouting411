import { z } from "zod";

export type Requirement = z.infer<typeof requirementSchema>;
export const requirementSchema = z
	.object({
		id: z.string().describe("Scouting America's id for the requirement."),
		parentId: z
			.string()
			.optional()
			.describe(
				"The id of the requirement this one is nested under. Absent on top-level requirements.",
			),
		depth: z
			.number()
			.int()
			.describe(
				"How deeply the requirement is nested: 0 for a top-level requirement, 1 for its sub-requirements, and so on. Indent by this to reproduce the official layout.",
			),
		label: z
			.string()
			.optional()
			.describe(
				'The list marker as printed in the official requirements, e.g. "1." or "(a)". Absent on notes, which are guidance rather than requirements to complete.',
			),
		html: z
			.string()
			.describe(
				"The requirement text as sanitized HTML. May contain basic formatting, lists, links, and `<details>` blocks listing supporting resources.",
			),
		footerHtml: z
			.string()
			.optional()
			.describe(
				"Additional sanitized HTML shown after the requirement, when it has any.",
			),
		choose: z
			.number()
			.int()
			.optional()
			.describe(
				'Set when only this many of the requirement\'s sub-requirements need to be completed, e.g. 2 for "Do TWO of the following". Absent when all of them are required.',
			),
	})
	.describe(
		"One requirement. Requirements come as a flat list in display order; `parentId` and `depth` carry the hierarchy.",
	);
