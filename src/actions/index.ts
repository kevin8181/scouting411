import { defineAction } from "astro:actions";

import { queryOptsSchema } from "@/lib/news/query";
import { queryPosts } from "@/lib/news/query";

export const server = {
	queryPosts: defineAction({
		input: queryOptsSchema,
		handler: async (query) => {
			const posts = await queryPosts(query);

			return posts;
		},
	}),
};
