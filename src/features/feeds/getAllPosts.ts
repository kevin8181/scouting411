import { feeds } from "@/features/feeds/data";
import type { PostWithFeedMeta } from "@/features/feeds/types";

export function getAllPosts() {
	const returnPosts: PostWithFeedMeta[] = [];

	for (const feed of feeds) {
		for (const post of feed.posts) {
			returnPosts.push({ post, feedMeta: feed.meta });
		}
	}

	//sort by date descending
	returnPosts.sort((a, b) => b.post.date.getTime() - a.post.date.getTime());

	console.log("get all posts", returnPosts.length);

	return returnPosts;
}
