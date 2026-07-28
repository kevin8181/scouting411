import type { APIRoute } from "astro";
import { getFeedBySlug } from "@/lib/news/feeds/feedManager";
import { generateRssFeed } from "feedsmith";
import { getFeedPosts } from "@/lib/news/cache/cache";

import { isFeedSlug } from "@/lib/news/feeds/feedManager";

export const prerender = false;

export const GET: APIRoute = async (context) => {
	const slug = context.params.slug!;
	if (!isFeedSlug(slug)) {
		throw new Response("Not found", { status: 404 });
	}
	const feed = getFeedBySlug(slug);
	const posts = await getFeedPosts(feed);

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
