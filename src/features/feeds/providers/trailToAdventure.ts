import type { FeedProvider } from "@/features/feeds/types";

//todo figure out how to get full post history

export function ttaProvider(): FeedProvider {
	return async () => {
		const response = await fetch("https://scouting.org/wp-json/wp/v2/tta-post");

		const posts: ttaApiPost[] = await response.json();

		return posts.map((post) => ({
			url: post.link,
			title: post.title.rendered,
			description: post.yoast_head_json.description,
			date: new Date(post.date_gmt),
		}));
	};
}

type ttaApiPost = {
	link: string;
	title: {
		rendered: string;
	};
	yoast_head_json: {
		description: string;
	};
	date_gmt: string;
};
