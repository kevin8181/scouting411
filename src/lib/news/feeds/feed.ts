import { createHydratedPost, type Post } from "@/lib/news/posts/post";
import type { FeedAdapter } from "@/lib/news/fetching/types";
import type { UrlShaped } from "@/util/utilTypes";
import { readCache } from "@/lib/news/fetching/cache";
import type { FeedConfig } from "@/lib/news/config";

export class Feed {
	// INSTANCE PROPERTIES

	readonly name: string;
	readonly slug: string;
	readonly description: string;
	private readonly _homepageUrl: UrlShaped;
	private readonly _adapter: FeedAdapter;

	// LIFECYCLE

	constructor(opts: FeedConfig) {
		this.name = opts.name;
		this.slug = opts.slug;
		this.description = opts.description;
		this._homepageUrl = opts.homepageUrl;
		this._adapter = opts.adapter;
	}

	// GETTERS

	get type() {
		return this._adapter.type;
	}

	get urls() {
		return {
			/** relative href to the detail page for this feed */
			overview: `/news/sources/${this.slug}`,
			/** relative href to the generated rss feed */
			rss: `/feeds/${this.slug}/rss`,
			/** relative href to the generated atom feed */
			atom: `/feeds/${this.slug}/atom`,
			/** upstream's html homepage */
			homepage: this._homepageUrl,
		};
	}

	// INSTANCE METHODS

	/** fetches the posts from the redis cache */
	async posts(): Promise<Post[]> {
		console.log(`reading cached posts for ${this.name}`);

		const postDatas = await readCache(this.slug);

		return postDatas.map((postData) => {
			return createHydratedPost(postData, this);
		});
	}
}
