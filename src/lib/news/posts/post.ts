import type { Feed } from "@/lib/news/feeds/feed";
import type { PostData } from "@/lib/news/fetching/types";

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
