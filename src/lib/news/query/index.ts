import { FeedManager } from "@/lib/news/feeds/feedManager";
import { z } from "astro/zod";
import { sortPosts, sortOptsSchema } from "@/lib/news/query/sort";
import {
	paginateArray,
	paginateOptsSchema,
	type PaginatedResults,
} from "@/util/paginateArray";
import { filterPosts, filterOptsSchema } from "@/lib/news/query/filter";
import type { Post } from "@/lib/news/posts/post";

export async function queryPosts(
	opts: QueryOpts,
): Promise<PaginatedResults<Post>> {
	// todo make it so you can start with only a subset of the feeds
	const posts = await FeedManager.allPosts();

	const filteredPosts = filterPosts(posts, opts.filter);

	const sortedPosts = sortPosts(filteredPosts, opts.sort);

	return paginateArray(sortedPosts, opts.paginate);
}

export type QueryOpts = z.infer<typeof queryOptsSchema>;
export const queryOptsSchema = z.object({
	filter: filterOptsSchema.default({}),
	sort: sortOptsSchema.default({ mode: "date", direction: "desc" }),
	paginate: paginateOptsSchema.default({ page: 1, maxPageSize: 20 }),
});
