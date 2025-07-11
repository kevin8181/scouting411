import type { PostData } from "@/features/posts/post";

export class FeedProvider {
	type: string;
	execute: () => Promise<PostData[]>;

	constructor(opts: FeedProviderOpts) {
		this.type = opts.type;
		this.execute = opts.execute;
	}
}

type FeedProviderOpts = {
	/** an identifier for the type of upstream source this provider is fetching from */
	type: string;
	/** executes the fetching login and returns the post data */
	execute: () => Promise<PostData[]>;
};
