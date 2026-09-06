import type { APIRoute } from "astro";
import { updateAllFeeds } from "@/lib/news/cache/update";
import { CRON_SECRET } from "astro:env/server";

export const prerender = false;

export const GET: APIRoute = async (context) => {
	const authHeader = context.request.headers.get("authorization");

	if (authHeader !== `Bearer ${CRON_SECRET}` && import.meta.env.PROD) {
		return new Response("401 Unauthorized", { status: 401 });
	}

	const result = await updateAllFeeds();

	return new Response(JSON.stringify(result), {
		headers: {
			"Content-Type": "application/json",
		},
		status: result.errors.length === 0 ? 200 : 500,
	});
};
