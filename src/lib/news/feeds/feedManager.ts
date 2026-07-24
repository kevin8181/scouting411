import { hydrateFeed } from "@/lib/news/feeds/feed";
import { feedConfigs } from "@/lib/news/config";
import { getFeedPosts } from "@/lib/news/cache/cache";

// hydrate all the feeds
const feeds = feedConfigs.map(hydrateFeed);

export class FeedManager {
	static get feeds() {
		return feeds;
	}

	static getFeedBySlug(slug: string) {
		return feeds.find((feed) => feed.slug === slug);
	}

	static async getAllPosts() {
		const posts = (
			await Promise.all(feeds.map((feed) => getFeedPosts(feed)))
		).flat();

		//return the posts sorted by date descending
		return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	}
}
