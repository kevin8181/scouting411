import { queryPostsProcedure } from "@/rpc/procedures/news/posts";
import { listFeedsProcedure } from "@/rpc/procedures/news/feeds";
import { queryResourcesProcedure } from "@/rpc/procedures/resources/resources";
import {
	getMeritBadgeProcedure,
	listMeritBadgesProcedure,
} from "@/rpc/procedures/advancement/meritBadges";
import {
	getRankProcedure,
	listRanksProcedure,
} from "@/rpc/procedures/advancement/ranks";
import {
	getAdventureProcedure,
	listAdventuresProcedure,
} from "@/rpc/procedures/advancement/adventures";

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
		ranks: {
			list: listRanksProcedure,
			get: getRankProcedure,
		},
		adventures: {
			list: listAdventuresProcedure,
			get: getAdventureProcedure,
		},
	},
};
