import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getAllPosts } from "@/features/feeds/getAllPosts";

export const GET: APIRoute = async (context) => {
	return rss({
		// `<title>` field in output xml
		title: "Scouting411",
		// `<description>` field in output xml
		description:
			"the unofficial aggregator for official Scouting America news and resources",
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#site
		site: context.site ?? "",
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		//todo
		items: (await getAllPosts()).map((item) => ({
			title: item.post.title,
			description: item.post.description,
			pubDate: item.post.date,
			link: item.post.url,
			categories: [item.feedMeta.name],
		})),
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
		stylesheet: "/rss.xsl",
	});
};
