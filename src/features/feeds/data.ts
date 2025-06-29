import type { Feed } from "@/features/feeds/types";
import { wordpressProvider } from "@/features/feeds/providers/wordpress";
import { rssProvider } from "@/features/feeds/providers/rss";
import { ttaProvider } from "@/features/feeds/providers/trailToAdventure";

export const feeds: Feed[] = [
	{
		meta: {
			name: "Scouts BSA Program Updates",
		},
		fetch: wordpressProvider({
			baseUrl: "https://scouting.org",
			categoryFilter: 15054,
		}),
	},
	{
		meta: {
			name: "Cub Scouts Program Updates",
		},
		fetch: wordpressProvider({
			baseUrl: "https://www.scouting.org",
			categoryFilter: 15053,
		}),
	},
	{
		meta: {
			name: "Scouting Wire",
		},
		fetch: wordpressProvider({
			baseUrl: "https://scoutingwire.org",
			//todo split by categories?
		}),
	},
	{
		meta: {
			name: "Scouting Newsroom",
		},
		fetch: rssProvider({
			feedUrl: "https://scoutingnewsroom.org/feed",
			//for some reason the wordpress posts api doesn't return any results on this site
		}),
	},
	{
		meta: {
			name: "Abilities Digest",
		},
		fetch: rssProvider({
			feedUrl: "https://ablescouts.org/feed/",
			//wordpress api comes back 404
		}),
	},
	{
		meta: {
			name: "Scouting Magazine",
		},
		fetch: wordpressProvider({
			baseUrl: "https://blog.scoutingmagazine.org/",
		}),
	},
	{
		meta: {
			name: "Summit Blog",
		},
		fetch: wordpressProvider({
			baseUrl: "https://summitbsa.org",
		}),
	},
	{
		meta: {
			name: "Scout Life",
		},
		fetch: wordpressProvider({
			baseUrl: "https://scoutlife.org",
		}),
	},
	{
		meta: {
			name: "Scouting Alumni",
		},
		fetch: wordpressProvider({
			baseUrl: "https://scoutingalumni.org",
		}),
	},
	{
		meta: {
			name: "National Eagle Scout Association",
		},
		fetch: wordpressProvider({
			baseUrl: "https://nesa.org",
		}),
	},
	{
		meta: {
			name: "Scouting America Foundation",
		},
		fetch: wordpressProvider({
			baseUrl: "https://scoutingamericafoundation.org",
		}),
	},
	{
		meta: {
			name: "OA News",
		},
		fetch: rssProvider({
			feedUrl: "https://oa-scouting.org/rss.xml",
			//not wordpress. might be bespoke. find out about if there's an api or a better feed to use
		}),
	},
	{
		meta: {
			name: "Sea Scouts News",
		},
		fetch: wordpressProvider({
			baseUrl: "https://seascout.org/",
		}),
	},
	{
		meta: {
			name: "Troop Leader Resource Updates",
		},
		fetch: wordpressProvider({
			baseUrl: "https://troopleader.scouting.org",
		}),
	},
	{
		meta: {
			name: "ScoutCast",
		},
		fetch: rssProvider({
			feedUrl: "https://podcast.scouting.org/category/scoutcast/feed/",
		}),
	},
	{
		meta: {
			name: "CubCast",
		},
		fetch: rssProvider({
			feedUrl: "https://podcast.scouting.org/category/cubcast/feed/",
		}),
	},
	{
		meta: {
			name: "Trail to Adventure",
		},
		fetch: ttaProvider(),
	},
];
