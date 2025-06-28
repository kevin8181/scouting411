import { feeds } from "@/features/feeds/data";
import type { PostWithFeedMeta } from "@/features/feeds/types";

export async function getAllPosts() {
	const returnPosts: PostWithFeedMeta[] = [];

	for (const feed of feeds) {
		for (const post of feed.posts) {
			returnPosts.push({ post, feedMeta: feed.meta });
		}
	}

	returnPosts.sort((a, b) => b.post.date.getTime() - a.post.date.getTime());

	return returnPosts;
}
