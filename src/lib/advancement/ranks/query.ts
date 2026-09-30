import { readRankDetail, readRanks } from "@/lib/advancement/ranks/cache";

/** every rank, grouped by program and in order within each */
export async function listRanks() {
	return readRanks();
}

/** a rank and its requirements, or undefined if there is none */
export async function getRank(slug: string) {
	return readRankDetail(slug);
}
