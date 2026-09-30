import sanitizeHtml from "sanitize-html";
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
		counselorApproval: z
			.boolean()
			.describe(
				"Whether the Scout needs their merit badge counselor's approval before starting this requirement.",
			),
	})
	.describe(
		"One requirement. Requirements come as a flat list in display order; `parentId` and `depth` carry the hierarchy.",
	);

/** a requirement as parsed from upstream, before it is ordered */
type UnorderedRequirement = Omit<
	Requirement,
	"depth" | "parentId" | "choose"
> & {
	parentId: string | undefined;
	/** sorts the requirement among its siblings */
	sortOrder: number;
	/** how many of the requirement's children must be completed */
	childrenRequired: number | undefined;
};

/**
 * order upstream's flat requirement list depth-first, with siblings sorted by
 * `sortOrder`. upstream's array order is not reliable, and neither is sorting
 * `sortOrder` segment by segment - it is a decimal ("1.05" comes before "1.1",
 * "3.1" after "3.09")
 */
export function orderRequirements(
	requirements: UnorderedRequirement[],
): Requirement[] {
	const ids = new Set(requirements.map((requirement) => requirement.id));

	const childrenOf = Map.groupBy(requirements, (requirement) =>
		// an orphan is shown at the top level rather than dropped
		requirement.parentId && ids.has(requirement.parentId)
			? requirement.parentId
			: undefined,
	);

	const ordered: Requirement[] = [];

	const visit = (parentId: string | undefined, depth: number) => {
		const children = (childrenOf.get(parentId) ?? []).toSorted(
			(a, b) => a.sortOrder - b.sortOrder,
		);

		for (const requirement of children) {
			const { childrenRequired } = requirement;
			const childCount = childrenOf.get(requirement.id)?.length ?? 0;

			ordered.push({
				id: requirement.id,
				parentId,
				depth,
				label: requirement.label,
				html: requirement.html,
				footerHtml: requirement.footerHtml,
				choose:
					childrenRequired !== undefined && childrenRequired < childCount
						? childrenRequired
						: undefined,
				counselorApproval: requirement.counselorApproval,
			});

			visit(requirement.id, depth + 1);
		}
	};

	visit(undefined, 0);

	return ordered;
}

/**
 * upstream requirement text is hand-written html - resource links in
 * `<details>` blocks, emphasis, the odd list, and some malformed tags. keep the
 * formatting, drop everything else, and open links in a new tab
 */
export function sanitizeRequirementHtml(html: string) {
	return (
		sanitizeHtml(html, {
			allowedTags: [
				"a",
				"br",
				"b",
				"strong",
				"i",
				"em",
				"u",
				"sup",
				"sub",
				"ul",
				"ol",
				"li",
				"details",
				"summary",
			],
			allowedAttributes: { a: ["href", "target", "rel"] },
			allowedSchemes: ["http", "https"],
			transformTags: {
				a: sanitizeHtml.simpleTransform("a", {
					target: "_blank",
					rel: "noopener noreferrer",
				}),
			},
		})
			// details is already a block, so a break before it only adds a blank line
			.replace(/(\s|<br \/>)+<details>/g, "<details>")
			.replace(/^(\s|<br \/>)+|(\s|<br \/>)+$/g, "")
			.trim()
	);
}
