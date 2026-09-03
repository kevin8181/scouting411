import type { FeedConfig } from "@/lib/news/feeds/types";

import { RssAdapter } from "@/lib/news/ingest/adapters/rss";
import { WordpressAdapter } from "@/lib/news/ingest/adapters/wordpress";
import { PodcastArchiveAdapter } from "@/lib/news/ingest/adapters/podcast-archive";

export const feedConfigs = [
	// todo there are more posts from scouting.org that are not within the two categories below, which we are currently missing.
	{
		name: "Scouts BSA Program Updates",
		slug: "scouts-bsa-program-updates",
		description:
			"Information about changes and updates to the Scouts BSA program.",
		coverImageSrc:
			"https://www.scouting.org/wp-content/uploads/2025/05/Scouting-America-Prepared-For-Life-Logo-stacked-4c-BC.png",
		homepageUrl:
			"https://www.scouting.org/topics/program-updates/program-updates-scouts-bsa",
		adapter: WordpressAdapter({
			baseUrl: "https://www.scouting.org",
			categoryFilter: 15054,
		}),
		defaultVisible: true,
	},
	{
		name: "Cub Scouts Program Updates",
		slug: "cub-scouts-program-updates",
		description:
			"Information about changes and updates to the Cub Scouts program.",
		coverImageSrc:
			"https://www.scouting.org/wp-content/uploads/2026/02/cubscouts.png",
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
		coverImageSrc:
			"https://i0.wp.com/onscouting.org/wp-content/uploads/2022/01/cubchat-1280x720-1.png",
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
		name: "On Scouting",
		slug: "on-scouting",
		description:
			"Editorial content for parents and volunteers. The adult counterpart of Scout Life magazine.",
		coverImageSrc:
			"https://onscouting.org/wp-content/uploads/2026/04/1200x901_OnScouting.jpg",
		homepageUrl: "https://onscouting.org",
		adapter: WordpressAdapter({
			baseUrl: "https://onscouting.org",
		}),
		defaultVisible: true,
	},
	{
		name: "Trail to Adventure",
		slug: "trail-to-adventure",
		description:
			"News and updates regarding scout camp administration. The Official Blog of the National Outdoor Programs and Properties Subcommittees.",
		coverImageSrc:
			"https://www.scouting.org/wp-content/uploads/elementor/thumbs/Frame-61@3x-1-qjjk7hopsugwy0tp9t0d62i0mwna5lp6q75bq9k9ge.png",
		homepageUrl: "https://www.scouting.org/outdoor-programs/trail-to-adventure",
		adapter: WordpressAdapter({
			baseUrl: "https://scouting.org",
			type: "tta-post",
		}),
		defaultVisible: true,
	},
	{
		name: "Executive Communications",
		slug: "executive-communications",
		description:
			"Hear from Scouting's Leadership: executives share thoughts on a variety of key Scouting topics.",
		coverImageSrc:
			"https://www.scouting.org/wp-content/uploads/2026/01/BSA-logo.png",
		homepageUrl: "https://www.scouting.org/about/executive-communications/",
		adapter: WordpressAdapter({
			baseUrl: "https://scouting.org",
			type: "ec-post",
		}),
		defaultVisible: true,
	},
	{
		name: "Scouting Alumni",
		slug: "scouting-alumni",
		description:
			"The news feed of Scouting Alumni. Primarily editorial content with occasional news.",
		coverImageSrc:
			"https://scoutingalumni.org/wp-content/uploads/2024/03/Scouting-America-Scouting-Alumni-Logo_4c-1024x236.png",
		homepageUrl: "https://scoutingalumni.org/news",
		adapter: WordpressAdapter({
			baseUrl: "https://scoutingalumni.org",
		}),
		defaultVisible: false,
	},
	{
		name: "Scouting Alumni - Ask the Chair",
		slug: "scouting-alumni-chair",
		description:
			"The doorway to Scouting is always open for our alumni! Scouting Alumni National Chair Andrew Miller is available to answer your questions. We look forward to hearing from you!",
		coverImageSrc:
			"https://scoutingalumni.org/wp-content/uploads/2024/03/Scouting-America-Scouting-Alumni-Logo_4c-1024x236.png",
		homepageUrl: "https://scoutingalumni.org/resources/ask-the-chair/",
		adapter: WordpressAdapter({
			baseUrl: "https://scoutingalumni.org",
			type: "ask_the_chair",
		}),
		defaultVisible: true,
	},
	{
		name: "Scouting Alumni - Alumni Highlights",
		slug: "scouting-alumni-highlights",
		description:
			"Miscellaneous news from Scouting Alumni, separate from their main news feed.",
		coverImageSrc:
			"https://scoutingalumni.org/wp-content/uploads/2024/03/Scouting-America-Scouting-Alumni-Logo_4c-1024x236.png",
		homepageUrl: "https://scoutingalumni.org/",
		adapter: WordpressAdapter({
			baseUrl: "https://scoutingalumni.org",
			type: "alumni-highlight",
		}),
		defaultVisible: true,
	},
	{
		name: "Scout Life",
		slug: "scout-life",
		description: "Editorial and entertainment content mainly for youth.",
		coverImageSrc:
			"https://scoutlife.org/wp-content/uploads/2024/07/scoutlife-logo-1200x675-1.jpg",
		homepageUrl: "https://scoutlife.org",
		adapter: WordpressAdapter({
			baseUrl: "https://scoutlife.org",
		}),
		defaultVisible: false,
	},

	// todo this site has more episodes https://www.podchaser.com/podcasts/scoutcast-31182
	{
		name: "ScoutCast",
		slug: "scoutcast",
		description: "A defunct podcast for Scouts BSA unit volunteers.",
		homepageUrl: "https://podcast.scouting.org/category/scoutcast",
		coverImageSrc:
			"https://cachedimages.podchaser.com/512x512/aHR0cHM6Ly9wb2RjYXN0LnNjb3V0aW5nLm9yZy9zY291dGNhc3QtbG9nby0xNTAweDE1MDAuanBn/aHR0cHM6Ly93d3cucG9kY2hhc2VyLmNvbS9pbWFnZXMvbWlzc2luZy1pbWFnZS5wbmc%3D",
		adapter: PodcastArchiveAdapter({
			categoryId: 2,
		}),
		defaultVisible: true,
	},

	// todo this site has more old episodes available for download than I already have https://www.podchaser.com/podcasts/cubcast-3834
	{
		name: "CubCast",
		slug: "cubcast",
		description: "A defunct podcast for Cub Scouts unit volunteers.",
		homepageUrl: "https://podcast.scouting.org/category/cubcast",
		coverImageSrc:
			"https://cachedimages.podchaser.com/512x512/aHR0cHM6Ly9wb2RjYXN0LnNjb3V0aW5nLm9yZy9jdWJjYXN0LWxvZ28tMTUwMHgxNTAwLmpwZw%3D%3D/aHR0cHM6Ly93d3cucG9kY2hhc2VyLmNvbS9pbWFnZXMvbWlzc2luZy1pbWFnZS5wbmc%3D",
		adapter: PodcastArchiveAdapter({
			categoryId: 3,
		}),
		defaultVisible: true,
	},

	// todo it looks like this is about to be shut down. I downloaded the rss and and all the episodes. set up an archived version later
	{
		name: "The Lookout",
		slug: "the-lookout",
		description:
			"The Lookout: Sea Scout Podcast Network. Features both news and interviews.",
		coverImageSrc:
			"https://storage.buzzsprout.com/ht40z07k1bkolyeg988x8e6izud9?.jpg",
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
		coverImageSrc:
			"https://scoutingwire.org/wp-content/themes/scoutwire/img/scouting-wire-logo.png",
		homepageUrl: "https://scoutingwire.org",
		adapter: WordpressAdapter({
			baseUrl: "https://scoutingwire.org",
			//todo split by categories / tags?
		}),
		defaultVisible: true,
	},
	{
		name: "Scouting Newsroom",
		slug: "scouting-newsroom",
		description:
			"Provides updates and news press releases the national Scouting administration.",
		coverImageSrc:
			"https://www.scoutingnewsroom.org/wp-content/uploads/2026/07/cropped-bsa-original-270x270.webp",
		homepageUrl: "https://scoutingnewsroom.org",
		adapter: WordpressAdapter({
			baseUrl: "https://scoutingnewsroom.org",
			type: "press-releases",
		}),
		defaultVisible: true,
	},
	{
		name: "Abilities Digest",
		slug: "abilities-digest",
		description:
			"Provides updates and news about special needs scouting. A publication of the National Special Needs and Disabilities Committee.",
		homepageUrl: "https://ablescouts.org",
		coverImageSrc:
			"https://ablescouts.org/wp-content/uploads/2022/04/cropped-sn-logo-only.png",
		adapter: RssAdapter({
			feedUrl: "https://ablescouts.org/feed",
			//entire wordpress api is 404
		}),
		defaultVisible: true,
	},
	{
		name: "Summit Blog",
		slug: "summit-blog",
		description: "News and updates about the Summit Bechtel Reserve.",
		coverImageSrc:
			"https://www.summitbsa.org/wp-content/uploads/2018/01/cropped-SBR-BlackBearPaw_Combo_-Logo-1-1-192x192.png",
		homepageUrl: "https://www.summitbsa.org/blog",
		adapter: WordpressAdapter({
			baseUrl: "https://summitbsa.org",
		}),
		defaultVisible: true,
	},
	{
		name: "NESA News and Articles",
		slug: "nesa",
		description:
			"The news feed of the National Eagle Scout Association. A mixture of editorial content and news.",
		coverImageSrc:
			"https://nesa.org/wp-content/uploads/2023/01/NESA-Logo-4k-300x300-1.png",
		homepageUrl: "https://nesa.org/news",
		adapter: WordpressAdapter({
			baseUrl: "https://nesa.org",
		}),
		defaultVisible: true,
	},
	{
		name: "NESA Events",
		slug: "nesa-events",
		description:
			"A feed of events run by the National Eagle Scout Association.",
		coverImageSrc:
			"https://nesa.org/wp-content/uploads/2023/01/NESA-Logo-4k-300x300-1.png",
		homepageUrl: "https://nesa.org/news",
		adapter: WordpressAdapter({
			baseUrl: "https://nesa.org",
			type: "events",
		}),
		defaultVisible: true,
	},
	{
		name: "Scouting America Foundation",
		slug: "scouting-america-foundation",
		description:
			"The news feed of the Scouting America Foundation. Mostly entertainment and editorial content.",
		coverImageSrc:
			"https://scoutingamericafoundation.org/wp-content/uploads/2026/06/Fleur-de-lis-2024-logo-4c-BC-906x1024.webp",
		homepageUrl: "https://scoutingamericafoundation.org/foundation-news",
		adapter: WordpressAdapter({
			baseUrl: "https://scoutingamericafoundation.org",
		}),
		defaultVisible: true,
	},
	{
		name: "OA News",
		slug: "oa-news",
		description:
			"News and updates about the Order of the Arrow on the national level.",
		coverImageSrc:
			"https://oa-scouting.org/themes/oascouting-theme/images/og/oa-social-stamp-og.jpg",
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
		coverImageSrc:
			"https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/28698/Signature_Horizontal_Standard-195ea529-94f9-4cc0-9981-ad4c2179a0a1.png",
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
		coverImageSrc:
			"https://seascout.org/wp-content/uploads/2015/09/cropped-certificate_logo.png",
		homepageUrl: "https://seascout.org/latest-news",
		adapter: WordpressAdapter({
			baseUrl: "https://seascout.org",
		}),
		defaultVisible: true,
	},
	{
		name: "Troop Leader Resource Updates",
		slug: "troop-leader-resource-updates",
		description: "Updates and news about the Troop Leader Resource Hub.",
		coverImageSrc:
			"https://www.scouting.org/wp-content/uploads/2025/05/Scouting-America-Prepared-For-Life-Logo-stacked-4c-BC.png",
		homepageUrl: "https://troopleader.scouting.org/updates-blog",
		adapter: WordpressAdapter({
			baseUrl: "https://troopleader.scouting.org",
		}),
		defaultVisible: true,
	},
] as const satisfies FeedConfig[];

/**
 * the slugs of the feeds that should be included in the default query.
 *
 * derived from the raw configs rather than the hydrated `feeds` so that the
 * query layer can read it without importing `feedManager` — hydration pulls in
 * `queryParams`, which would make the import graph cyclic and leave this
 * binding in its tdz when the browser bundle happens to evaluate `feedManager`
 * first.
 */
export const defaultVisibleFeeds = feedConfigs
	.filter((feed) => feed.defaultVisible)
	.map((feed) => feed.slug);
