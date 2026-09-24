import { queryPostsProcedure } from "@/rpc/procedures/news/posts";
import { listFeedsProcedure } from "@/rpc/procedures/news/feeds";
import { listResourcesProcedure } from "@/rpc/procedures/resources/resources";

export const router = {
	news: {
		posts: {
			query: queryPostsProcedure,
		},
		feeds: {
			list: listFeedsProcedure,
		},
	},
	resources: {
		list: listResourcesProcedure,
	},
};
