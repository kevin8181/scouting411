import type { Feed } from "@/lib/news/feeds/types";
import { readPosts } from "@/lib/news/posts/cache";
import { hydratePost } from "@/lib/news/posts/post";
import { feeds } from "@/lib/news/feeds/feedManager";

// todo push all post access to go through the query system. keep these functions internal

/** fetches a feed's posts from redis */
export async function getFeedPosts(feed: Feed) {
	console.log(`reading cached posts for ${feed.name}`);

	const postData = await readPosts(feed.slug);

	return postData.map((postData) => {
		return hydratePost(postData, feed);
	});
}

//todo maybe make this take an array of feed slugs

/** fetches all posts (across all feeds) from redis */
export async function getAllPosts() {
	return (await Promise.all(feeds.map((feed) => getFeedPosts(feed)))).flat();
}
