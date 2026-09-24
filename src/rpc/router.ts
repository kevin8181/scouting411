import { queryPostsProcedure } from "@/rpc/procedures/news/posts";

export const router = {
	news: {
		posts: {
			query: queryPostsProcedure,
		},
	},
};
