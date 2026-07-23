/** a raw post data object returned by one of the feed adapters */
export type PostData = {
	/** the original url of the post */
	url: string;
	/** the title of the post */
	title: string;
	/** the description of the post */
	description: string | undefined;
	/** the date the post was published */
	date: string;
};

/** the shape of an adapter function to fetch a certain type of feed */
export type FeedAdapter = {
	/** metadata about the feed adapter type */
	type: {
		/** machine id for the type of adapter (rss, wordpressApi, etc) */
		id: string;
		/** human-readable name for the type of feed adapter (RSS, Wordpress API, etc) */
		human: string;
	};

	/** executes the fetching login and returns the post data */
	execute: () => Promise<PostData[]>;
};
