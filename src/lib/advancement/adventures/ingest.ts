import {
	fetchAdventureDetail,
	fetchAdventures,
} from "@/lib/advancement/adventures/upstream";
import {
	writeAdventureDetail,
	writeAdventures,
} from "@/lib/advancement/adventures/cache";
import { arrayHasDupes } from "@/util/arrayDupeCheck";
import { sleep } from "@/util/sleep";
import { tryCatch } from "@/util/tryCatch";

/** the number of milliseconds to wait between requirements requests */
const requestInterval = 100;

/**
 * fetches every adventure and its requirements and updates the cache.
 * failures are isolated per adventure - an adventure whose requirements fail
 * to fetch keeps its previously cached requirements
 */
export async function ingestAdventures() {
	const { data: adventures, error } = await tryCatch(fetchAdventures());

	if (error) {
		return { errors: [{ reason: String(error) }], succeeded: 0, total: 0 };
	}

	if (adventures.length === 0) {
		return {
			errors: [{ reason: "upstream returned no current adventures" }],
			succeeded: 0,
			total: 0,
		};
	}

	if (arrayHasDupes(adventures.map((adventure) => adventure.slug))) {
		return {
			errors: [{ reason: "two adventures share a slug" }],
			succeeded: 0,
			total: adventures.length,
		};
	}

	const errors: { adventure?: string; reason: string }[] = [];

	await Promise.all(
		adventures.map(async (adventure, i) => {
			await sleep(requestInterval * i);

			const { data: detail, error } = await tryCatch(
				fetchAdventureDetail(adventure),
			);

			if (error) {
				errors.push({ adventure: adventure.slug, reason: String(error) });
				return;
			}

			await writeAdventureDetail(detail);
		}),
	);

	await writeAdventures(adventures);

	return {
		errors,
		succeeded: adventures.length - errors.length,
		total: adventures.length,
	};
}
