import { z } from "zod";
import {
	fetchUpstream,
	plainText,
	slugify,
	upstreamBool,
} from "@/lib/advancement/upstream";
import {
	orderRequirements,
	parseRequirement,
	sanitizeRequirementHtml,
	upstreamRequirementSchema,
} from "@/lib/advancement/requirements";
import type { Rank, RankDetail } from "@/lib/advancement/ranks/types";

/** a rank, and the upstream ids of the requirement versions it has in use */
type UpstreamRank = { rank: Rank; versionIds: string[] };

/**
 * fetch the list of all ranks, in program and level order. upstream lists a
 * rank once per version in use, so its entries are merged by id
 */
export async function fetchRanks(): Promise<UpstreamRank[]> {
	const { ranks } = await fetchUpstream("/ranks", upstreamListSchema);

	// sorted so each rank's newest version comes first
	const entries = ranks
		.filter((entry) => entry.active)
		.toSorted(
			(a, b) =>
				a.programId - b.programId ||
				a.level - b.level ||
				Number(b.version) - Number(a.version),
		);

	return [...Map.groupBy(entries, (entry) => entry.id).values()].map(
		(versions) => {
			// groupBy never makes an empty group
			const newest = versions[0]!;
			const name = plainText(newest.name);

			return {
				rank: {
					id: newest.id,
					slug: slugify(name),
					name,
					program: plainText(newest.program),
					level: newest.level,
					images: {
						small: newest.imageUrl50,
						medium: newest.imageUrl100,
						large: newest.imageUrl200,
					},
				},
				versionIds: versions.map((version) => version.versionId),
			};
		},
	);
}

/** fetch the requirements for every version of a rank that is in use */
export async function fetchRankDetail({
	rank,
	versionIds,
}: UpstreamRank): Promise<RankDetail> {
	const versions = await Promise.all(
		versionIds.map(async (versionId) => {
			const { rankInformation, requirements } = await fetchUpstream(
				`/ranks/${rank.id}/requirements?versionId=${versionId}`,
				upstreamRequirementsSchema,
			);

			return {
				version: rankInformation.version,
				headerHtml:
					sanitizeRequirementHtml(rankInformation.header) || undefined,
				footerHtml:
					sanitizeRequirementHtml(rankInformation.footer) || undefined,
				requirements: orderRequirements(requirements.map(parseRequirement)),
			};
		}),
	);

	return { ...rank, versions };
}

/** the fields used from https://api.scouting.org/advancements/ranks */
const upstreamListSchema = z.object({
	ranks: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			program: z.string(),
			programId: z.coerce.number(),
			level: z.coerce.number().int(),
			versionId: z.string(),
			version: z.string(),
			active: upstreamBool,
			imageUrl50: z.url(),
			imageUrl100: z.url(),
			imageUrl200: z.url(),
		}),
	),
});

/** the fields used from https://api.scouting.org/advancements/ranks/{id}/requirements */
const upstreamRequirementsSchema = z.object({
	rankInformation: z.object({
		version: z.string(),
		header: z.string(),
		footer: z.string(),
	}),
	requirements: z.array(upstreamRequirementSchema),
});
