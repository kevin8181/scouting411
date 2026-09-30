import { defaultFilter } from "cmdk";
import type { SearchItem, SearchResult } from "@/lib/search/types";

/**
 * a match on anything but the name counts for less, so an item named for the query
 * outranks one that only mentions it — "camping" finds the Camping merit badge before
 * a feed whose description says camping
 */
const secondaryWeight = 0.8;

/**
 * rank items against a query, best match first. items that don't match are dropped, and
 * ties keep their input order. pure and safe for the browser, so the palette can run it
 * locally over the same items the server searches
 */
export function searchItems(
	items: SearchItem[],
	query: string,
	opts: { limit?: number | undefined } = {},
): SearchResult[] {
	const search = query.trim();
	if (!search) return [];

	const results = items
		.map((item) => ({ ...item, score: scoreItem(item, search) }))
		.filter((result) => result.score > 0)
		// sort is stable, so equal scores stay in registry order
		.sort((a, b) => b.score - a.score);

	return opts.limit === undefined ? results : results.slice(0, opts.limit);
}

/** score one item using cmdk's fuzzy scorer, the same one the palette uses */
function scoreItem(item: SearchItem, search: string) {
	const nameScore = defaultFilter(item.name, search);
	const secondaryScore = defaultFilter(
		[...item.keywords, item.description ?? ""].join(" "),
		search,
	);

	return Math.max(nameScore, secondaryScore * secondaryWeight);
}
