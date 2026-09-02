import { stringify, parse } from "qs";
import { type QueryOpts, queryOptsSchema } from "@/lib/news/query/types";

export const postsQueryParamsEncoder = {
	encode,
	decode,
};

/**
 * allowEmptyArrays keeps `feeds: []` (every source deselected) in the url as
 * `feeds[]`. without it qs drops the key entirely and the schema default puts
 * every default-visible feed back on reload.
 *
 * arrayFormat is `brackets` rather than the prettier `comma` because comma
 * arrays don't survive a round trip: qs only splits on a literal comma, but
 * URLSearchParams percent-encodes it to %2C, so `feeds=a%2Cb` parses back as
 * the string "a,b" and fails the schema. brackets need no parse-side option —
 * arrayFormat is stringify-only, and qs reads `feeds[]=` as an array natively.
 */
const qsOpts = {
	allowDots: true,
	allowEmptyArrays: true,
	arrayFormat: "brackets",
} as const;

/** encode a JSON query into a URLSearchParams query */
function encode(query: QueryOpts) {
	const queryString = stringify(query, qsOpts);

	return new URLSearchParams(queryString);
}

/** decode a URLSearchParams query into a JSON query */
function decode(searchParams: URLSearchParams) {
	const queryString = searchParams.toString();

	const queryRawJson = parse(queryString, qsOpts);

	return queryOptsSchema.safeParse(normalizeFeeds(queryRawJson));
}

/** keep urls shared before the switch to brackets working */
function normalizeFeeds(query: ReturnType<typeof parse>) {
	if (typeof query.feeds !== "string") return query;

	return { ...query, feeds: query.feeds.split(",") };
}
