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

export type PostWithFeedMeta = {
	post: Post;
	feedMeta: FeedMeta;
};

/** a feed configuration object */
export type FeedMeta = {
	/** the name of the feed */
	name: string;
};

export type Feed = {
	/** metadata about this feed */
	meta: FeedMeta;
	/** the posts returned by the feed */
	posts: Post[];
};
