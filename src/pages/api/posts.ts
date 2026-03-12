export const prerender = false;
import type { APIRoute } from "astro";
import { z } from "astro/zod";
import { queryPosts } from "@/features/postsQuery/query";

export const GET: APIRoute = async (context) => {
	const params = context.url.searchParams;

	console.log(params);

	const paramsObj = Object.fromEntries(params);

	const { error, data: query } = postsQueryParamsSchema.safeParse(paramsObj);

	if (error) {
		return new Response(JSON.stringify({ error }), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	const posts = await queryPosts({
		paginate: {
			page: query.page,
			pageSize: query.pageSize,
		},
	});

	return new Response(JSON.stringify(posts), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

const postsQueryParamsSchema = z.object({
	page: z.coerce.number().min(1),
	pageSize: z.coerce.number().min(1).max(1000).default(20),
});
