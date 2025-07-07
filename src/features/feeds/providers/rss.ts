import RssParser from "rss-parser";
import type { FeedProvider } from "@/features/feeds/types";

//todo fetch the full post history

export function rssProvider(opts: rssProviderOpts): FeedProvider {
	return {
		type: "rss",

		fetch: async () => {
			const rssParser = new RssParser();
			const feed = await rssParser.parseURL(opts.feedUrl);

			return feed.items.map((item) => ({
				url: item.link!,
				title: item.title!,
				description: item.contentSnippet ?? "",
				date: new Date(item.isoDate!),
			}));
		},
	};
}

type rssProviderOpts = {
	feedUrl: string;
};
