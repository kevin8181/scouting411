import { hydrateFeed } from "@/lib/news/feeds/feed";
import { feedConfigs } from "@/lib/news/config";
import { type FeedSlug, feedSlugSchema } from "@/lib/news/types";

/** the list of all feeds, hydrated and alphabetized */
export const feeds = feedConfigs.map(hydrateFeed).sort((a, b) => a.name.localeCompare(b.name));

/** gets a feed by its slug */
export function getFeedBySlug(slug: FeedSlug) {
	return feeds.find((feed) => feed.slug === slug)!;
}

export function isFeedSlug(value: unknown): value is FeedSlug {
	return feedSlugSchema.safeParse(value).success;
}