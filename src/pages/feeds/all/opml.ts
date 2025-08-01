import type { APIRoute } from "astro";
import { generateOpml } from "feedsmith";
import { FeedManager } from "@/features/feeds/feedManager";

export const GET: APIRoute = async (context) => {
	const opml = generateOpml(
		{
			head: {
				title: "Scouting411 Pulse Sources",
				ownerName: "Scouting411",
				dateModified: new Date(),
			},
			body: {
				outlines: FeedManager.feeds.map((feed) => ({
					text: feed.name,
					title: feed.name,
					htmlUrl: new URL(feed.overviewUrl, context.site).toString(),
					xmlUrl: new URL(feed.rssUrl, context.site).toString(),
					type: "rss",
					language: "en-us",
				})),
			},
		},
		{
			stylesheets: [
				{
					title: "OPML Stylesheet",
					type: "text/xsl",
					href: "/xslt/opml.xslt",
				},
			],
		},
	);

	return new Response(opml, {
		status: 200,
		headers: {
			"Content-Type": "text/xml",
		},
	});
};
