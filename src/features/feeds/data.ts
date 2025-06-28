import type { Feed } from "@/features/feeds/types";
import { wordpressProvider } from "@/features/feeds/providers/wordpress";
import { rssProvider } from "@/features/feeds/providers/rss";

export const feeds: Feed[] = [
	{
		meta: {
			name: "Scouts BSA Program Updates",
		},
		posts: await wordpressProvider({
			baseUrl: "https://scouting.org",
			categoryFilter: 15054,
		}),
	},
	{
		meta: {
			name: "Cub Scouts Program Updates",
		},
		posts: await wordpressProvider({
			baseUrl: "https://www.scouting.org",
			categoryFilter: 15053,
		}),
	},
	{
		meta: {
			name: "Scouting Wire",
		},
		posts: await wordpressProvider({
			baseUrl: "https://scoutingwire.org",
			categoryFilter: undefined,
			//todo split by categories?
		}),
	},
	{
		meta: {
			name: "Scouting Newsroom",
		},
		posts: await rssProvider({
			feedUrl: "https://scoutingnewsroom.org/feed",
			//for some reason the wordpress posts api doesn't return any results on this site
		}),
	},
	{
		meta: {
			name: "Abilities Digest",
		},
		posts: await rssProvider({
			feedUrl: "https://ablescouts.org/feed/",
			//wordpress api comes back 404
		}),
	},
	{
		meta: {
			name: "Scouting Magazine",
		},
		posts: await wordpressProvider({
			baseUrl: "https://blog.scoutingmagazine.org/",
			categoryFilter: undefined,
		}),
	}

];
