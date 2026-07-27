import { getAllPosts } from "@/lib/news/cache/cache";
import { sortPosts } from "@/lib/news/query/sort";
import { paginateArray, type PaginatedResults } from "@/util/paginateArray";
import { filterPosts } from "@/lib/news/query/filter";
import type { Post } from "@/lib/news/posts/post";
import type { QueryOpts } from "@/lib/news/query/types";

export async function queryPosts(
	opts: QueryOpts,
): Promise<PaginatedResults<Post>> {
	// todo make it so you can start with only a subset of the feeds
	const posts = await getAllPosts();

	const filteredPosts = filterPosts(posts, opts.filter);

	const sortedPosts = sortPosts(filteredPosts, opts.sort);

	return paginateArray(sortedPosts, opts.paginate);
}
