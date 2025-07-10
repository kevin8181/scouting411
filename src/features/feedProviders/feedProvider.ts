import type { PostData } from "@/features/feeds/types";

/** an instance of a feed provider */
export type FeedProvider = {
	type: string;
	fetch: () => Promise<PostData[]>;
};
