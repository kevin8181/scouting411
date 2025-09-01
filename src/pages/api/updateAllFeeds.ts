import type { APIRoute } from "astro";
import { FeedManager } from "@/features/feeds/feedManager";

export const prerender = false;

//todo secure this endpoint with cron secret https://vercel.com/docs/cron-jobs/manage-cron-jobs?framework=other#securing-cron-jobs

export const GET: APIRoute = async () => {
	await FeedManager.updateAllFeeds();

	return new Response();
};
