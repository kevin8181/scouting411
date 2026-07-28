import { defineAction } from "astro:actions";

import { queryOptsSchema } from "@/lib/news/query/types";
import { queryPosts } from "@/lib/news/query/query";

export const server = {
	queryPosts: defineAction({
		input: queryOptsSchema,
		handler: async (query) => {
			const posts = await queryPosts(query);

			return posts;
		},
	}),
};
