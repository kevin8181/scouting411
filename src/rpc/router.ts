import { queryPostsProcedure } from "@/rpc/procedures/news/posts";
import { listFeedsProcedure } from "@/rpc/procedures/news/feeds";
import { queryResourcesProcedure } from "@/rpc/procedures/resources/resources";
import {
	getMeritBadgeProcedure,
	listMeritBadgesProcedure,
} from "@/rpc/procedures/advancement/meritBadges";

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
		query: queryResourcesProcedure,
	},
	advancement: {
		meritBadges: {
			list: listMeritBadgesProcedure,
			get: getMeritBadgeProcedure,
		},
	},
};
