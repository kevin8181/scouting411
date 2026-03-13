export const prerender = false;
import type { APIRoute } from "astro";
import { queryPosts, queryOptsSchema } from "@/features/postsQuery/query";

export const POST: APIRoute = async (context) => {
	const body = await context.request.json();

	const { error, data: query } = queryOptsSchema.safeParse(body);

	if (error) {
		return new Response(JSON.stringify({ error }), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	const posts = await queryPosts(query);

	return new Response(JSON.stringify(posts), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
