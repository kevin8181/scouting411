import type { APIRoute } from "astro";
import { getFeedBySlug } from "@/lib/news/feeds/feedManager";
import { generateAtomFeed } from "feedsmith";
import { queryPosts } from "@/lib/news/query/query";
import { isFeedSlug } from "@/lib/news/feeds/feedManager";

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

	const generated = generateAtomFeed(
		{
			title: feed.name,
			id: feed.urls.homepage,
			generator: {
				text: "scouting411",
			},
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
				// todo this stylesheet doesn't seem to play nice with atom
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
