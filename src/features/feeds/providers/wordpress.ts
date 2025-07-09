import type { FeedProvider } from "@/features/feeds/types";
import type { PostData } from "@/features/feeds/types";
import he from "he";
import { promiseAllDelayed } from "@/util/promiseAllDelayed";

async function fetchPage(page: number, opts: wordpressProviderOpts) {
	console.log(`fetch page ${page} from ${opts.baseUrl}`);

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
	return {
		type: "wordpress",

		fetch: async () => {
			const posts: PostData[] = [];

			const totalPages = (await fetchPage(1, opts)).totalPages;

			// create an array where each element is a function that fetches a page
			const functions = Array.from({ length: totalPages }, (_, i) => {
				return async () => await fetchPage(i + 1, opts);
			});

			const pages = await promiseAllDelayed(functions, 400);

			pages.forEach((page) => {
				posts.push(...page.posts);
			});

			console.log(`got ${posts.length} posts from ${opts.baseUrl}`);

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
