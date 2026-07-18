import type { PostData } from "@/lib/news/posts/post";

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
