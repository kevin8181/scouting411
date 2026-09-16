export const prerender = false;
import type { APIRoute } from "astro";

import { getFeedConsumerOutput } from "@/lib/news/feeds/consumerOutput";

/**
 * metadata and content-quality stats for every feed. returns no posts — use
 * `/api/posts` for those.
 */
export const GET: APIRoute = async () => {
	const body = await getFeedConsumerOutput();

	return new Response(JSON.stringify(body), {
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
