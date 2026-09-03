import type { FeedAdapter, PostData } from "@/lib/news/ingest/types";
import { cleanHtmlString } from "@/util/cleanHtmlString";
import {
	extractAudioUrl,
	stripPodcastChrome,
} from "@/lib/news/ingest/adapters/podcast-archive/extractors";
import data from "./data.json";
import { z } from "zod";

type PodcastArchiveAdapterOpts = {
	categoryId: number;
};

export function PodcastArchiveAdapter(
	opts: PodcastArchiveAdapterOpts,
): FeedAdapter {
	return {
		type: {
			id: "podcast-archive",
			human: "Podcast Archive",
		},
		execute: async () => {
			const raw = archivedPostsSchema.parse(data);

			const postData: PostData[] = raw.flatMap((item) => {
				if (!item.categories.includes(opts.categoryId)) {
					return [];
				}

				const url = extractAudioUrl(item.content.rendered);
				if (!url)
					throw new Error(`no audio url found for ${item.title.rendered}`);

				return {
					date: item.date_gmt,
					description: cleanHtmlString(
						stripPodcastChrome(item.excerpt.rendered),
					),
					title: cleanHtmlString(item.title.rendered),
					url,
					thumbnail: undefined,
				};
			});

			return postData;
		},
	};
}

const archivedPostsSchema = z.array(
	z.object({
		date_gmt: z.string(),
		content: z.object({
			rendered: z.string(),
		}),
		excerpt: z.object({
			rendered: z.string(),
		}),
		title: z.object({
			rendered: z.string(),
		}),
		categories: z.array(z.number()),
	}),
);
