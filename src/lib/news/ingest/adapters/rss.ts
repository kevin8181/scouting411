import type { FeedAdapter } from "@/lib/news/ingest/types";
import { parseRssFeed } from "feedsmith";
import { cleanHtmlString } from "@/util/cleanHtmlString";

export function RssAdapter(opts: RssAdapterOpts): FeedAdapter {
	const execute = async () => {
		console.log(`fetching rss feed ${opts.feedUrl}`);

		const response = await fetch(opts.feedUrl);
		const xml = await response.text();

		const feed = parseRssFeed(xml);

		if (!feed.items) {
			throw new Error(
				`failed to parse rss feed ${opts.feedUrl}: no "items" property`,
			);
		}

		const postData = feed.items.map((item) => {
			if (!item.link && !item.enclosures?.[0]?.url) {
				throw new Error(`failed to parse rss feed ${opts.feedUrl}: no link or enclosure`);
			}

			if (!item.title) {
				throw new Error(`failed to parse rss feed ${opts.feedUrl}: no title`);
			}

			if (!item.pubDate) {
				throw new Error(`failed to parse rss feed ${opts.feedUrl}: no pubDate`);
			}

			return {
				url: item.link ?? item.enclosures![0]!.url!,
				title: cleanHtmlString(item.title),
				description: item.description
					? cleanHtmlString(item.description)
					: undefined,
				date: item.pubDate,
			};
		});

		console.log(
			`fetched ${postData.length} posts from rss feed ${opts.feedUrl}`,
		);

		return postData;
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
