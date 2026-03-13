import { FeedManager } from "@/features/feeds/feedManager";
import { z } from "astro/zod";
import {
	paginateArray,
	paginateOptsSchema,
	type PaginatedResults,
} from "@/util/paginateArray";
import { sortPosts, sortOptsSchema } from "@/features/postsQuery/sort";
import { Post } from "@/features/posts/post";

export async function queryPosts(
	opts: QueryOpts,
): Promise<PaginatedResults<Post>> {
	// todo make it so you can start with only a subset of the feeds
	const posts = await FeedManager.allPosts();

	// todo add filtering

	const sortedPosts = sortPosts(posts, opts.sort);

	return paginateArray(sortedPosts, opts.paginate);
}

type QueryOpts = z.infer<typeof queryOptsSchema>;
export const queryOptsSchema = z.object({
	sort: sortOptsSchema.default({ mode: "date", direction: "desc" }),
	paginate: paginateOptsSchema.default({ page: 1, pageSize: 20 }),
});
