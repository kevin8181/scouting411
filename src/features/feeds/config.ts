import { wordpressProvider } from "@/features/feeds/providers/wordpress";
import { rssProvider } from "@/features/feeds/providers/rss";
import { ttaProvider } from "@/features/feeds/providers/trailToAdventure";
import { Feed } from "@/features/feeds/feed";

export const feeds: Feed[] = [
	new Feed({
		name: "Scouts BSA Program Updates",
		homepageUrl:
			"https://www.scouting.org/topics/program-updates/program-updates-scouts-bsa",
		provider: wordpressProvider({
			baseUrl: "https://scouting.org",
			categoryFilter: 15054,
		}),
	}),
	new Feed({
		name: "Cub Scouts Program Updates",
		homepageUrl:
			"https://www.scouting.org/topics/program-updates/program-updates-cub-scouts",
		provider: wordpressProvider({
			baseUrl: "https://www.scouting.org",
			categoryFilter: 15053,
		}),
	}),
	new Feed({
		name: "Scouting Wire",
		homepageUrl: "https://scoutingwire.org",
		provider: wordpressProvider({
			baseUrl: "https://scoutingwire.org",
			//todo split by categories?
		}),
	}),
	new Feed({
		name: "Scouting Newsroom",
		homepageUrl: "https://scoutingnewsroom.org",
		provider: rssProvider({
			feedUrl: "https://scoutingnewsroom.org/feed",
			//for some reason the wordpress posts api doesn't return any results on this site
		}),
	}),
	new Feed({
		name: "Abilities Digest",
		homepageUrl: "https://ablescouts.org",
		provider: rssProvider({
			feedUrl: "https://ablescouts.org/feed",
			//wordpress api comes back 404
		}),
	}),
	new Feed({
		name: "Scouting Magazine",
		homepageUrl: "https://blog.scoutingmagazine.org",
		provider: wordpressProvider({
			baseUrl: "https://blog.scoutingmagazine.org",
		}),
	}),
	new Feed({
		name: "Summit Blog",
		homepageUrl: "https://www.summitbsa.org/blog",
		provider: wordpressProvider({
			baseUrl: "https://summitbsa.org",
		}),
	}),
	new Feed({
		name: "Scout Life",
		homepageUrl: "https://scoutlife.org",
		provider: wordpressProvider({
			baseUrl: "https://scoutlife.org",
		}),
	}),
	new Feed({
		name: "Scouting Alumni",
		homepageUrl: "https://scoutingalumni.org/news",
		provider: wordpressProvider({
			baseUrl: "https://scoutingalumni.org",
		}),
	}),
	new Feed({
		name: "National Eagle Scout Association",
		homepageUrl: "https://nesa.org/news",
		provider: wordpressProvider({
			baseUrl: "https://nesa.org",
		}),
	}),
	new Feed({
		name: "Scouting America Foundation",
		homepageUrl: "https://scoutingamericafoundation.org/foundation-news",
		provider: wordpressProvider({
			baseUrl: "https://scoutingamericafoundation.org",
		}),
	}),
	new Feed({
		name: "OA News",
		homepageUrl: "https://oa-scouting.org/news",
		provider: rssProvider({
			feedUrl: "https://oa-scouting.org/rss.xml",
			//not wordpress. might be bespoke. find out about if there's an api or a better feed to use
		}),
	}),
	new Feed({
		name: "Sea Scouts News",
		homepageUrl: "https://seascout.org/latest-news",
		provider: wordpressProvider({
			baseUrl: "https://seascout.org/",
		}),
	}),
	new Feed({
		name: "Troop Leader Resource Updates",
		homepageUrl: "https://troopleader.scouting.org/updates-blog",
		provider: wordpressProvider({
			baseUrl: "https://troopleader.scouting.org",
		}),
	}),
	new Feed({
		name: "ScoutCast",
		homepageUrl: "https://podcast.scouting.org/category/scoutcast",
		provider: rssProvider({
			feedUrl: "https://podcast.scouting.org/category/scoutcast/feed",
		}),
	}),
	new Feed({
		name: "CubCast",
		homepageUrl: "https://podcast.scouting.org/category/cubcast",
		provider: rssProvider({
			feedUrl: "https://podcast.scouting.org/category/cubcast/feed",
		}),
	}),
	new Feed({
		name: "Trail to Adventure",
		homepageUrl: "https://www.scouting.org/outdoor-programs/trail-to-adventure",
		provider: ttaProvider(),
	}),
];
