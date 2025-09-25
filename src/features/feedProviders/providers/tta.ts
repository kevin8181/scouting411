import { FeedProvider } from "@/features/feedProviders/feedProvider";
import he from "he";

//todo fetch the full post history

export function TtaProvider() {
	return new FeedProvider({
		type: {
			id: "tta",
			human: "Trail to Adventure (bespoke)",
		},
		execute: async () => {
			const response = await fetch(
				"https://scouting.org/wp-json/wp/v2/tta-post?per_page=100",
			);

			const posts: ttaApiPost[] = await response.json();

			return posts.map((post) => ({
				url: post.link,
				title: he.decode(post.title.rendered),
				description: post.yoast_head_json.description,
				date: post.date_gmt,
			}));
		},
	});
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
