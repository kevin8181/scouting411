import { redis } from "@/util/redisClient";
import type { PostData } from "@/lib/news/ingest/types";
import { hydratePost } from "@/lib/news/posts/post";
import type { Feed } from "@/lib/news/types";
import { feeds } from "@/lib/news/feeds/feedManager";

/** read a feed's cached post data from redis */
export async function readCache(feedSlug: string) {
	const data: PostData[] | null = await redis.json.get("posts:" + feedSlug);

	return data ?? [];
}

// todo push all post access to go through the query system. keep this internal
/** fetches a feed's posts from redis */
export async function getFeedPosts(feed: Feed) {
	console.log(`reading cached posts for ${feed.name}`);

	const postData = await readCache(feed.slug);

	return postData.map((postData) => {
		return hydratePost(postData, feed);
	});
}

/** fetches all posts (across all feeds) from redis */
export async function getAllPosts() {
	const posts = (
		await Promise.all(feeds.map((feed) => getFeedPosts(feed)))
	).flat();

	//return the posts sorted by date descending
	return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
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
