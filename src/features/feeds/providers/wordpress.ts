import type { FeedProvider } from "@/features/feeds/types";
import type { PostData } from "@/features/feeds/types";
import he from "he";
import { asyncThrottle } from "@tanstack/pacer";

async function fetchPage(page: number, opts: wordpressProviderOpts) {
	const url = new URL(
		`/wp-json/wp/v2/posts?page=${page}&per_page=100${opts.categoryFilter ? `&categories=${opts.categoryFilter}` : ""}`,
		opts.baseUrl,
	).toString();

	const response = await fetch(url);

	if (response.status !== 200) {
		throw new Error(
			`failed to fetch posts from ${url}- status code ${response.status}`,
		);
	}

	const rawPosts: wordpressApiPost[] = await response.json();

	const posts = rawPosts.map((post) => ({
		url: post.link,
		title: he.decode(post.title.rendered),
		description: he.decode(
			post.yoast_head_json?.og_description ?? post.excerpt.rendered,
		),
		date: new Date(post.date_gmt),
	}));

	return {
		posts,
		totalPages: parseInt(response.headers.get("x-wp-totalpages")!),
	};
}

export function wordpressProvider(opts: wordpressProviderOpts): FeedProvider {
	const fetchPageThrottled = asyncThrottle(
		async (page: number) => await fetchPage(page, opts),
		{
			wait: 200,
		},
	);

	return {
		type: "wordpress",

		fetch: async () => {
			const posts: PostData[] = [];

			const firstPage = (await fetchPageThrottled(1))!;

			posts.push(...firstPage.posts);

			if (firstPage.totalPages === 1) {
				return posts;
			}

			//todo fetch the full post history

			// create an array where each entry is a page number we need to fetch
			const arr = Array.from(
				{ length: firstPage.totalPages - 1 },
				(_, i) => i + 2,
			);

			await Promise.all(
				arr.map(async (pageNumber) => {
					const page = (await fetchPageThrottled(pageNumber))!;
					posts.push(...page.posts);
				}),
			);

			console.log(`fetched ${posts.length} posts from ${opts.baseUrl}`);

			return posts;
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
