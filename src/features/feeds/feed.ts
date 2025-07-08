import type { FeedProvider, Post } from "@/features/feeds/types";
import type { UrlShaped } from "@/util/utilTypes";

export type CreateFeedOpts = {
	name: string;
	homepageUrl: UrlShaped;
	provider: FeedProvider;
};

export class Feed {
	// INSTANCE PROPERTIES

	private readonly _name: string;
	private readonly _homepageUrl: UrlShaped;

	private readonly _provider: FeedProvider;
	private cachedPosts: Post[];

	// CONSTRUCTOR

	private constructor(opts: CreateFeedOpts) {
		this._name = opts.name;
		this._homepageUrl = opts.homepageUrl;
		this._provider = opts.provider;
		this.cachedPosts = [];

		//add this feed to the list of all feeds
		Feed._instances.push(this);
	}

	// INSTANCE METHODS

	get name() {
		return this._name;
	}
	get homepageUrl() {
		return this._homepageUrl;
	}
	get type() {
		return this._provider.type;
	}

	get posts(): Post[] {
		return this.cachedPosts;
	}

	async fetch() {
		console.log(`fetching posts for ${this.name}`);

		const postData = await this._provider.fetch();

		this.cachedPosts = postData.map((post) => ({
			...post,
			feed: this,
		}));

		return this;
	}

	// STATIC PROPERTIES

	private static _instances: Feed[] = [];
	static async allPosts() {
		const posts = Feed._instances.map((feed) => feed.posts).flat();

		//return the posts sorted by date descending
		return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	}

	static get instances() {
		return Feed._instances;
	}

	static async create(opts: CreateFeedOpts) {
		const feed = new Feed(opts);

		await feed.fetch();
	}
}

// instantiate all the feeds
import { feedConfigs } from "@/features/feeds/config";
Promise.all(feedConfigs.map((feedConfig) => Feed.create(feedConfig)));
