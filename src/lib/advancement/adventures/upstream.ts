import { z } from "zod";
import { fetchUpstream, plainText, slugify } from "@/lib/advancement/upstream";
import {
	orderRequirements,
	parseRequirement,
} from "@/lib/advancement/parseRequirements";
import type {
	Adventure,
	AdventureDetail,
} from "@/lib/advancement/adventures/types";

/**
 * upstream still lists adventures from retired programs (2015 through 2021)
 * alongside the current one, and has no expiry date on them to filter by.
 * keeping only the current program's version leaves one entry per adventure
 */
const programVersion = 2024;

/** cub scout ranks in program order. adventures don't carry a rank's level */
const rankOrder = [
	"Lion",
	"Tiger",
	"Wolf",
	"Bear",
	"Webelos",
	"Arrow of Light",
];

/**
 * fetch the list of current adventures, in rank order, with each rank's
 * required adventures before its electives
 */
export async function fetchAdventures(): Promise<Adventure[]> {
	const { adventures } = await fetchUpstream("/adventures", upstreamListSchema);

	return adventures
		.filter((adventure) => adventure.version === programVersion)
		.toSorted(
			(a, b) =>
				rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank) ||
				Number(b.required) - Number(a.required) ||
				a.name.localeCompare(b.name),
		)
		.map((adventure) => {
			const name = plainText(adventure.name);
			const rank = plainText(adventure.rank);

			return {
				id: String(adventure.id),
				slug: slugify(name),
				name,
				rank: { slug: slugify(rank), name: rank },
				required: adventure.required,
				images: {
					small: adventure.imageUrl100,
					medium: adventure.imageUrl200,
					large: adventure.imageUrl300,
				},
			};
		});
}

/** fetch the current requirements for an adventure */
export async function fetchAdventureDetail(
	adventure: Adventure,
): Promise<AdventureDetail> {
	const data = await fetchUpstream(
		`/adventures/${adventure.id}/requirements`,
		upstreamRequirementsSchema,
	);

	return {
		...adventure,
		version: String(data.version),
		versionEffective: data.versionEffectiveDt ?? undefined,
		requirements: orderRequirements(data.requirements.map(parseRequirement)),
	};
}

/** the fields used from https://api.scouting.org/advancements/adventures */
const upstreamListSchema = z.object({
	adventures: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
			rank: z.string(),
			required: z.boolean(),
			version: z.number(),
			imageUrl100: z.url(),
			imageUrl200: z.url(),
			imageUrl300: z.url(),
		}),
	),
});

/**
 * unlike the other advancement types, adventures return real numbers and
 * nulls. convert them to the strings the shared requirement parser reads
 */
const upstreamString = (schema: z.ZodString | z.ZodNumber) =>
	schema.nullable().transform((value) => (value === null ? "" : String(value)));

/** the fields used from https://api.scouting.org/advancements/adventures/{id}/requirements */
const upstreamRequirementsSchema = z.object({
	version: z.number(),
	versionEffectiveDt: z.iso.date().nullable(),
	requirements: z.array(
		z.object({
			id: z.number().transform(String),
			name: z.string(),
			listNumber: upstreamString(z.string()),
			sortOrder: upstreamString(z.number()),
			childrenRequired: upstreamString(z.number()),
			parentRequirementId: upstreamString(z.number()),
			footer: upstreamString(z.string()),
		}),
	),
});
