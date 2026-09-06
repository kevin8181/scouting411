import { getMultipleFeedsPosts } from "@/lib/news/cache/fetch";
import { sortPosts } from "@/lib/news/query/sort";
import { paginateArray, type PaginatedResults } from "@/util/paginateArray";
import { filterPosts } from "@/lib/news/query/filter";
import type { Post } from "@/lib/news/feeds/post";
import type { QueryOpts } from "@/lib/news/query/types";

export async function queryPosts(
	opts: QueryOpts,
): Promise<PaginatedResults<Post>> {
	const posts = await getMultipleFeedsPosts(opts.feeds);

	const filteredPosts = filterPosts(posts, opts.filter);

	const sortedPosts = sortPosts(filteredPosts, opts.sort);

	return paginateArray(sortedPosts, opts.paginate);
}
