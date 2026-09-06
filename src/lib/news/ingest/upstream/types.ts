import type { PostData } from "@/lib/news/ingest/types";

/** the shape of an adapter function to fetch a certain type of feed */
export type FeedAdapter = {
	/** metadata about the feed adapter type */
	type: {
		/** machine id for the type of adapter (rss, wordpress-api, etc) */
		id: string;
		/** human-readable name for the type of feed adapter (RSS, Wordpress API, etc) */
		human: string;
	};

	/** executes the fetching login and returns the post data */
	execute: () => Promise<PostData[]>;
};
