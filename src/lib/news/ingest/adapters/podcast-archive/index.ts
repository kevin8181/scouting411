import type { FeedAdapter, PostData } from "@/lib/news/ingest/types";
import { cleanHtmlString } from "@/util/cleanHtmlString";
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

				return {
					date: item.date_gmt,
					description: cleanHtmlString(item.excerpt.rendered),
					title: cleanHtmlString(item.title.rendered),
					// todo this goes to the dead link at podcast.scouting.org. need to figure out how to pull out the mp3 url
					url: item.link,
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
		excerpt: z.object({
			rendered: z.string(),
		}),
		title: z.object({
			rendered: z.string(),
		}),
		link: z.url(),
		categories: z.array(z.number()),
	}),
);
