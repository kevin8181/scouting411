import type { Feed } from "@/features/feeds/types";
import { wordpressProvider } from "@/features/feeds/providers/wordpress";
import { rssProvider } from "@/features/feeds/providers/rss";
import { ttaProvider } from "@/features/feeds/providers/trailToAdventure";

export const feeds: Feed[] = [
	{
		meta: {
			name: "Scouts BSA Program Updates",
			homepageUrl:
				"https://www.scouting.org/topics/program-updates/program-updates-scouts-bsa",
		},
		fetch: wordpressProvider({
			baseUrl: "https://scouting.org",
			categoryFilter: 15054,
		}),
	},
	{
		meta: {
			name: "Cub Scouts Program Updates",
			homepageUrl:
				"https://www.scouting.org/topics/program-updates/program-updates-cub-scouts",
		},
		fetch: wordpressProvider({
			baseUrl: "https://www.scouting.org",
			categoryFilter: 15053,
		}),
	},
	{
		meta: {
			name: "Scouting Wire",
			homepageUrl: "https://scoutingwire.org",
		},
		fetch: wordpressProvider({
			baseUrl: "https://scoutingwire.org",
			//todo split by categories?
		}),
	},
	{
		meta: {
			name: "Scouting Newsroom",
			homepageUrl: "https://scoutingnewsroom.org",
		},
		fetch: rssProvider({
			feedUrl: "https://scoutingnewsroom.org/feed",
			//for some reason the wordpress posts api doesn't return any results on this site
		}),
	},
	{
		meta: {
			name: "Abilities Digest",
			homepageUrl: "https://ablescouts.org",
		},
		fetch: rssProvider({
			feedUrl: "https://ablescouts.org/feed",
			//wordpress api comes back 404
		}),
	},
	{
		meta: {
			name: "Scouting Magazine",
			homepageUrl: "https://blog.scoutingmagazine.org",
		},
		fetch: wordpressProvider({
			baseUrl: "https://blog.scoutingmagazine.org",
		}),
	},
	{
		meta: {
			name: "Summit Blog",
			homepageUrl: "https://www.summitbsa.org/blog",
		},
		fetch: wordpressProvider({
			baseUrl: "https://summitbsa.org",
		}),
	},
	{
		meta: {
			name: "Scout Life",
			homepageUrl: "https://scoutlife.org",
		},
		fetch: wordpressProvider({
			baseUrl: "https://scoutlife.org",
		}),
	},
	{
		meta: {
			name: "Scouting Alumni",
			homepageUrl: "https://scoutingalumni.org/news",
		},
		fetch: wordpressProvider({
			baseUrl: "https://scoutingalumni.org",
		}),
	},
	{
		meta: {
			name: "National Eagle Scout Association",
			homepageUrl: "https://nesa.org/news",
		},
		fetch: wordpressProvider({
			baseUrl: "https://nesa.org",
		}),
	},
	{
		meta: {
			name: "Scouting America Foundation",
			homepageUrl: "https://scoutingamericafoundation.org/foundation-news",
		},
		fetch: wordpressProvider({
			baseUrl: "https://scoutingamericafoundation.org",
		}),
	},
	{
		meta: {
			name: "OA News",
			homepageUrl: "https://oa-scouting.org/news",
		},
		fetch: rssProvider({
			feedUrl: "https://oa-scouting.org/rss.xml",
			//not wordpress. might be bespoke. find out about if there's an api or a better feed to use
		}),
	},
	{
		meta: {
			name: "Sea Scouts News",
			homepageUrl: "https://seascout.org/latest-news",
		},
		fetch: wordpressProvider({
			baseUrl: "https://seascout.org/",
		}),
	},
	{
		meta: {
			name: "Troop Leader Resource Updates",
			homepageUrl: "https://troopleader.scouting.org/updates-blog",
		},
		fetch: wordpressProvider({
			baseUrl: "https://troopleader.scouting.org",
		}),
	},
	{
		meta: {
			name: "ScoutCast",
			homepageUrl: "https://podcast.scouting.org/category/scoutcast",
		},
		fetch: rssProvider({
			feedUrl: "https://podcast.scouting.org/category/scoutcast/feed",
		}),
	},
	{
		meta: {
			name: "CubCast",
			homepageUrl: "https://podcast.scouting.org/category/cubcast",
		},
		fetch: rssProvider({
			feedUrl: "https://podcast.scouting.org/category/cubcast/feed",
		}),
	},
	{
		meta: {
			name: "Trail to Adventure",
			homepageUrl:
				"https://www.scouting.org/outdoor-programs/trail-to-adventure",
		},
		fetch: ttaProvider(),
	},
];
