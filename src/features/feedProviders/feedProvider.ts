import type { PostData } from "@/features/posts/post";

export class FeedProvider {
	type: {
		id: string;
		human: string;
	};

	execute: () => Promise<PostData[]>;

	constructor(opts: FeedProviderOpts) {
		this.type = opts.type;
		this.execute = opts.execute;
	}
}

type FeedProviderOpts = {
	/** metadata about the feed provider type */
	type: {
		/** machine id for the type of provider (rss, wordpressApi, etc) */
		id: string;
		/** human-readable name for the type of feed provider (RSS, Wordpress API, etc) */
		human: string;
	};

	/** executes the fetching login and returns the post data */
	execute: () => Promise<PostData[]>;
};
