export const prerender = false;
import type { APIRoute } from "astro";

import { feeds } from "@/lib/news/feeds/feedManager";
import type { Feed } from "@/lib/news/feeds/types";
import {
	getAggregatedFeedMetrics,
	getFeedMetrics,
} from "@/lib/news/metrics/feedMetrics";
import { queryPosts } from "@/lib/news/query/query";

/**
 * a feed's links, with the site-relative ones resolved against the site origin
 *
 * api consumers are off-site, so relative hrefs are not useful to them.
 * `homepage` is already absolute and upstream's, so it is passed through
 * untouched rather than round-tripped through `URL` (which would append a
 * trailing slash to bare origins).
 */
function absolutizeLinks(links: Feed["links"], site: URL | undefined) {
	const absolute = (href: string) => new URL(href, site).toString();

	return {
		overview: absolute(links.overview),
		browsePosts: absolute(links.browsePosts),
		rss: absolute(links.rss),
		atom: absolute(links.atom),
		homepage: links.homepage,
	};
}

/**
 * metadata and content-quality stats for every feed. returns no posts — use
 * `/api/posts` for those.
 */
export const GET: APIRoute = async (context) => {
	const entries = await Promise.all(
		feeds.map(async (feed) => {
			const { posts } = await queryPosts({
				feeds: [feed.slug],
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

			return {
				name: feed.name,
				slug: feed.slug,
				description: feed.description,
				coverImageSrc: feed.coverImageSrc,
				type: feed.type,
				defaultVisible: feed.defaultVisible,
				links: absolutizeLinks(feed.links, context.site),
				metrics: getFeedMetrics(posts),
			};
		}),
	);

	const body = {
		feeds: entries,
		summary: {
			feedCount: entries.length,
			metrics: getAggregatedFeedMetrics(entries.map(({ metrics }) => metrics)),
		},
	};

	return new Response(JSON.stringify(body), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			// read-only public data, so it is safe to read from any origin
			"Access-Control-Allow-Origin": "*",
			// the cron refreshes the cache daily, so an hour of edge cache is free
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
};
