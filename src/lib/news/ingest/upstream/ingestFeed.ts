import type { FeedSlug } from "@/lib/news/feeds/types";
import { feedConfigs } from "@/lib/news/feeds/config";
import type { PostData, IngestError } from "@/lib/news/ingest/types";
import { normalizePostData } from "@/lib/news/ingest/upstream/normalize";

export async function ingestFeed(
	slug: FeedSlug,
): Promise<
	| { data: PostData[]; error?: undefined }
	| { data?: undefined; error: IngestError }
> {
	//todo access the Feed instead of the FeedConfig?
	const feedConfig = feedConfigs.find((feed) => feed.slug === slug)!;

	let postData: PostData[];

	try {
		postData = await feedConfig.adapter.execute();
	} catch (reason) {
		return {
			error: {
				feed: feedConfig.slug,
				reason: reason instanceof Error ? reason.message : String(reason),
			},
		};
	}

	if (postData.length === 0) {
		return {
			error: {
				feed: feedConfig.slug,
				reason: "zero posts returned from feed adapter",
			},
		};
	}

	const { data, error } = normalizePostData(postData);

	if (error) {
		return {
			error: { feed: feedConfig.slug, reason: error.message },
		};
	}

	return { data };
}
