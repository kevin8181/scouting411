import type { PostData } from "@/features/posts/post";

export class FeedAdapter {
	type: {
		id: string;
		human: string;
	};

	execute: () => Promise<PostData[]>;

	constructor(opts: FeedAdapterOpts) {
		this.type = opts.type;
		this.execute = opts.execute;
	}
}

type FeedAdapterOpts = {
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
