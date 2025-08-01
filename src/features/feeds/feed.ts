import { Post } from "@/features/posts/post";
import type { FeedProvider } from "@/features/feedProviders/feedProvider";
import type { UrlShaped } from "@/util/utilTypes";
import { redis } from "@/util/redis";
import type { PostData } from "@/features/posts/post";

export type CreateFeedOpts = {
	name: string;
	slug: string;
	description: string;
	homepageUrl: UrlShaped;
	provider: FeedProvider;
};

export class Feed {
	// INSTANCE PROPERTIES

	readonly name: string;
	readonly slug: string;
	readonly description: string;
	readonly homepageUrl: UrlShaped;
	private readonly _provider: FeedProvider;

	// LIFECYCLE

	constructor(opts: CreateFeedOpts) {
		this.name = opts.name;
		this.slug = opts.slug;
		this.description = opts.description;
		this.homepageUrl = opts.homepageUrl;
		this._provider = opts.provider;
	}

	// GETTERS

	get providerType() {
		return this._provider.type;
	}
	get overviewUrl() {
		return `/pulse/sources/${this.slug}`;
	}
	get rssUrl() {
		return `/feeds/${this.slug}/rss`;
	}

	// INSTANCE METHODS

	/** fetches the posts from the redis cache */
	async posts(): Promise<Post[]> {
		console.log(`fetching cached posts for ${this.name}`);

		// read the data from redis
		const postDatas = await Feed.readCache(this.slug);
		
		return postDatas.map((postData) => {
			return new Post(postData, this);
		});
	}

	// CACHING

	/** read a feed's post data from redis */
	private static async readCache(feedSlug: string) {
		const data: PostData[] | null = await redis.json.get("posts:" + feedSlug);

		return data ?? [];
	}
	/** write a feed's post data to redis */
	private static async writeCache(feedSlug: string, posts: PostData[]) {
		await redis.json.set("posts:" + feedSlug, "$", JSON.stringify(posts));
	}
	/** fetches the posts from the original source and updates the redis cache */
	async updatePosts() {
		console.log(`updating cached posts for ${this.name}`);

		//execute the feed provider to fetch the data from the original source
		const postData = await this._provider.execute();

		// write the data to redis
		await Feed.writeCache(this.slug, postData);
	}
}
