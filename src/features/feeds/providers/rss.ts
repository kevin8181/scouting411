import RssParser from "rss-parser";
import type { Post } from "@/features/feeds/posts/types";

export async function rssProvider(opts: rssProviderOpts): Promise<Post[]> {
	const rssParser = new RssParser();
	const feed = await rssParser.parseURL(opts.feedUrl);

	return feed.items.map((item) => ({
		url: item.link,
		title: item.title,
		description: item.contentSnippet,
		date: item.isoDate ? new Date(item.isoDate) : undefined,
	}));
}

type rssProviderOpts = {
	feedUrl: string;
};
