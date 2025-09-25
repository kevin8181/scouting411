import { FeedProvider } from "@/features/feedProviders/feedProvider";
import type { PostData } from "@/features/posts/post";
import he from "he";

export function WordpressApiProvider(opts: WordpressApiProviderOpts) {
	const execute = async () => {
		const page1 = await fetchPage(1, opts);

		return page1.posts;
	};

	return new FeedProvider({
		type: {
			id: "wordpressApi",
			human: "Wordpress",
		},
		execute,
	});
}

async function fetchPage(page: number, opts: WordpressApiProviderOpts) {
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
		title: he.decode(post.title.rendered),
		description: he.decode(
			post.yoast_head_json?.og_description ?? post.excerpt.rendered,
		),
		date: post.date_gmt,
	}));

	return {
		posts,
		totalPages: parseInt(response.headers.get("x-wp-totalpages") ?? "1"),
	};
}

type WordpressApiProviderOpts = {
	/** the base url of the wordpress site */
	baseUrl: string;
	/** return only posts which have this category id */
	categoryFilter?: number;
};

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
