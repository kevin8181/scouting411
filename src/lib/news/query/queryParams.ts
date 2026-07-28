import qs from "qs";
import { type QueryOpts, queryOptsSchema } from "@/lib/news/query/types";

export const postsQueryParamsEncoder = {
	encode,
	decode,
};

/**
 * allowEmptyArrays keeps `feeds: []` (every source deselected) in the url as
 * `feeds[]`. without it qs drops the key entirely and the schema default puts
 * every default-visible feed back on reload.
 */
const qsOpts = { allowDots: true, allowEmptyArrays: true };

/** encode a JSON query into a URLSearchParams query */
function encode(query: QueryOpts) {
	const queryString = qs.stringify(query, qsOpts);

	return new URLSearchParams(queryString);
}

/** decode a URLSearchParams query into a JSON query */
function decode(searchParams: URLSearchParams) {
	const queryString = searchParams.toString();

	const queryRawJson = qs.parse(queryString, qsOpts);

	return queryOptsSchema.safeParse(queryRawJson);
}
