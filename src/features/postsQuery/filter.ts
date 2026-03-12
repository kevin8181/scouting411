// import { z } from "astro/zod";
// import { Post } from "@/features/posts/post";

// export function filterPosts({
// 	posts,
// 	filterOpts,
// }: {
// 	posts: Post[];
// 	filterOpts: z.infer<typeof filterOptsSchema>;
// }) {
// 	return posts.filter((_post) => {
// 		const predicates = buildPredicates(filterOpts);

// 		// if all of the predicates are true, return true
// 		if (Object.values(predicates).every((predicate) => predicate)) {
// 			return true;
// 		}

// 		// if any of the predicates are false, return false
// 		return false;
// 	});
// }

// /** check a post against each filter. return an object with a bool for each predicate */
// function buildPredicates(filters: FilterOpts) {
// 	return {

// 	};
// }

// export const filterOptsSchema = z.object({
// 	dateBefore: z.coerce.date().optional(),
// 	dateAfter: z.coerce.date().optional(),
// }).strict();
// export type FilterOpts = z.infer<typeof filterOptsSchema>;
