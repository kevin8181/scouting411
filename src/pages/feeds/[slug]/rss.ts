import type { APIRoute } from "astro";
import { FeedManager } from "@/features/feeds/feedManager";
import { generateRssFeed } from "feedsmith";

export function getStaticPaths() {
	return FeedManager.feeds.map((feed) => ({
		params: { slug: feed.slug },
	}));
}

export const GET: APIRoute = async (context) => {
	const slug = context.params.slug!;
	const feed = FeedManager.getFeedBySlug(slug)!;
	const posts = await feed.posts();

	const generated = generateRssFeed(
		{
			title: feed.name,
			description: feed.description,

			items: posts.map((post) => ({
				title: post.title,
				...(post.description && { description: post.description }),
				pubDate: post.date,
				link: post.url,
				categories: [
					{
						name: post.feed.name,
					},
				],
				source: {
					title: feed.name,
					url: feed.urls.homepage, //todo I think this is supposed to be an rss feed
				},
			})),
		},
		{
			stylesheets: [
				{
					title: "RSS Stylesheet",
					type: "text/xsl",
					href: "/xslt/rss.xslt",
				},
			],
		},
	);

	return new Response(generated, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
};
