import { Feed } from "@/features/feeds/feed";
import { feedConfigs } from "@/features/feeds/config";

// instantiate all the feeds. this top-level await implicitly makes FeedManager imports await, meaning nothing will resolve until all the feeds have been created and fetched.
const feeds = await Promise.all(
	feedConfigs.map((feedConfig) => Feed.create(feedConfig)),
);

export class FeedManager {
	static get feeds() {
		return feeds;
	}

	static allPosts() {
		const posts = feeds.map((feed) => feed.posts).flat();

		//return the posts sorted by date descending
		return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	}
}
