import type { FeedConfigEntry, Feed } from "@/lib/news/feeds/types";
import { postsQueryParamsEncoder } from "@/lib/news/query/queryParams";
import { feedConfigs } from "@/lib/news/feeds/config";
import { type FeedSlug, feedSlugSchema } from "@/lib/news/feeds/types";

/** the list of all feeds, hydrated and alphabetized */
export const feeds = feedConfigs
	.map(hydrateFeed)
	.sort((a, b) => a.name.localeCompare(b.name));

/** create a hydrated feed object from a config */
function hydrateFeed(opts: FeedConfigEntry): Feed {
	return {
		name: opts.name,
		slug: opts.slug,
		description: opts.description,
		coverImageSrc: opts.coverImageSrc,
		links: {
			overview: `/news/sources/${opts.slug}`,
			browsePosts: `/news/browse?${postsQueryParamsEncoder.encode({
				feeds: [opts.slug],
				filter: {},
				sort: {
					direction: "desc",
					mode: "date",
				},
				paginate: {
					maxPageSize: 20,
					page: 1,
				},
			})}`,
			rss: `/feeds/${opts.slug}/rss`,
			atom: `/feeds/${opts.slug}/atom`,
			homepage: opts.homepageUrl,
		},
		type: opts.adapter.type,
		defaultVisible: opts.defaultVisible,
	};
}

/** type guard to check if a string is a feed slug */
export function isFeedSlug(value: string): value is FeedSlug {
	return feedSlugSchema.safeParse(value).success;
}

/** gets a feed by its slug */
export function getFeedBySlug(slug: FeedSlug) {
	return feeds.find((feed) => feed.slug === slug)!;
}
