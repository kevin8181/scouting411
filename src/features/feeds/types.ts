import type { Feed } from "@/features/feeds/feed";

/** a parsed post object returned by one of the feed adapters */
export type Post = {
	/** the original url of the post */
	url: string;
	/** the title of the post */
	title: string;
	/** the description of the post */
	description: string | undefined;
	/** the date the post was published */
	date: Date;
};

export type PostWithFeed = Post & { feed: Feed };

/** a function which fetches and returns the posts from a feed */
export type FeedProvider = () => Promise<Post[]>;
