import { WordpressAdapter } from "@/lib/news/ingest/adapters/wordpress";
import { RssAdapter } from "@/lib/news/ingest/adapters/rss";
import { TtaAdapter } from "@/lib/news/ingest/adapters/tta";
import type { FeedAdapter } from "@/lib/news/ingest/types";
import type { UrlShaped } from "@/util/utilTypes";

export const feedConfigs: FeedConfig[] = [
	{
		name: "Scouts BSA Program Updates",
		slug: "scouts-bsa-program-updates",
		description:
			"Information about changes and updates to the Scouts BSA program.",
		homepageUrl:
			"https://www.scouting.org/topics/program-updates/program-updates-scouts-bsa",
		adapter: WordpressAdapter({
			baseUrl: "https://scouting.org",
			categoryFilter: 15054,
		}),
		defaultVisible: true,
	},
	{
		name: "Cub Scouts Program Updates",
		slug: "cub-scouts-program-updates",
		description:
			"Information about changes and updates to the Cub Scouts program.",
		homepageUrl:
			"https://www.scouting.org/topics/program-updates/program-updates-cub-scouts",
		adapter: WordpressAdapter({
			baseUrl: "https://www.scouting.org",
			categoryFilter: 15053,
		}),
		defaultVisible: true,
	},
	{
		name: "#CubChatLive",
		slug: "cubchat",
		description: "The official video podcast of the Cub Scouts program.",
		homepageUrl: "https://onscouting.org/cubchatlive/",
		adapter: RssAdapter({
			feedUrl: "https://anchor.fm/s/10fd33ec4/podcast/rss",
		}),
		defaultVisible: true,
	},
	// todo it says this is "on hiatus". could not locate an rss feed other than via youtube
	// {
	// 	name: "#TroopTalkLive",
	// 	slug: "trooptalk",
	// 	description: "The official video podcast of the Scouts BSA program.",
	// 	homepageUrl: "https://onscouting.org/trooptalklive/",
	// 	adapter: RssAdapter({
	// 		feedUrl: "",
	// 	}),
	// 	defaultVisible: true,
	// },
	{
		name: "Scouting Magazine",
		slug: "scouting-magazine",
		description:
			"Editorial content for parents and volunteers. The adult counterpart of Scout Life.",
		homepageUrl: "https://blog.scoutingmagazine.org",
		adapter: WordpressAdapter({
			baseUrl: "https://blog.scoutingmagazine.org",
		}),
		defaultVisible: true,
	},
	{
		name: "Trail to Adventure",
		slug: "trail-to-adventure",
		description:
			"News and updates regarding scout camp administration. The Official Blog of the National Outdoor Programs and Properties Subcommittees.",
		homepageUrl: "https://www.scouting.org/outdoor-programs/trail-to-adventure",
		adapter: TtaAdapter(),
		defaultVisible: true,
	},
	{
		name: "Scouting Alumni",
		slug: "scouting-alumni",
		description:
			"The news feed of Scouting Alumni. Primarily editorial content with occasional news.",
		homepageUrl: "https://scoutingalumni.org/news",
		adapter: WordpressAdapter({
			baseUrl: "https://scoutingalumni.org",
		}),
		defaultVisible: true,
	},
	{
		name: "Scout Life",
		slug: "scout-life",
		description: "Editorial and entertainment content mainly for youth.",
		homepageUrl: "https://scoutlife.org",
		adapter: WordpressAdapter({
			baseUrl: "https://scoutlife.org",
		}),
		defaultVisible: false,
	},

	// todo these are gone. rebuild from scraped copy
	// {
	// 	name: "ScoutCast",
	// 	slug: "scoutcast",
	// 	description: "A defunct podcast about the Scouts BSA program.",
	// 	homepageUrl: "https://podcast.scouting.org/category/scoutcast",
	// 	adapter: RssAdapter({
	// 		feedUrl: "https://podcast.scouting.org/category/scoutcast/feed",
	// 	}),
	// },
	// {
	// 	name: "CubCast",
	// 	slug: "cubcast",
	// 	description: "A defunct podcast about the Cub Scouts program.",
	// 	homepageUrl: "https://podcast.scouting.org/category/cubcast",
	// 	adapter: RssAdapter({
	// 		feedUrl: "https://podcast.scouting.org/category/cubcast/feed",
	// 	}),
	// },

	// todo it looks like this is about to be shut down. I downloaded the rss and and all the episodes. set up an archived version later
	{
		name: "The Lookout",
		slug: "the-lookout",
		description:
			"The Lookout: Sea Scout Podcast Network. Features both news and interviews.",
		homepageUrl: "https://seascout.org/the-lookout-sea-scout-podcast-network/",
		adapter: RssAdapter({
			feedUrl: "https://feeds.buzzsprout.com/983503.rss",
		}),
		defaultVisible: true,
	},

	{
		name: "Scouting Wire",
		slug: "scouting-wire",
		description:
			"Billed as 'The Official Blog of the Scouting Movement'. General news and updates for professionals, volunteers, and parents.",
		homepageUrl: "https://scoutingwire.org",
		adapter: WordpressAdapter({
			baseUrl: "https://scoutingwire.org",
			//todo split by categories?
		}),
		defaultVisible: true,
	},
	{
		name: "Scouting Newsroom",
		slug: "scouting-newsroom",
		description:
			"Provides updates and news about the national Scouting administration.",
		homepageUrl: "https://scoutingnewsroom.org",
		adapter: RssAdapter({
			feedUrl: "https://scoutingnewsroom.org/feed",
			//for some reason the wordpress posts api doesn't return any results on this site
		}),
		defaultVisible: true,
	},
	{
		name: "Abilities Digest",
		slug: "abilities-digest",
		description:
			"Provides updates and news about special needs scouting. A publication of the National Special Needs and Disabilities Committee.",
		homepageUrl: "https://ablescouts.org",
		adapter: RssAdapter({
			feedUrl: "https://ablescouts.org/feed",
			//entire wordpress api is 404
		}),
		defaultVisible: true,
	},
	{
		name: "Summit Blog",
		slug: "summit-blog",
		description:
			"News and updates about the Summit Bechtel Reserve and National Scout Jamboree.",
		homepageUrl: "https://www.summitbsa.org/blog",
		adapter: WordpressAdapter({
			baseUrl: "https://summitbsa.org",
		}),
		defaultVisible: true,
	},

	{
		name: "National Eagle Scout Association",
		slug: "nesa",
		description:
			"The news feed of the National Eagle Scout Association. A mixture of editorial content and news.",
		homepageUrl: "https://nesa.org/news",
		adapter: WordpressAdapter({
			baseUrl: "https://nesa.org",
		}),
		defaultVisible: true,
	},
	{
		name: "Scouting America Foundation",
		slug: "scouting-america-foundation",
		description:
			"The news feed of the Scouting America Foundation. Mostly entertainment and editorial content.",
		homepageUrl: "https://scoutingamericafoundation.org/foundation-news",
		adapter: WordpressAdapter({
			baseUrl: "https://scoutingamericafoundation.org",
		}),
		defaultVisible: true,
	},
	{
		name: "Order of the Arrow News",
		slug: "oa-news",
		description:
			"News and updates about the Order of the Arrow on the national level.",
		homepageUrl: "https://oa-scouting.org/news",
		adapter: RssAdapter({
			feedUrl: "https://oa-scouting.org/rss.xml",
			//not wordpress. might be bespoke. find out about if there's an api or a way to source better data
		}),
		defaultVisible: true,
	},
	{
		name: "OA System Maintenance",
		slug: "oa-system-maintenance",
		description:
			"Updates on Order of the Arrow's digital infrastructure maintenance and outages.",
		homepageUrl: "https://status.oa-scouting.org/",
		adapter: RssAdapter({
			feedUrl: "https://status.oa-scouting.org/history.rss",
			// atom feed, text, and email also available
		}),
		defaultVisible: true,
	},
	{
		name: "Sea Scouts News",
		slug: "sea-scouts-news",
		description: "News and updates about the Sea Scouts program.",
		homepageUrl: "https://seascout.org/latest-news",
		adapter: WordpressAdapter({
			baseUrl: "https://seascout.org/",
		}),
		defaultVisible: true,
	},
	{
		name: "Troop Leader Resource Updates",
		slug: "troop-leader-resource-updates",
		description: "Updates and news about the Troop Leader Resource Hub.",
		homepageUrl: "https://troopleader.scouting.org/updates-blog",
		adapter: WordpressAdapter({
			baseUrl: "https://troopleader.scouting.org",
		}),
		defaultVisible: true,
	},
];

export type FeedConfig = {
	name: string;
	slug: string;
	description: string;
	homepageUrl: UrlShaped;
	adapter: FeedAdapter;
	defaultVisible: boolean;
};
