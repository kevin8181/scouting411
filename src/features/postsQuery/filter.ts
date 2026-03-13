import { z } from "astro/zod";
import { Post } from "@/features/posts/post";
import type { Predicate } from "@/util/utilTypes";

export function filterPosts(
	posts: Post[],
	opts: z.infer<typeof filterOptsSchema>,
) {
	const predicates = buildPredicates(opts);

	return posts.filter((post) =>
		predicates.every((predicate) => predicate(post)),
	);
}

/** turn a filter config into an array of predicates */
function buildPredicates(filter: FilterOpts): Predicate<Post>[] {
	const predicates: Predicate<Post>[] = [];

	for (const [key, value] of Object.entries(filter) as [
		keyof FilterOpts,
		FilterOpts[keyof FilterOpts],
	][]) {
		if (value !== undefined) {
			const factory = predicateFactories[key];
			predicates.push(factory(value as NonNullable<typeof value>));
		}
	}

	return predicates;
}

const predicateFactories: PredicateFactories<FilterOpts, Post> = {
	keyword: (value: string): Predicate<Post> => {
		return (post) => {
			const titleMatch = post.title.toUpperCase().includes(value.toUpperCase());
			const descriptionMatch = !!post.description
				?.toUpperCase()
				.includes(value.toUpperCase());

			return titleMatch || descriptionMatch;
		};
	},
};
type PredicateFactories<F, T> = {
	[K in keyof F]-?: (value: NonNullable<F[K]>) => Predicate<T>;
};

type FilterOpts = z.infer<typeof filterOptsSchema>;
export const filterOptsSchema = z.object({
	keyword: z.string().optional(),
});
