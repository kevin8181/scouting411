import { feeds } from "@/features/feeds/config";
import type { PostWithFeed } from "@/features/feeds/types";

// todo for now, cache on first fetch and don't ever refetch on this same build
const cachedPosts: PostWithFeed[] = [];

export async function getAllPosts() {
	if (cachedPosts.length > 0) {
		return cachedPosts;
	}

	const returnPosts: PostWithFeed[] = (
		await Promise.all(
			feeds.map(async (feed) => {
				const posts = await feed.posts();

				return posts.map((post) => ({
					post,
					feed: feed,
				}));
			}),
		)
	).flat();

	//sort by date descending
	returnPosts.sort((a, b) => b.post.date.getTime() - a.post.date.getTime());

	cachedPosts.push(...returnPosts);

	return returnPosts;
}
