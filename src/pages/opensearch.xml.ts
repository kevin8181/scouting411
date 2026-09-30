import type { APIRoute } from "astro";

/*
 * describes the site search to browsers, so they can offer scouting411 as a search
 * engine. linked from every page by `Head.astro`
 */

const getDescription = (site: URL) => `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
	<ShortName>Scouting411</ShortName>
	<Description>Search Scouting411 for ranks, merit badges, adventures, resources, and more.</Description>
	<InputEncoding>UTF-8</InputEncoding>
	<Image width="48" height="48" type="image/x-icon">${new URL("/favicon.ico", site).href}</Image>
	<Url type="text/html" method="get" template="${new URL("/search", site).href}?q={searchTerms}"/>
	<Url type="application/opensearchdescription+xml" rel="self" template="${new URL("/opensearch.xml", site).href}"/>
</OpenSearchDescription>
`;

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error("`site` must be set in the astro config");

	return new Response(getDescription(site), {
		headers: { "Content-Type": "application/opensearchdescription+xml" },
	});
};
