import type { FeedProvider } from "@/features/feeds/types";

export function wordpressProvider(opts: wordpressProviderOpts): FeedProvider {
	return async () => {
		const url = new URL(
			`/wp-json/wp/v2/posts?per_page=100${opts.categoryFilter ? `&categories=${opts.categoryFilter}` : ""}`,
			opts.baseUrl,
		).toString();

		const response = await fetch(url);
		const posts: wordpressApiPost[] = await response.json();

		return posts.map((post) => ({
			url: post.link,
			title: post.title.rendered,
			description:
				post.yoast_head_json?.og_description ?? post.excerpt.rendered,
			date: new Date(post.date_gmt),
		}));
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
