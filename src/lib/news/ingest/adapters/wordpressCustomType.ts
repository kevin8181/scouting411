import type { FeedAdapter } from "@/lib/news/ingest/types";
import { cleanHtmlString } from "@/util/cleanHtmlString";

//todo fetch the full post history

type WordpressCustomTypesAdapterOpts = {
	baseUrl: string;
	typeName: string;
};

export function WordpressCustomTypesAdapter(
	opts: WordpressCustomTypesAdapterOpts,
): FeedAdapter {
	return {
		type: {
			id: "wordpress-custom-type",
			human: "Wordpress Custom Types",
		},
		execute: async () => {
			const response = await fetch(
				new URL(`/wp-json/wp/v2/${opts.typeName}?per_page=100`, opts.baseUrl),
			);

			const posts: customTypeApiPost[] = await response.json();

			return posts.map((post) => ({
				url: post.link,
				title: cleanHtmlString(post.title.rendered),
				description: cleanHtmlString(post.yoast_head_json.description),
				date: post.date_gmt,
			}));
		},
	};
}

type customTypeApiPost = {
	link: string;
	title: {
		rendered: string;
	};
	yoast_head_json: {
		description: string;
	};
	date_gmt: string;
};
