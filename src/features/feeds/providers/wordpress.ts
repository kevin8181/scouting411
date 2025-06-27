import type { Post } from "@/features/feeds/posts/types";

export async function wordpressProvider(
	opts: wordpressProviderOpts,
): Promise<Post[]> {
	const response = await fetch(new URL("/wp-json/wp/v2/posts?per_page=100", opts.baseUrl).toString());

	console.log(response.status);

	const posts: wordpressApiPost[] = await response.json();

	return posts.map((post) => ({
		url: post.link,
		title: post.title.rendered,
		description: post.excerpt.rendered,
		date: post.date_gmt ? new Date(post.date_gmt) : undefined,
	}));
}

type wordpressProviderOpts = {
	baseUrl: string;
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
};
