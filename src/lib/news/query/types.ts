import { z } from "zod";
import { filterOptsSchema } from "@/lib/news/query/filter";
import { sortOptsSchema } from "@/lib/news/query/sort";
import { paginateOptsSchema } from "@/util/paginateArray";
import { feedSlugSchema } from "@/lib/news/feeds/types";
import { defaultVisibleFeeds } from "@/lib/news/feeds/feedManager";

export type QueryOpts = z.infer<typeof queryOptsSchema>;
export const queryOptsSchema = z.object({
	feeds: z.array(feedSlugSchema).default(defaultVisibleFeeds),
	filter: filterOptsSchema.default({}),
	sort: sortOptsSchema.default({ mode: "date", direction: "desc" }),
	paginate: paginateOptsSchema.default({ page: 1, maxPageSize: 20 }),
});
