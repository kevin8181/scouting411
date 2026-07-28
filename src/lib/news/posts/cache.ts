import { redis } from "@/util/redisClient";
import type { PostData } from "@/lib/news/ingest/types";
import type { FeedSlug } from "@/lib/news/feeds/types";

/** read a feed's cached post data from redis */
export async function readPosts(feedSlug: FeedSlug) {
	const data: PostData[] | null = await redis.json.get("posts:" + feedSlug);

	return data ?? [];
}

/** write a feed's post data to the redis cache */
export async function writePosts({
	feedSlug,
	postData,
}: {
	feedSlug: FeedSlug;
	postData: PostData[];
}) {
	await redis.json.set("posts:" + feedSlug, "$", postData);
}
