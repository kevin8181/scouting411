import type { FeedAdapter, PostData } from "@/lib/news/ingest/types";
import { cleanHtmlString } from "@/util/cleanHtmlString";
import { z } from "zod";

type WordpressAdapterOpts = {
	/** the base url of the wordpress site */
	baseUrl: string;
	/** the name of the wordpress object type. defaults to "posts" */
	type?: string;
	/** return only posts which have this category id */
	categoryFilter?: number;
};

export function WordpressAdapter(opts: WordpressAdapterOpts): FeedAdapter {
	const execute = async () => {
		const firstPage = await fetchPage(1, opts);

		return firstPage.posts;
	};

	return {
		type: {
			id: "wordpressApi",
			human: "Wordpress",
		},
		execute,
	};
}

/** retrieve one page worth of objects */
async function fetchPage(
	page: number,
	{ baseUrl, type = "posts", categoryFilter }: WordpressAdapterOpts,
) {
	console.log(`fetch page ${page} from ${baseUrl}`);

	const url = new URL(
		`/wp-json/wp/v2/${type}?page=${page}&per_page=100${categoryFilter ? `&categories=${categoryFilter}` : ""}`,
		baseUrl,
	).toString();

	const response = await fetch(url);

	if (response.status !== 200) {
		throw new Error(
			`failed to fetch posts from ${url}- status code ${response.status}`,
		);
	}

	const rawData = wordpressApiPostSchema.parse(await response.json());

	const posts: PostData[] = rawData.map((post) => ({
		url: post.link,
		title: cleanHtmlString(post.title.rendered),
		description: cleanHtmlString(
			post.yoast_head_json?.og_description ?? post.excerpt?.rendered ?? "",
		),
		date: post.date_gmt,
	}));

	return {
		posts,
		totalPages: parseInt(response.headers.get("x-wp-totalpages") ?? "1"),
	};
}

/** the shape of data returned by the wordpress api */
const wordpressApiPostSchema = z.array(
	z.object({
		link: z.string(),
		title: z.object({
			rendered: z.string(),
		}),
		excerpt: z.object({
			rendered: z.string(),
		}).optional(),
		yoast_head_json: z
			.object({
				og_description: z.string().optional(),
			})
			.optional(),
		date_gmt: z.string(),
	}),
);
