import type { FeedAdapter, PostData } from "@/lib/news/ingest/types";
import { cleanHtmlString } from "@/util/cleanHtmlString";
import { z } from "zod";
import { sleep } from "@/util/sleep";

type WordpressAdapterOpts = {
	/** the base url of the wordpress site */
	baseUrl: string;
	/** the name of the wordpress object type. defaults to "posts" */
	type?: string;
	/** return only posts which have this category id */
	categoryFilter?: number;
	/** omit posts which have any of these category ids */
	categoryExcludeFilter?: number[];
};

/** the number of milliseconds to wait between requests */
const requestInterval = 500;

export function WordpressAdapter(opts: WordpressAdapterOpts): FeedAdapter {
	const execute = async () => {
		const firstPage = await fetchPage(1, opts);

		const remainingPages = Array.from(
			{ length: firstPage.totalPages - 1 },
			(_, i) => i + 2,
		);

		const functions = remainingPages.map(
			(page) => async () => (await fetchPage(page, opts)).posts,
		);

		const remainingPagesPosts = await Promise.all(
			functions.map(async (fn, i) => {
				await sleep(requestInterval * i);
				return fn();
			}),
		);

		return [firstPage.posts, ...remainingPagesPosts].flat();
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
	{
		baseUrl,
		type = "posts",
		categoryFilter,
		categoryExcludeFilter,
	}: WordpressAdapterOpts,
) {
	console.log(`fetch page ${page} from ${baseUrl}`);

	const params = new URLSearchParams({
		page: String(page),
		per_page: "100",
	});

	if (categoryFilter) params.set("categories", String(categoryFilter));

	if (categoryExcludeFilter?.length)
		params.set("categories_exclude", categoryExcludeFilter.join(","));

	const url = new URL(
		`/wp-json/wp/v2/${type}?${params.toString()}`,
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
		// todo thumbnails come solely from yoast, so sites without the seo plugin
		// installed get none at all - currently duty to god (0 of 78 posts) and
		// sea scouts (0 of 30). both expose a `featured_media` attachment id
		// instead, and appending `_embed=wp:featuredmedia` to the request inlines
		// that attachment as `_embedded["wp:featuredmedia"][0].source_url`, so
		// falling back to it would cost no extra requests. two caveats seen on
		// seascout.org: an id can point at deleted media, which embeds as an empty
		// object, and a restricted attachment embeds as a `rest_forbidden` error
		// object rather than media - so the whole lookup has to be optional, not
		// just the array index. that recovers 72 of 78 and 12 of 30 respectively.
		thumbnail: post.yoast_head_json?.og_image?.[0]?.url,
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
		excerpt: z
			.object({
				rendered: z.string(),
			})
			.optional(),
		yoast_head_json: z
			.object({
				og_description: z.string().optional(),
				og_image: z
					.array(
						z.object({
							url: z.string(),
						}),
					)
					.optional(),
			})
			.optional(),
		date_gmt: z.string(),
	}),
);
