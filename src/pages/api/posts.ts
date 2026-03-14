export const prerender = false;
import type { APIRoute } from "astro";
import { queryPosts, queryOptsSchema } from "@/features/postsQuery/query";
import qs from "qs";

export const POST: APIRoute = async (context) => {
	const body = await context.request.json();

	const { error, data: query } = queryOptsSchema.safeParse(body);

	if (error) {
		return new Response(
			JSON.stringify({
				errors: error.issues.map((i) => ({
					path: i.path.join("."),
					message: i.message,
					code: i.code,
				})),
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
	const urlParams = context.url.searchParams.toString();

	const queryRaw = qs.parse(urlParams, { allowDots: true });

	console.log(queryRaw);

	const { error, data: query } = queryOptsSchema.safeParse(queryRaw);

	if (error) {
		return new Response(
			JSON.stringify({
				errors: error.issues.map((i) => ({
					path: i.path.join("."),
					message: i.message,
					code: i.code,
				})),
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
