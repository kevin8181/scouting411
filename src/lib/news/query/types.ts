import { z } from "zod";
import { filterOptsSchema } from "@/lib/news/query/filter";
import { sortOptsSchema } from "@/lib/news/query/sort";
import { paginateOptsSchema } from "@/util/paginateArray";
import { feedSlugSchema } from "@/lib/news/feeds/types";
import { feedSlugs } from "@/lib/news/feeds/types";

export type QueryOpts = z.infer<typeof queryOptsSchema>;
export const queryOptsSchema = z.object({
	feeds: z
		.array(feedSlugSchema)
		.default(feedSlugs)
		.describe("include results only from these sources"),
	filter: filterOptsSchema.default({}),
	sort: sortOptsSchema.default({ mode: "date", direction: "desc" }),
	paginate: paginateOptsSchema.default({ page: 1, maxPageSize: 20 }),
});
