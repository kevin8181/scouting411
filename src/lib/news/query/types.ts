import { z } from "zod";
import { filterOptsSchema } from "@/lib/news/query/filter";
import { sortOptsSchema } from "@/lib/news/query/sort";
import { paginateOptsSchema } from "@/util/paginateArray";
import { feedSlugSchema } from "@/lib/news/feeds/types";

/**
 * a query as the caller wrote it. every field is optional and the schema fills
 * in nothing — defaults are applied by `resolveQuery`, so the input stays as
 * sparse as it was given (which is what keeps browse urls short)
 */
export type QueryInput = z.infer<typeof queryInputSchema>;
export const queryInputSchema = z.object({
	feeds: z
		.array(feedSlugSchema)
		.optional()
		.describe(
			"Include results only from these sources. Omit or pass an empty array to include every source.",
		),
	filter: filterOptsSchema.optional(),
	sort: sortOptsSchema.optional(),
	paginate: z
		.union([z.literal(false), paginateOptsSchema.partial()])
		.optional()
		.describe(
			"Page defaults to 1 and maxPageSize to 20. Pass false to return every matching post as a single page.",
		),
});
