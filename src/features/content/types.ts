import type { UrlShaped } from "@/util/utilTypes";

export interface LinkConfig {
	url: UrlShaped;
	metadata: {
		title: string;
		description: string;
	};
	feed?: FeedConfig;
	tags: {
		resourceType: ResourceTypeTag[];
	};
	//url validation exceptions
	//type
	//tags
}

type FeedConfig = RssFeedConfig;

type RssFeedConfig = {
	type: "rss";
	url: UrlShaped;
};

export type ResourceTypeTag = BaseTag;

type BaseTag<T = string> = {
	value: T;
	label: string;
};
