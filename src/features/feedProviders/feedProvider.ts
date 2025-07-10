import type { PostData } from "@/features/feeds/types";

export class FeedProvider {
	type: string;
	fetch: () => Promise<PostData[]>;

	constructor(opts: FeedProviderOpts) {
		this.type = opts.type;
		this.fetch = opts.fetch;
	}
}

type FeedProviderOpts = {
	/** an identifier for the type of upstream source this provider is fetching from */
	type: string;
	/** executes the fetching login and returns the post data */
	fetch: () => Promise<PostData[]>;
};
