import { Feed } from "@/features/feeds/feed";
import { feedConfigs } from "@/features/feeds/config";

// instantiate all the feeds
const feeds = feedConfigs.map((opts) => new Feed(opts));

export class FeedManager {
	static get feeds() {
		return feeds;
	}

	static getFeedBySlug(slug: string) {
		return feeds.find((feed) => feed.slug === slug);
	}

	static async allPosts() {
		const posts = (await Promise.all(feeds.map((feed) => feed.posts()))).flat();

		//return the posts sorted by date descending
		return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	}

	static async updateAllFeeds() {
		await Promise.all(feeds.map((feed) => feed.updatePosts()));
	}
}
