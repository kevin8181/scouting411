import { z } from "astro/zod";
import { Post } from "@/features/posts/post";

export function filterPosts({
	posts,
	filter,
}: {
	posts: Post[];
	filter: z.infer<typeof filterSchema>;
}) {
	return posts.filter((_post, index) => {
		const predicates = buildPredicates({ index, filter });

		// if all of the predicates are true, return true
		if (Object.values(predicates).every((predicate) => predicate)) {
			return true;
		}

		// if any of the predicates are false, return false
		return false;
	});
}

export const filterSchema = z
	.object({
		startIndex: z.coerce.number().optional(),
		endIndex: z.coerce.number().optional(),
	})
	.strict();

/** check a post against each filter. return an object with a bool for each predicate*/
function buildPredicates({
	index,
	filter,
}: {
	index: number;
	filter: z.infer<typeof filterSchema>;
}) {
	return {
		startIndex:
			filter.startIndex === undefined ? true : index >= filter.startIndex,
		endIndex: filter.endIndex === undefined ? true : index <= filter.endIndex,
	};
}
