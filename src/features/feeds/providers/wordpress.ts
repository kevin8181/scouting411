import type { FeedProvider } from "@/features/feeds/types";
import he from "he";

//todo fetch the full post history

export function wordpressProvider(opts: wordpressProviderOpts): FeedProvider {
	return {
		type: "wordpress",

		fetch: async () => {
			const url = new URL(
				`/wp-json/wp/v2/posts?per_page=100${opts.categoryFilter ? `&categories=${opts.categoryFilter}` : ""}`,
				opts.baseUrl,
			).toString();

			const response = await fetch(url);

			if (response.status !== 200) {
				throw new Error(
					`failed to fetch posts from ${url}- status code ${response.status}`,
				);
			}

			const posts: wordpressApiPost[] = await response.json();

			return posts.map((post) => ({
				url: post.link,
				title: he.decode(post.title.rendered),
				description: he.decode(
					post.yoast_head_json?.og_description ?? post.excerpt.rendered,
				),
				date: new Date(post.date_gmt),
			}));
		},
	};
}

type wordpressProviderOpts = {
	/** the base url of the wordpress site */
	baseUrl: string;
	/** return only posts which have this category id */
	categoryFilter?: number;
};

type wordpressApiPost = {
	link: string;
	title: {
		rendered: string;
	};
	excerpt: {
		rendered: string;
	};
	yoast_head_json?: {
		og_description: string;
	};
	date_gmt: string;
};
