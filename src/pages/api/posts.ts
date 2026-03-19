export const prerender = false;
import type { APIRoute } from "astro";
import { queryPosts, queryOptsSchema } from "@/features/postsQuery/query";
import { postsQueryParamsEncoder } from "@/features/postsQuery/queryParams";

export const POST: APIRoute = async (context) => {
	const body = await context.request.json();

	const { error, data: query } = queryOptsSchema.safeParse(body);

	if (error) {
		return new Response(
			JSON.stringify({
				errors: error.issues,
			}),
			{
				status: 400,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}

	const posts = await queryPosts(query);

	return new Response(JSON.stringify(posts), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const GET: APIRoute = async (context) => {
	const { error, data: query } = postsQueryParamsEncoder.decode(
		context.url.searchParams,
	);

	if (error) {
		return new Response(
			JSON.stringify({
				errors: error.issues,
			}),
			{
				status: 400,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}

	const posts = await queryPosts(query);

	return new Response(JSON.stringify(posts), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
