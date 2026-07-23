import type { FeedAdapter, PostData } from "@/lib/news/fetching/types";
import { cleanHtmlString } from "@/util/cleanHtmlString";

type WordpressAdapterOpts = {
	/** the base url of the wordpress site */
	baseUrl: string;
	/** return only posts which have this category id */
	categoryFilter?: number;
};

export function WordpressAdapter(opts: WordpressAdapterOpts): FeedAdapter {
	const execute = async () => {
		const page1 = await fetchPage(1, opts);

		return page1.posts;
	};

	return {
		type: {
			id: "wordpressApi",
			human: "Wordpress",
		},
		execute,
	};
}

async function fetchPage(page: number, opts: WordpressAdapterOpts) {
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

	const rawPosts: WordpressApiPost[] = await response.json();

	const posts: PostData[] = rawPosts.map((post) => ({
		url: post.link,
		title: cleanHtmlString(post.title.rendered),
		description: cleanHtmlString(
			post.yoast_head_json?.og_description ?? post.excerpt.rendered,
		),
		date: post.date_gmt,
	}));

	return {
		posts,
		totalPages: parseInt(response.headers.get("x-wp-totalpages") ?? "1"),
	};
}

/** data about a post from the api */
type WordpressApiPost = {
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
