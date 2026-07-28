import type { FeedConfigEntry, Feed } from "@/lib/news/feeds/types";

/** create a hydrated feed object from a config */
export function hydrateFeed(opts: FeedConfigEntry): Feed {
	return {
		name: opts.name,
		slug: opts.slug,
		description: opts.description,
		urls: {
			overview: `/news/sources/${opts.slug}`,
			rss: `/feeds/${opts.slug}/rss`,
			atom: `/feeds/${opts.slug}/atom`,
			homepage: opts.homepageUrl,
		},
		type: opts.adapter.type,
		defaultVisible: opts.defaultVisible,
	};
}
