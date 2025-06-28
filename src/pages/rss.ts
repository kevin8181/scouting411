import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

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
		items: [
			{
				title: "hello world",
				description: "this is a test",
				pubDate: new Date(),
				link: "https://scouting411.com/test",
			},
		],
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
		stylesheet: "/rss.xsl",
	});
};
