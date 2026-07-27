import { hydrateFeed } from "@/lib/news/feeds/feed";
import { feedConfigs } from "@/lib/news/config";

/** the list of all feeds, hydrated and alphabetized */
export const feeds = feedConfigs.map(hydrateFeed).sort((a, b) => a.name.localeCompare(b.name));

/** gets a feed by its slug */
export function getFeedBySlug(slug: string) {
	return feeds.find((feed) => feed.slug === slug);
}
