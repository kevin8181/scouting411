import type { APIRoute } from "astro";
import { FeedManager } from "@/features/feeds/feedManager";
import { generateAtomFeed } from "feedsmith";

export function getStaticPaths() {
	return FeedManager.feeds.map((feed) => ({
		params: { slug: feed.slug },
	}));
}

export const GET: APIRoute = async (context) => {
	const slug = context.params.slug!;
	const feed = FeedManager.getFeedBySlug(slug)!;
	const posts = await feed.posts();

	const generated = generateAtomFeed(
		{
			title: feed.name,
			id: feed.urls.homepage,
			updated: new Date(),

			links: [
				{
					rel: "self",
					href: feed.urls.overview,
					type: "text/html",
					title: feed.name,
					hreflang: "en-us",
				},
				{
					rel: "alternate",
					href: feed.urls.rss,
					type: "application/rss+xml",
					title: "RSS Feed",
					hreflang: "en-us",
				},
				{
					rel: "alternate",
					href: feed.urls.homepage,
					type: "text/html",
					title: "Upstream Homepage",
					hreflang: "en-us",
				},
			],
			entries: posts.map((post) => ({
				title: post.title,
				id: post.url,
				updated: post.date,
				...(post.description && { description: post.description }),
				published: post.date,

				links: [
					{
						rel: "self",
						href: post.url,
						type: "text/html",
						title: post.title,
						hreflang: "en-us",
					},
				],
			})),
		},
		{
			stylesheets: [
				// todo this styleshee doesn't seem to play nice with atom
				// {
				// 	title: "RSS Stylesheet",
				// 	type: "text/xsl",
				// 	href: "/xslt/rss.xslt",
				// },
			],
		},
	);

	return new Response(generated, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
};
