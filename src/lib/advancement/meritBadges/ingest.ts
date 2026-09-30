import {
	fetchMeritBadgeDetail,
	fetchMeritBadges,
} from "@/lib/advancement/meritBadges/upstream";
import {
	writeMeritBadgeDetail,
	writeMeritBadges,
} from "@/lib/advancement/meritBadges/cache";
import { arrayHasDupes } from "@/util/arrayDupeCheck";
import { sleep } from "@/util/sleep";
import { tryCatch } from "@/util/tryCatch";

/** the number of milliseconds to wait between requirements requests */
const requestInterval = 100;

/**
 * fetches every merit badge and its requirements and updates the cache.
 * failures are isolated per badge - a badge whose requirements fail to fetch
 * keeps its previously cached requirements
 */
export async function ingestMeritBadges() {
	const { data: meritBadges, error } = await tryCatch(fetchMeritBadges());

	if (error) {
		return { errors: [{ reason: String(error) }], succeeded: 0, total: 0 };
	}

	if (meritBadges.length === 0) {
		return {
			errors: [{ reason: "upstream returned no merit badges" }],
			succeeded: 0,
			total: 0,
		};
	}

	if (arrayHasDupes(meritBadges.map((badge) => badge.slug))) {
		return {
			errors: [{ reason: "two merit badges share a slug" }],
			succeeded: 0,
			total: meritBadges.length,
		};
	}

	const errors: { meritBadge?: string; reason: string }[] = [];

	await Promise.all(
		meritBadges.map(async (badge, i) => {
			await sleep(requestInterval * i);

			const { data: detail, error } = await tryCatch(
				fetchMeritBadgeDetail(badge),
			);

			if (error) {
				errors.push({ meritBadge: badge.slug, reason: String(error) });
				return;
			}

			await writeMeritBadgeDetail(detail);
		}),
	);

	await writeMeritBadges(meritBadges);

	return {
		errors,
		succeeded: meritBadges.length - errors.length,
		total: meritBadges.length,
	};
}
