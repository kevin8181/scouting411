import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { FeedManager } from "@/features/feeds/feedManager";

//todo generate this with feedsmith instead of astro package. serve as text/xml and include stylesheet

export function getStaticPaths() {
	return FeedManager.feeds.map((feed) => ({
		params: { slug: feed.slug },
	}));
}

export const GET: APIRoute = async (context) => {
	const slug = context.params.slug!;
	const feed = FeedManager.getFeedBySlug(slug)!;
	const posts = await feed.posts();

	return rss({
		title: feed.name,
		description: feed.homepageUrl, //todo add a description to each feed

		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#site
		site: context.site ?? "",

		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: posts.map((post) => ({
			title: post.title,
			description: post.description,
			pubDate: post.date,
			link: post.url,
			categories: [post.feed.name],
			source: {
				title: feed.name,
				url: feed.homepageUrl, //todo I think this is supposed to be an rss feed
			},
		})),
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
		trailingSlash: false,

		stylesheet: "/xslt/rss.xslt",
	});
};
