import {
	readMeritBadgeDetail,
	readMeritBadges,
} from "@/lib/advancement/meritBadges/cache";

/** every merit badge, alphabetized */
export async function listMeritBadges() {
	const meritBadges = await readMeritBadges();

	return meritBadges.toSorted((a, b) => a.name.localeCompare(b.name));
}

/** a merit badge and its requirements, or undefined if there is none */
export async function getMeritBadge(slug: string) {
	return readMeritBadgeDetail(slug);
}
