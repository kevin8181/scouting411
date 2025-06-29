import { feeds } from "@/features/feeds/data";
import type { PostWithFeedMeta } from "@/features/feeds/types";

// todo for now, cache on first fetch and don't ever refetch on this same build
const cachedPosts: PostWithFeedMeta[] = [];

export async function getAllPosts() {
	if (cachedPosts.length > 0) {
		return cachedPosts;
	}

	const returnPosts: PostWithFeedMeta[] = (await Promise.all(
		feeds.map(async (feed) => {
			const posts = await feed.fetch();

			return posts.map((post) => ({
				post,
				feedMeta: feed.meta,
			}));
		}),
	)).flat();

	//sort by date descending
	returnPosts.sort((a, b) => b.post.date.getTime() - a.post.date.getTime());

	cachedPosts.push(...returnPosts);

	return returnPosts;
}