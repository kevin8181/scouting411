import type { Feed } from "@/features/feeds/feed";

/** a raw post data object returned by one of the feed adapters */
export type PostData = {
	/** the original url of the post */
	url: string;
	/** the title of the post */
	title: string;
	/** the description of the post */
	description: string | undefined;
	/** the date the post was published */
	date: Date;
};

/** Represents a post within a feed */
export type Post = PostData & { feed: Feed };

/** an instance of a feed provider */
export type FeedProvider = {
	type: string;
	fetch: () => Promise<PostData[]>;
};
