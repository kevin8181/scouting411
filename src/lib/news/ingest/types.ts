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

