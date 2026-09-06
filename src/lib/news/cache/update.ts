import { feedConfigs } from "@/lib/news/feeds/config";
import { writePosts } from "@/lib/news/cache/cache";
import { type FeedSlug } from "@/lib/news/feeds/types";
import { normalizePostData } from "@/lib/news/ingest/normalize";

/** fetches the posts from an original feed source and updates the cache */
async function updateFeed(slug: FeedSlug) {
	const feedConfig = feedConfigs.find((feed) => feed.slug === slug);

	if (!feedConfig) {
		throw new Error(`feed ${slug} not found`);
	}

	const postData = await feedConfig.adapter.execute();

	if (postData.length === 0) {
		throw new Error(`zero posts returned from feed adapter`);
	}

	const normalizedPostData = normalizePostData(postData);

	await writePosts({ feedSlug: feedConfig.slug, postData: normalizedPostData });
}

/** fetches the upstream post data for all feeds and updates the cache */
export async function updateAllFeeds() {
	const failures: { feedSlug: FeedSlug; reason: unknown }[] = [];

	await Promise.all(
		feedConfigs.map(async (feed) => {
			try {
				await updateFeed(feed.slug);
			} catch (reason) {
				failures.push({ feedSlug: feed.slug, reason });
			}
		}),
	);

	return {
		errors: failures.map((failure) => ({
			feedSlug: failure.feedSlug,
			reason: failure.reason,
		})),
		succeeded: feedConfigs.length - failures.length,
		total: feedConfigs.length,
	};
}
