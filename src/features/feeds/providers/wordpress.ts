import type { Post } from "@/features/feeds/posts/types";

export async function wordpressProvider(
	opts: wordpressProviderOpts,
): Promise<Post[]> {
	const response = await fetch(
		new URL("/wp-json/wp/v2/posts?per_page=100", opts.baseUrl).toString(),
	);

	const posts: wordpressApiPost[] = await response.json();

	if (!opts.categoryFilter) {
		return formatPosts(posts);
	}

	const filtered = posts.filter((post) => {
		return post.categories.includes(opts.categoryFilter!);
	});

	return formatPosts(filtered);
}

function formatPosts(posts: wordpressApiPost[]) {
	return posts.map((post) => ({
		url: post.link,
		title: post.title.rendered,
		description: post.excerpt.rendered,
		date: new Date(post.date_gmt),
	}));
}

type wordpressProviderOpts = {
	/** the base url of the wordpress site */
	baseUrl: string;
	/** return only posts which have this category id */
	categoryFilter: number | undefined;
};

type wordpressApiPost = {
	link: string;
	title: {
		rendered: string;
	};
	excerpt: {
		rendered: string;
	};
	date_gmt: string;
	categories: number[];
};
