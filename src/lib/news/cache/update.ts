import { feedConfigs } from "@/lib/news/config";
import { writeCache } from "@/lib/news/cache/cache";

/** fetches the posts from an original feed source and updates the cache */
async function updateFeed(slug: string) {
	const feedConfig = feedConfigs.find((feed) => feed.slug === slug);

	if (!feedConfig) {
		throw new Error(`feed ${slug} not found`);
	}

	const postData = await feedConfig.adapter.execute();

	await writeCache({ feedSlug: feedConfig.slug, postData: postData });
}

/** fetches the upstream post data for all feeds and updates the cache */
export async function updateAllFeeds() {
	await Promise.all(feedConfigs.map((feed) => updateFeed(feed.slug)));
}
