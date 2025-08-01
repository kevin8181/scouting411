import type { Feed } from "@/features/feeds/feed";

/** a raw post data object returned by one of the feed adapters */
export type PostData = {
	/** the original url of the post */
	url: string;
	/** the title of the post */
	title: string;
	/** the description of the post */
	description: string | undefined;
	/** the date the post was published */
	date: string;
};

/** a post from a feed */
export class Post {
	url: string;
	title: string;
	description: string | undefined;
	date: Date;
	feed: Feed;

	constructor(data: PostData, feed: Feed) {
		this.url = data.url;
		this.title = data.title;
		this.description = data.description;
		this.date = new Date(data.date);
		this.feed = feed;
	}
}
