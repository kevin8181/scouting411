import { z } from "zod";
import { filterOptsSchema } from "@/lib/news/query/filter";
import { sortOptsSchema } from "@/lib/news/query/sort";
import { paginateOptsSchema } from "@/util/paginateArray";

export type QueryOpts = z.infer<typeof queryOptsSchema>;
export const queryOptsSchema = z.object({
	filter: filterOptsSchema.default({}),
	sort: sortOptsSchema.default({ mode: "date", direction: "desc" }),
	paginate: paginateOptsSchema.default({ page: 1, maxPageSize: 20 }),
});
