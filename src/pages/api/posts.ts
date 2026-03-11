export const prerender = false;
import type { APIRoute } from "astro";
import { FeedManager } from "@/features/feeds/feedManager";
import { filterPosts, filterSchema } from "@/features/feeds/filter";

export const GET: APIRoute = async ({ url }) => {
	const params = Object.fromEntries(url.searchParams);

	const { error } = filterSchema.safeParse(params);

	if (error) {
		return new Response(JSON.stringify({ error }), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	const posts = await FeedManager.allPosts();

	const filteredPosts = filterPosts({ posts, filter: params });

	return new Response(JSON.stringify(filteredPosts), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
