/** a parsed post object returned by one of the feed adapters */
export type Post = {
	/** the original url of the post */
	url: string | undefined;
	/** the title of the post */
	title: string | undefined;
	/** the description of the post */
	description: string | undefined;
	/** the date the post was published */
	date: Date | undefined;
};
