import type { FeedProvider, Post } from "@/features/feeds/types";
import type { UrlShaped } from "@/util/utilTypes";

export type CreateFeedOpts = {
	name: string;
	homepageUrl: UrlShaped;
	slug: string;
	provider: FeedProvider;
};

export class Feed {
	// INSTANCE PROPERTIES

	readonly name: string;
	readonly slug: string;
	readonly homepageUrl: UrlShaped;
	private readonly _provider: FeedProvider;
	private _cachedPosts!: Post[];

	// CONSTRUCTOR

	static async create(opts: CreateFeedOpts) {
		const feed = new Feed(opts);
		await feed.fetch();
		return feed;
	}
	private constructor(opts: CreateFeedOpts) {
		this.name = opts.name;
		this.slug = opts.slug;
		this.homepageUrl = opts.homepageUrl;
		this._provider = opts.provider;
	}

	// GETTERS

	get provider() {
		return this._provider.type;
	}

	// INSTANCE METHODS

	get posts() {
		return this._cachedPosts;
	}
	get overviewUrl() {
		return `/pulse/feeds/${this.slug}`;
	}
	get rssUrl() {
		return `/feeds/${this.slug}/rss.xml`;
	}

	async fetch() {
		console.log(`fetching posts for ${this.name}`);

		const postData = await this._provider.fetch();

		this._cachedPosts = postData.map((post) => ({
			...post,
			feed: this,
		}));
	}
}
