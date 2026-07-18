import qs from "qs";
import { type QueryOpts, queryOptsSchema } from "@/features/postsQuery/query";

export const postsQueryParamsEncoder = {
	encode,
	decode,
};

/** encode a JSON query into a URLSearchParams query */
function encode(query: QueryOpts) {
	const queryString = qs.stringify(query, { allowDots: true });

	return new URLSearchParams(queryString);
}

/** decode a URLSearchParams query into a JSON query */
function decode(searchParams: URLSearchParams) {
	const queryString = searchParams.toString();

	const queryRawJson = qs.parse(queryString, { allowDots: true });

	return queryOptsSchema.safeParse(queryRawJson);
}
