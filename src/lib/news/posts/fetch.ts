import type { Feed, FeedSlug } from "@/lib/news/feeds/types";
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

/** fetches all posts (across all feeds) from redis */
export async function getMultipleFeedsPosts(feedSlugs: FeedSlug[]) {
	const selectedFeeds = feeds.filter((feed) => feedSlugs.includes(feed.slug));

	return (
		await Promise.all(selectedFeeds.map((feed) => getFeedPosts(feed)))
	).flat();
}
