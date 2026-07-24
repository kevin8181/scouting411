import { redis } from "@/util/redisClient";
import type { PostData } from "@/lib/news/ingest/types";

/** read a feed's cached post data from redis */
export async function readCache(feedSlug: string) {
	const data: PostData[] | null = await redis.json.get("posts:" + feedSlug);

	return data ?? [];
}

/** write a feed's post data to the redis cache */
export async function writeCache({
	feedSlug,
	postData,
}: {
	feedSlug: string;
	postData: PostData[];
}) {
	await redis.json.set("posts:" + feedSlug, "$", JSON.stringify(postData));
}
