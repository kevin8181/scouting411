import type { CreateFeedOpts } from "@/features/feeds/feed";

import { WordpressApiProvider } from "@/features/feedProviders/providers/wordpressApi";
import { RssProvider } from "@/features/feedProviders/providers/rss";
import { TtaProvider } from "@/features/feedProviders/providers/tta";

export const feedConfigs: CreateFeedOpts[] = [
	{
		name: "Scouts BSA Program Updates",
		slug: "scouts-bsa-program-updates",
		description:
			"Information about changes and updates to the Scouts BSA program.",
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
		description:
			"Information about changes and updates to the Cub Scouts program.",
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
		description:
			"Billed as 'The Official Blog of the Scouting Movement'. General news and updates for professionals, volunteers, and parents.",
		homepageUrl: "https://scoutingwire.org",
		provider: WordpressApiProvider({
			baseUrl: "https://scoutingwire.org",
			//todo split by categories?
		}),
	},
	{
		name: "Scouting Newsroom",
		slug: "scouting-newsroom",
		description:
			"Provides updates and news about the national Scouting administration.",
		homepageUrl: "https://scoutingnewsroom.org",
		provider: RssProvider({
			feedUrl: "https://scoutingnewsroom.org/feed",
			//for some reason the wordpress posts api doesn't return any results on this site
		}),
	},
	{
		name: "Abilities Digest",
		slug: "abilities-digest",
		description:
			"Provides updates and news about special needs scouting. A publication of the National Special Needs and Disabilities Committee.",
		homepageUrl: "https://ablescouts.org",
		provider: RssProvider({
			feedUrl: "https://ablescouts.org/feed",
			//entire wordpress api is 404
		}),
	},
	{
		name: "Scouting Magazine",
		slug: "scouting-magazine",
		description:
			"Editorial content for parents and volunteers. The adult counterpart of Scout Life.",
		homepageUrl: "https://blog.scoutingmagazine.org",
		provider: WordpressApiProvider({
			baseUrl: "https://blog.scoutingmagazine.org",
		}),
	},
	{
		name: "Summit Blog",
		slug: "summit-blog",
		description:
			"News and updates about the Summit Bechtel Reserve and National Scout Jamboree.",
		homepageUrl: "https://www.summitbsa.org/blog",
		provider: WordpressApiProvider({
			baseUrl: "https://summitbsa.org",
		}),
	},
	{
		name: "Scout Life",
		slug: "scout-life",
		description: "Editorial and entertainment content mainly for youth.",
		homepageUrl: "https://scoutlife.org",
		provider: WordpressApiProvider({
			baseUrl: "https://scoutlife.org",
		}),
	},
	{
		name: "Scouting Alumni",
		slug: "scouting-alumni",
		description:
			"The news feed of Scouting Alumni. Primarily editorial content with occasional news.",
		homepageUrl: "https://scoutingalumni.org/news",
		provider: WordpressApiProvider({
			baseUrl: "https://scoutingalumni.org",
		}),
	},
	{
		name: "National Eagle Scout Association",
		slug: "nesa",
		description:
			"The news feed of the National Eagle Scout Association. A mixture of editorial content and news.",
		homepageUrl: "https://nesa.org/news",
		provider: WordpressApiProvider({
			baseUrl: "https://nesa.org",
		}),
	},
	{
		name: "Scouting America Foundation",
		slug: "scouting-america-foundation",
		description:
			"The news feed of the Scouting America Foundation. Mostly entertainment and editorial content.",
		homepageUrl: "https://scoutingamericafoundation.org/foundation-news",
		provider: WordpressApiProvider({
			baseUrl: "https://scoutingamericafoundation.org",
		}),
	},
	{
		name: "Order of the Arrow News",
		slug: "oa-news",
		description:
			"News and updates about the Order of the Arrow on the national level.",
		homepageUrl: "https://oa-scouting.org/news",
		provider: RssProvider({
			feedUrl: "https://oa-scouting.org/rss.xml",
			//not wordpress. might be bespoke. find out about if there's an api or a way to source better data
		}),
	},
	{
		name: "OA System Maintenance",
		slug: "oa-system-maintenance",
		description:
			"Updates on Order of the Arrow's digital infrastructure maintenance and outages.",
		homepageUrl: "https://status.oa-scouting.org/",
		provider: RssProvider({
			feedUrl: "https://status.oa-scouting.org/history.rss",
			// atom feed, text, and email also available
		}),
	},
	{
		name: "Sea Scouts News",
		slug: "sea-scouts-news",
		description: "News and updates about the Sea Scouts program.",
		homepageUrl: "https://seascout.org/latest-news",
		provider: WordpressApiProvider({
			baseUrl: "https://seascout.org/",
		}),
	},
	{
		name: "Troop Leader Resource Updates",
		slug: "troop-leader-resource-updates",
		description: "Updates and news about the Troop Leader Resource Hub.",
		homepageUrl: "https://troopleader.scouting.org/updates-blog",
		provider: WordpressApiProvider({
			baseUrl: "https://troopleader.scouting.org",
		}),
	},
	{
		name: "ScoutCast",
		slug: "scoutcast",
		description: "A defunct podcast about the Scouts BSA program.",
		homepageUrl: "https://podcast.scouting.org/category/scoutcast",
		provider: RssProvider({
			feedUrl: "https://podcast.scouting.org/category/scoutcast/feed",
		}),
	},
	{
		name: "CubCast",
		slug: "cubcast",
		description: "A defunct podcast about the Cub Scouts program.",
		homepageUrl: "https://podcast.scouting.org/category/cubcast",
		provider: RssProvider({
			feedUrl: "https://podcast.scouting.org/category/cubcast/feed",
		}),
	},
	// {
	// 	name: "The Lookout",
	// 	slug: "the-lookout",
	// 	description:
	// 		"The Lookout: Sea Scout Podcast Network. Features both news and interviews.",
	// 	homepageUrl: "https://seascout.org/the-lookout-sea-scout-podcast-network/",
	// 	provider: RssProvider({
	// 		feedUrl: "https://feeds.buzzsprout.com/983503.rss",
	// 	}),
	// },
	{
		name: "Trail to Adventure",
		slug: "trail-to-adventure",
		description:
			"News and updates regarding scout camp administration. The Official Blog of the National Outdoor Programs and Properties Subcommittees.",
		homepageUrl: "https://www.scouting.org/outdoor-programs/trail-to-adventure",
		provider: TtaProvider(),
	},
];
