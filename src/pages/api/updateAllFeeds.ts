import type { APIRoute } from "astro";
import { updateAllFeeds } from "@/lib/news/fetching/update";
import { CRON_SECRET } from "astro:env/server";

export const prerender = false;

export const GET: APIRoute = async (context) => {
	const authHeader = context.request.headers.get("authorization");

	if (authHeader !== `Bearer ${CRON_SECRET}`) {
		return new Response("401 Unauthorized", { status: 401 });
	}

	await updateAllFeeds();

	return new Response("200 OK", { status: 200 });
};
