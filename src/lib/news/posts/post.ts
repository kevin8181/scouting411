import type { Feed } from "@/lib/news/feeds/feed";

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

/** a hydrated post from a feed */
export type Post = {
	url: string;
	title: string;
	description: string | undefined;
	date: Date;
	feed: Feed;
};

/** create a hydrated post from a raw post data object */
export function createHydratedPost(data: PostData, feed: Feed): Post {
	return {
		url: data.url,
		title: data.title,
		description: data.description,
		date: new Date(data.date),
		feed,
	};
}
