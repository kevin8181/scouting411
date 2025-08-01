import type { APIRoute } from "astro";
import { FeedManager } from "@/features/feeds/feedManager";

export const POST: APIRoute = async () => {
	await FeedManager.updateAllFeeds();

	return new Response();
};
