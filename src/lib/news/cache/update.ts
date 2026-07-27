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
	const failures: { slug: string; reason: unknown }[] = [];

	await Promise.all(
		feedConfigs.map(async (feed) => {
			try {
				await updateFeed(feed.slug);
			} catch (reason) {
				failures.push({ slug: feed.slug, reason });
			}
		}),
	);

	for (const failure of failures) {
		console.error(`failed to update feed ${failure.slug}`, failure.reason);
	}

	console.log(
		`updated ${feedConfigs.length - failures.length}/${feedConfigs.length} feeds`,
	);
}
