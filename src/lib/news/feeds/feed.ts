import type { FeedAdapter } from "@/lib/news/ingest/types";
import type { FeedConfig } from "@/lib/news/config";

export type Feed = {
	name: string;
	slug: string;
	description: string;
	urls: {
		/** relative href to the detail page for this feed */
		overview: string;
		/** relative href to the generated rss feed */
		rss: string;
		/** relative href to the generated atom feed */
		atom: string;
		/** upstream's html homepage */
		homepage: string;
	};
	type: FeedAdapter["type"];
};

export function hydrateFeed(opts: FeedConfig): Feed {
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
	};
}
