import { persistentJSON } from "@nanostores/persistent";
import type { QueryOpts } from "@/features/postsQuery/query";

const defaultQueryOpts: QueryOpts = {
	filter: {},
	sort: {
		mode: "date",
		direction: "desc",
	},
	paginate: {
		page: 1,
		pageSize: 20,
	},
};

export const $postsQuery = persistentJSON<QueryOpts>(
	"postsQuery",
	defaultQueryOpts,
);
