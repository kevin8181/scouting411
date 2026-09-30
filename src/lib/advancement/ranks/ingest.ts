import { fetchRankDetail, fetchRanks } from "@/lib/advancement/ranks/upstream";
import { writeRankDetail, writeRanks } from "@/lib/advancement/ranks/cache";
import { arrayHasDupes } from "@/util/arrayDupeCheck";
import { sleep } from "@/util/sleep";
import { tryCatch } from "@/util/tryCatch";

/** the number of milliseconds to wait between requirements requests */
const requestInterval = 100;

/**
 * fetches every rank and its requirements and updates the cache. failures are
 * isolated per rank - a rank whose requirements fail to fetch keeps its
 * previously cached requirements
 */
export async function ingestRanks() {
	const { data: upstreamRanks, error } = await tryCatch(fetchRanks());

	if (error) {
		return { errors: [{ reason: String(error) }], succeeded: 0, total: 0 };
	}

	const ranks = upstreamRanks.map(({ rank }) => rank);

	if (ranks.length === 0) {
		return {
			errors: [{ reason: "upstream returned no ranks" }],
			succeeded: 0,
			total: 0,
		};
	}

	if (arrayHasDupes(ranks.map((rank) => rank.slug))) {
		return {
			errors: [{ reason: "two ranks share a slug" }],
			succeeded: 0,
			total: ranks.length,
		};
	}

	const errors: { rank?: string; reason: string }[] = [];

	await Promise.all(
		upstreamRanks.map(async (upstreamRank, i) => {
			await sleep(requestInterval * i);

			const { data: detail, error } = await tryCatch(
				fetchRankDetail(upstreamRank),
			);

			if (error) {
				errors.push({ rank: upstreamRank.rank.slug, reason: String(error) });
				return;
			}

			await writeRankDetail(detail);
		}),
	);

	await writeRanks(ranks);

	return {
		errors,
		succeeded: ranks.length - errors.length,
		total: ranks.length,
	};
}
