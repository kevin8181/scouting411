import type { FeedAdapter } from "@/lib/news/ingest/types";
import { parseRssFeed } from "feedsmith";
import { cleanHtmlString } from "@/util/cleanHtmlString";

export function RssAdapter(opts: RssAdapterOpts): FeedAdapter {
	const execute = async () => {
		const response = await fetch(opts.feedUrl);
		const xml = await response.text();

		const feed = parseRssFeed(xml);

		if (!feed.items?.length) {
			throw new Error(`failed to parse rss feed ${opts.feedUrl}: no items`);
		}

		return feed.items.map((item) => {
			if (!item.link) {
				throw new Error(`failed to parse rss feed ${opts.feedUrl}: no link`);
			}

			if (!item.title) {
				throw new Error(`failed to parse rss feed ${opts.feedUrl}: no title`);
			}

			if (!item.pubDate) {
				throw new Error(`failed to parse rss feed ${opts.feedUrl}: no pubDate`);
			}

			return {
				url: item.link,
				title: cleanHtmlString(item.title),
				description: item.description
					? cleanHtmlString(item.description)
					: undefined,
				date: item.pubDate,
			};
		});
	};

	return {
		type: {
			id: "rss",
			human: "RSS",
		},
		execute,
	};
}

type RssAdapterOpts = {
	feedUrl: string;
};
