import type { Feed } from "@/features/feeds/types";
import { wordpressProvider } from "@/features/feeds/providers/wordpress";
import { rssProvider } from "@/features/feeds/providers/rss";
import { ttaProvider } from "@/features/feeds/providers/trailToAdventure";

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
	},
	{
		meta: {
			name: "Summit Blog",
		},
		posts: await wordpressProvider({
			baseUrl: "https://summitbsa.org",
			categoryFilter: undefined,
		}),
	},
	{
		meta: {
			name: "Scout Life",
		},
		posts: await wordpressProvider({
			baseUrl: "https://scoutlife.org",
			categoryFilter: undefined,
		}),
	},
	{
		meta: {
			name: "Scouting Alumni",
		},
		posts: await wordpressProvider({
			baseUrl: "https://scoutingalumni.org",
			categoryFilter: undefined,
		}),
	},
	{
		meta: {
			name: "National Eagle Scout Association",
		},
		posts: await wordpressProvider({
			baseUrl: "https://nesa.org",
			categoryFilter: undefined,
		}),
	},
	{
		meta: {
			name: "Scouting America Foundation",
		},
		posts: await wordpressProvider({
			baseUrl: "https://scoutingamericafoundation.org",
			categoryFilter: undefined,
		}),
	},
	{
		meta: {
			name: "OA News",
		},
		posts: await rssProvider({
			feedUrl: "https://oa-scouting.org/rss.xml",
			//not wordpress. might be bespoke. find out about if there's an api or a better feed to use
		}),
	},
	{
		meta: {
			name: "Sea Scouts News",
		},
		posts: await wordpressProvider({
			baseUrl: "https://seascout.org/",
			categoryFilter: undefined,
		}),
	},
	{
		meta: {
			name: "Troop Leader Resource Updates",
		},
		posts: await wordpressProvider({
			baseUrl: "https://troopleader.scouting.org",
			categoryFilter: undefined,
		}),
	},
	{
		meta: {
			name: "ScoutCast",
		},
		posts: await rssProvider({
			feedUrl: "https://podcast.scouting.org/category/scoutcast/feed/",
		}),
	},
	{
		meta: {
			name: "CubCast",
		},
		posts: await rssProvider({
			feedUrl: "https://podcast.scouting.org/category/cubcast/feed/",
		}),
	},
	{
		meta: {
			name: "Trail to Adventure",
		},
		posts: await ttaProvider(),
	}
];
