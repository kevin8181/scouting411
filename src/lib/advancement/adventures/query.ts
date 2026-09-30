import {
	readAdventureDetail,
	readAdventures,
} from "@/lib/advancement/adventures/cache";

/**
 * every adventure in rank order, required before elective within each rank.
 * pass a rank's slug to get only that rank's adventures
 */
export async function listAdventures(rank?: string) {
	const adventures = await readAdventures();

	return rank
		? adventures.filter((adventure) => adventure.rank.slug === rank)
		: adventures;
}

/** an adventure and its requirements, or undefined if there is none */
export async function getAdventure(slug: string) {
	return readAdventureDetail(slug);
}
