import { hubsConfig } from "@/lib/hubs/config";
import type { Hub } from "@/lib/hubs/types";
import { postsQueryParamsEncoder } from "@/lib/news/query/queryParams";

/** the hydrated list of all hubs */
export const hubs: Hub[] = hubsConfig.map((config) => ({
	...config,
	links: {
		page: `/hubs/${config.slug}`,
		browsePosts: `/news/browse?${postsQueryParamsEncoder.encode({
			feeds: config.newsSources,
			filter: {},
			sort: {
				direction: "desc",
				mode: "date",
			},
			paginate: {
				maxPageSize: 20,
				page: 1,
			},
		})}`,
	},
}));

/** gets a hub by its slug, or undefined if there is none */
export function getHubBySlug(slug: string) {
	return hubs.find((hub) => hub.slug === slug);
}
