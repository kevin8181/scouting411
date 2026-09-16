import type { APIRoute } from "astro";
import { queryResources } from "@/lib/resources/query";

export const GET: APIRoute = async () => {
	const resources = queryResources();

	return new Response(JSON.stringify(resources), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			// read-only public data, so it is safe to read from any origin
			"Access-Control-Allow-Origin": "*",
			// the cron refreshes the cache daily, so an hour of edge cache is free
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
};
