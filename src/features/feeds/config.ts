import type { CreateFeedOpts } from "@/features/feeds/feed";

import { WordpressApiProvider } from "@/features/feedProviders/providers/wordpress";
import { RssProvider } from "@/features/feedProviders/providers/rss";
import { TtaProvider } from "@/features/feedProviders/providers/trailToAdventure";

export const feedConfigs: CreateFeedOpts[] = [
	{
		name: "Scouts BSA Program Updates",
		slug: "scouts-bsa-program-updates",
		homepageUrl:
			"https://www.scouting.org/topics/program-updates/program-updates-scouts-bsa",
		provider: WordpressApiProvider({
			baseUrl: "https://scouting.org",
			categoryFilter: 15054,
		}),
	},
	{
		name: "Cub Scouts Program Updates",
		slug: "cub-scouts-program-updates",
		homepageUrl:
			"https://www.scouting.org/topics/program-updates/program-updates-cub-scouts",
		provider: WordpressApiProvider({
			baseUrl: "https://www.scouting.org",
			categoryFilter: 15053,
		}),
	},
	{
		name: "Scouting Wire",
		slug: "scouting-wire",
		homepageUrl: "https://scoutingwire.org",
		provider: WordpressApiProvider({
			baseUrl: "https://scoutingwire.org",
			//todo split by categories?
		}),
	},
	{
		name: "Scouting Newsroom",
		slug: "scouting-newsroom",
		homepageUrl: "https://scoutingnewsroom.org",
		provider: RssProvider({
			feedUrl: "https://scoutingnewsroom.org/feed",
			//for some reason the wordpress posts api doesn't return any results on this site
		}),
	},
	{
		name: "Abilities Digest",
		slug: "abilities-digest",
		homepageUrl: "https://ablescouts.org",
		provider: RssProvider({
			feedUrl: "https://ablescouts.org/feed",
			//entire wordpress api is 404
		}),
	},
	{
		name: "Scouting Magazine",
		slug: "scouting-magazine",
		homepageUrl: "https://blog.scoutingmagazine.org",
		provider: WordpressApiProvider({
			baseUrl: "https://blog.scoutingmagazine.org",
		}),
	},
	{
		name: "Summit Blog",
		slug: "summit-blog",
		homepageUrl: "https://www.summitbsa.org/blog",
		provider: WordpressApiProvider({
			baseUrl: "https://summitbsa.org",
		}),
	},
	{
		name: "Scout Life",
		slug: "scout-life",
		homepageUrl: "https://scoutlife.org",
		provider: WordpressApiProvider({
			baseUrl: "https://scoutlife.org",
		}),
	},
	{
		name: "Scouting Alumni",
		slug: "scouting-alumni",
		homepageUrl: "https://scoutingalumni.org/news",
		provider: WordpressApiProvider({
			baseUrl: "https://scoutingalumni.org",
		}),
	},
	{
		name: "National Eagle Scout Association",
		slug: "nesa",
		homepageUrl: "https://nesa.org/news",
		provider: WordpressApiProvider({
			baseUrl: "https://nesa.org",
		}),
	},
	{
		name: "Scouting America Foundation",
		slug: "scouting-america-foundation",
		homepageUrl: "https://scoutingamericafoundation.org/foundation-news",
		provider: WordpressApiProvider({
			baseUrl: "https://scoutingamericafoundation.org",
		}),
	},
	{
		name: "Order of the Arrow News",
		slug: "oa-news",
		homepageUrl: "https://oa-scouting.org/news",
		provider: RssProvider({
			feedUrl: "https://oa-scouting.org/rss.xml",
			//not wordpress. might be bespoke. find out about if there's an api or a way to source better data
		}),
	},
	{
		name: "Sea Scouts News",
		slug: "sea-scouts-news",
		homepageUrl: "https://seascout.org/latest-news",
		provider: WordpressApiProvider({
			baseUrl: "https://seascout.org/",
		}),
	},
	{
		name: "Troop Leader Resource Updates",
		slug: "troop-leader-resource-updates",
		homepageUrl: "https://troopleader.scouting.org/updates-blog",
		provider: WordpressApiProvider({
			baseUrl: "https://troopleader.scouting.org",
		}),
	},
	{
		name: "ScoutCast",
		slug: "scoutcast",
		homepageUrl: "https://podcast.scouting.org/category/scoutcast",
		provider: RssProvider({
			feedUrl: "https://podcast.scouting.org/category/scoutcast/feed",
		}),
	},
	{
		name: "CubCast",
		slug: "cubcast",
		homepageUrl: "https://podcast.scouting.org/category/cubcast",
		provider: RssProvider({
			feedUrl: "https://podcast.scouting.org/category/cubcast/feed",
		}),
	},
	{
		name: "Trail to Adventure",
		slug: "trail-to-adventure",
		homepageUrl: "https://www.scouting.org/outdoor-programs/trail-to-adventure",
		provider: TtaProvider(),
	},
];
