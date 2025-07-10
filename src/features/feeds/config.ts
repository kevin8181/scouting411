import type { CreateFeedOpts } from "@/features/feeds/feed";

import { wordpressProvider } from "@/features/feedProviders/providers/wordpress";
import { rssProvider } from "@/features/feedProviders/providers/rss";
import { ttaProvider } from "@/features/feedProviders/providers/trailToAdventure";

export const feedConfigs: CreateFeedOpts[] = [
	{
		name: "Scouts BSA Program Updates",
		slug: "scouts-bsa-program-updates",
		homepageUrl:
			"https://www.scouting.org/topics/program-updates/program-updates-scouts-bsa",
		provider: wordpressProvider({
			baseUrl: "https://scouting.org",
			categoryFilter: 15054,
		}),
	},
	{
		name: "Cub Scouts Program Updates",
		slug: "cub-scouts-program-updates",
		homepageUrl:
			"https://www.scouting.org/topics/program-updates/program-updates-cub-scouts",
		provider: wordpressProvider({
			baseUrl: "https://www.scouting.org",
			categoryFilter: 15053,
		}),
	},
	{
		name: "Scouting Wire",
		slug: "scouting-wire",
		homepageUrl: "https://scoutingwire.org",
		provider: wordpressProvider({
			baseUrl: "https://scoutingwire.org",
			//todo split by categories?
		}),
	},
	{
		name: "Scouting Newsroom",
		slug: "scouting-newsroom",
		homepageUrl: "https://scoutingnewsroom.org",
		provider: rssProvider({
			feedUrl: "https://scoutingnewsroom.org/feed",
			//for some reason the wordpress posts api doesn't return any results on this site
		}),
	},
	{
		name: "Abilities Digest",
		slug: "abilities-digest",
		homepageUrl: "https://ablescouts.org",
		provider: rssProvider({
			feedUrl: "https://ablescouts.org/feed",
			//entire wordpress api is 404
		}),
	},
	{
		name: "Scouting Magazine",
		slug: "scouting-magazine",
		homepageUrl: "https://blog.scoutingmagazine.org",
		provider: wordpressProvider({
			baseUrl: "https://blog.scoutingmagazine.org",
		}),
	},
	{
		name: "Summit Blog",
		slug: "summit-blog",
		homepageUrl: "https://www.summitbsa.org/blog",
		provider: wordpressProvider({
			baseUrl: "https://summitbsa.org",
		}),
	},
	{
		name: "Scout Life",
		slug: "scout-life",
		homepageUrl: "https://scoutlife.org",
		provider: wordpressProvider({
			baseUrl: "https://scoutlife.org",
		}),
	},
	{
		name: "Scouting Alumni",
		slug: "scouting-alumni",
		homepageUrl: "https://scoutingalumni.org/news",
		provider: wordpressProvider({
			baseUrl: "https://scoutingalumni.org",
		}),
	},
	{
		name: "National Eagle Scout Association",
		slug: "nesa",
		homepageUrl: "https://nesa.org/news",
		provider: wordpressProvider({
			baseUrl: "https://nesa.org",
		}),
	},
	{
		name: "Scouting America Foundation",
		slug: "scouting-america-foundation",
		homepageUrl: "https://scoutingamericafoundation.org/foundation-news",
		provider: wordpressProvider({
			baseUrl: "https://scoutingamericafoundation.org",
		}),
	},
	{
		name: "Order of the Arrow News",
		slug: "oa-news",
		homepageUrl: "https://oa-scouting.org/news",
		provider: rssProvider({
			feedUrl: "https://oa-scouting.org/rss.xml",
			//not wordpress. might be bespoke. find out about if there's an api or a way to source better data
		}),
	},
	{
		name: "Sea Scouts News",
		slug: "sea-scouts-news",
		homepageUrl: "https://seascout.org/latest-news",
		provider: wordpressProvider({
			baseUrl: "https://seascout.org/",
		}),
	},
	{
		name: "Troop Leader Resource Updates",
		slug: "troop-leader-resource-updates",
		homepageUrl: "https://troopleader.scouting.org/updates-blog",
		provider: wordpressProvider({
			baseUrl: "https://troopleader.scouting.org",
		}),
	},
	{
		name: "ScoutCast",
		slug: "scoutcast",
		homepageUrl: "https://podcast.scouting.org/category/scoutcast",
		provider: rssProvider({
			feedUrl: "https://podcast.scouting.org/category/scoutcast/feed",
		}),
	},
	{
		name: "CubCast",
		slug: "cubcast",
		homepageUrl: "https://podcast.scouting.org/category/cubcast",
		provider: rssProvider({
			feedUrl: "https://podcast.scouting.org/category/cubcast/feed",
		}),
	},
	{
		name: "Trail to Adventure",
		slug: "trail-to-adventure",
		homepageUrl: "https://www.scouting.org/outdoor-programs/trail-to-adventure",
		provider: ttaProvider(),
	},
];
