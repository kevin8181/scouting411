import { os } from "@orpc/server";
import { queryOptsSchema } from "@/lib/news/query/types";
import { queryPosts } from "@/lib/news/query/query";

export const queryPostsProcedure = os
	.input(queryOptsSchema)
	.handler(({ input }) => queryPosts(input));
