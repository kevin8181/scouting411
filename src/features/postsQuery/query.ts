import { FeedManager } from "@/features/feeds/feedManager";
import { z } from "astro/zod";
import {
	paginate,
	paginateOptsSchema,
	type PaginatedResults,
} from "@/util/paginate";
import { Post } from "@/features/posts/post";

export async function queryPosts(
	opts: QueryOpts,
): Promise<PaginatedResults<Post>> {
	// get all the posts. todo make it so you can start with only a subset of the feeds
	const posts = await FeedManager.allPosts();

	// todo add filtering and sorting

	return paginate(posts, opts.paginate);
}

type QueryOpts = z.infer<typeof queryOptsSchema>;
//todo
//eslint-disable-next-line
const queryOptsSchema = z.object({
	paginate: paginateOptsSchema,
});
