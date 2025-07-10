import type { FeedProvider } from "@/features/feedProviders/feedProvider";
import { parseRssFeed } from "feedsmith";

//todo fetch the full post history on wordpress rss feeds. /feed?paged=2

export function rssProvider(opts: rssProviderOpts): FeedProvider {
	return {
		type: "rss",

		fetch: async () => {
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
					throw new Error(
						`failed to parse rss feed ${opts.feedUrl}: no pubDate`,
					);
				}

				return {
					url: item.link,
					title: item.title,
					description: item.description,
					date: new Date(item.pubDate),
				};
			});
		},
	};
}

type rssProviderOpts = {
	feedUrl: string;
};
