import { z } from "astro/zod";
import { Post } from "@/features/posts/post";

export function sortPosts(posts: Post[], opts: z.infer<typeof sortOptsSchema>) {
	let sortedPosts;

	switch (opts.mode) {
		case "date":
			sortedPosts = posts.sort((a, b) => a.date.getTime() - b.date.getTime());
			break;
		default:
			return posts;
	}

	if (opts.direction === "desc") {
		sortedPosts.reverse();
	}

	return sortedPosts;
}

export const sortOptsSchema = z.object({
	mode: z.enum(["date"]),
	direction: z.enum(["asc", "desc"]),
});
