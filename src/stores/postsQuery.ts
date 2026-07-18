import { persistentJSON } from "@nanostores/persistent";
import type { QueryOpts } from "@/lib/news/query/query";

const defaultQueryOpts: QueryOpts = {
	filter: {},
	sort: {
		mode: "date",
		direction: "desc",
	},
	paginate: {
		page: 1,
		maxPageSize: 20,
	},
};

export const $postsQuery = persistentJSON<QueryOpts>(
	"postsQuery",
	defaultQueryOpts,
);
