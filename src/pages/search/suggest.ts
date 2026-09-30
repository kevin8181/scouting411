import type { APIRoute } from "astro";
import { rpc } from "@/rpc/client";

export const prerender = false;

/**
 * search suggestions for browsers, in the opensearch suggestions format, advertised by
 * `opensearch.xml`. browsers dictate the shape, so this is a plain route that reshapes
 * `search.query` rather than a procedure in the public api
 */

/** the most suggestions returned; browsers show only a handful */
const limit = 8;

export const GET: APIRoute = async ({ url }) => {
	const input = url.searchParams.get("q")?.trim() ?? "";
	// keep a leading "!" on each suggestion, so picking one still launches it
	const prefix = input.startsWith("!") ? "!" : "";
	const query = input.slice(prefix.length).trim();

	const results = query ? await rpc.search.query({ q: query, limit }) : [];

	// [query, completions, descriptions, urls]. most browsers use only the first two
	const body = [
		input,
		results.map((result) => `${prefix}${result.name}`),
		results.map((result) => result.description ?? ""),
		results.map((result) => new URL(result.url, url.origin).href),
	];

	return new Response(JSON.stringify(body), {
		headers: { "Content-Type": "application/x-suggestions+json" },
	});
};
