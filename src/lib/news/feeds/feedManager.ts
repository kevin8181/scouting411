import { hydrateFeed } from "@/lib/news/feeds/feed";
import { feedConfigs } from "@/lib/news/feeds/config";
import { type FeedSlug, feedSlugSchema } from "@/lib/news/feeds/types";

/** the list of all feeds, hydrated and alphabetized */
export const feeds = feedConfigs
	.map(hydrateFeed)
	.sort((a, b) => a.name.localeCompare(b.name));

/** gets a feed by its slug */
export function getFeedBySlug(slug: FeedSlug) {
	return feeds.find((feed) => feed.slug === slug)!;
}

/** type guard to check if a string is a feed slug */
export function isFeedSlug(value: string): value is FeedSlug {
	return feedSlugSchema.safeParse(value).success;
}
