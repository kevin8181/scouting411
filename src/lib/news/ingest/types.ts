import type { FeedSlug } from "@/lib/news/feeds/types";

/** a raw post data object returned by one of the feed adapters */
export type PostData = {
	/** the original url of the post */
	url: string;
	/** the title of the post */
	title: string;
	/** the description of the post */
	description: string | undefined;
	/** the date the post was published */
	date: string;
	/** external image url to use as a thumbnail */
	thumbnail: string | undefined;
};

/** an error that occurred during the upstream ingestion process */
export type IngestError = {
	feed: FeedSlug;
	reason: string;
};
