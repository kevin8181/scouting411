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
	upstreamRequirementSchema,
} from "@/lib/advancement/requirements";
import type {
	MeritBadge,
	MeritBadgeDetail,
} from "@/lib/advancement/meritBadges/types";

/** fetch the list of all merit badges */
export async function fetchMeritBadges(): Promise<MeritBadge[]> {
	const { meritBadges } = await fetchUpstream(
		"/meritBadges",
		upstreamListSchema,
	);

	return meritBadges.map((badge) => {
		const name = plainText(badge.name);

		return {
			id: badge.id,
			slug: slugify(name),
			name,
			category: plainText(badge.category),
			eagleRequired: badge.eagleRequired,
			images: {
				small: badge.imageUrl50,
				medium: badge.imageUrl100,
				large: badge.imageUrl200,
			},
		};
	});
}

/** fetch the current requirements for a merit badge */
export async function fetchMeritBadgeDetail(
	badge: MeritBadge,
): Promise<MeritBadgeDetail> {
	const data = await fetchUpstream(
		`/meritBadges/${badge.id}/requirements`,
		upstreamRequirementsSchema,
	);

	return {
		...badge,
		version: data.version,
		versionEffective: data.versionEffectiveDt || undefined,
		requirements: orderRequirements(
			data.requirements.map((requirement) => ({
				...parseRequirement(requirement),
				counselorApproval: requirement.counselorApproval,
			})),
		),
	};
}

/** the fields used from https://api.scouting.org/advancements/meritBadges */
const upstreamListSchema = z.object({
	meritBadges: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			category: z.string(),
			eagleRequired: upstreamBool,
			imageUrl50: z.url(),
			imageUrl100: z.url(),
			imageUrl200: z.url(),
		}),
	),
});

/** the fields used from https://api.scouting.org/advancements/meritBadges/{id}/requirements */
const upstreamRequirementsSchema = z.object({
	version: z.string(),
	versionEffectiveDt: z.union([z.iso.date(), z.literal("")]),
	requirements: z.array(
		upstreamRequirementSchema.extend({ counselorApproval: upstreamBool }),
	),
});
