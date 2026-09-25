import type { FeedSlug } from "@/lib/news/feeds/types";

export type HubConfig = {
	slug: string;
	name: string;
	description: string;
	color: string;
	newsSources: FeedSlug[];
	//todo add resourcesQuery here
};

export type Hub = HubConfig & {
	links: {
		page: string;
		browsePosts: string;
	};
};
