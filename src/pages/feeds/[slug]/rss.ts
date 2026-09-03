import type { APIRoute } from "astro";
import { generateRssFeed } from "feedsmith";

import { getFeedBySlug } from "@/lib/news/feeds/feedManager";
import { queryPosts } from "@/lib/news/query/query";
import { isFeedSlug } from "@/lib/news/feeds/feedManager";

// todo maybe this could just accept a full query as url params and return it as rss,
// allowing users to make whatever query they want into an rss feed

export const prerender = false;

export const GET: APIRoute = async (context) => {
	const slug = context.params.slug!;
	if (!isFeedSlug(slug)) {
		throw new Response("Not found", { status: 404 });
	}
	const feed = getFeedBySlug(slug);
	const { posts } = await queryPosts({
		feeds: [slug],
		filter: {},
		sort: {
			direction: "desc",
			mode: "date",
		},
		paginate: {
			// todo we need a way to disable pagination
			maxPageSize: 999999,
			page: 1,
		},
	});

	const generated = generateRssFeed(
		{
			title: feed.name,
			description: feed.description,
			generator: "scouting411",
			docs: "https://www.rssboard.org/rss-specification",

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

				...(post.thumbnail && {
					media: {
						thumbnails: [
							{
								url: post.thumbnail,
							},
						],
					},
				}),
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
