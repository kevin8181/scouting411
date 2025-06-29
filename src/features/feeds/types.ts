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

// todo add more metadata to feeds or link it up to a resource object
/** a feed configuration object */
export type FeedMeta = {
	/** the name of the feed */
	name: string;
};

export type Feed = {
	/** metadata about this feed */
	meta: FeedMeta;
	/** the feed provider function */
	fetch: FeedProvider;
};

export type FeedProvider = () => Promise<Post[]>;
