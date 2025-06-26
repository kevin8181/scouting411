import type { TagCollection } from "@/features/tagsConfig/types";

export const ResourceTypeTags = {
	Blog: {
		id: "blog",
		displayName: "Blog",
	},
	Homepage: {
		id: "homepage",
		displayName: "Home/Landing Page",
	},
	Reference: {
		id: "reference",
		displayName: "Reference",
	},
} as const satisfies TagCollection;

export const TopicTags = {
	ScoutShop: {
		id: "scoutshop",
		displayName: "Scout Shop",
	} /** a parsed post object returned by one of the feed adapters */,

	Philmont: {
		id: "philmont",
		displayName: "Philmont",
	},
	Oa: {
		id: "oa",
		displayName: "OA",
	},
} as const satisfies TagCollection;
