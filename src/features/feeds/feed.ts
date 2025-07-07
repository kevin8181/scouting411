import type { FeedProvider, Post } from "@/features/feeds/types";
import type { UrlShaped } from "@/util/utilTypes";

// todo add more metadata to feeds or link it up to a resource object

type CreateFeedOpts = {
	name: string;
	homepageUrl: UrlShaped;
	provider: FeedProvider;
};

export class Feed {
	private readonly _name: string;
	private readonly _homepageUrl: UrlShaped;

	private readonly _provider: FeedProvider;
	private cachedPosts: Post[];

	constructor(opts: CreateFeedOpts) {
		this._name = opts.name;
		this._homepageUrl = opts.homepageUrl;

		this._provider = opts.provider;

		this.cachedPosts = [];
	}

	async posts(): Promise<Post[]> {
		if (this.cachedPosts.length > 0) {
			return this.cachedPosts;
		}

		console.log(`fetching posts for feed ${this.name}`);

		this.cachedPosts = await this._provider.fetch();
		return this.cachedPosts;
	}

	get name() {
		return this._name;
	}
	get homepageUrl() {
		return this._homepageUrl;
	}
	get type() {
		return this._provider.type;
	}
}
