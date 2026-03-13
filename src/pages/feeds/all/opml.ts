import type { APIRoute } from "astro";
import { generateOpml } from "feedsmith";
import { FeedManager } from "@/features/feeds/feedManager";

export const GET: APIRoute = async (context) => {
	const opml = generateOpml(
		{
			head: {
				title: "Scouting411 News Sources",
				ownerName: "Scouting411",
				dateCreated: new Date(),
			},
			body: {
				outlines: FeedManager.feeds.map((feed) => ({
					text: feed.name,
					title: feed.name,
					description: feed.description,
					htmlUrl: new URL(feed.urls.overview, context.site).toString(),
					//todo make an opml for atom feeds?
					xmlUrl: new URL(feed.urls.rss, context.site).toString(),
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
