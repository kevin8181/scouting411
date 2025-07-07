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

	constructor(opts: CreateFeedOpts) {
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

	async posts(): Promise<Post[]> {
		if (this.cachedPosts.length > 0) {
			return this.cachedPosts;
		}

		console.log(`fetching posts for ${this.name}`);

		const postData = await this._provider.fetch();

		this.cachedPosts = postData.map((post) => ({
			...post,
			feed: this,
		}));

		return this.cachedPosts;
	}

	// STATIC PROPERTIES

	private static _instances: Feed[] = [];
	static async allPosts() {

		console.log("fetching all posts");

		const posts = (
			await Promise.all(Feed._instances.map(async (feed) => await feed.posts()))
		).flat();

		//return the posts sorted by date descending
		return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	}

	static get instances() {
		return Feed._instances;
	}
}

// instantiate all the feeds
import { feedConfigs } from "@/features/feeds/config";
for (const feedConfig of feedConfigs) {
	new Feed(feedConfig);
}