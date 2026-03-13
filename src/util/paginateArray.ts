import { z } from "astro/zod";

/** paginate an array of items */
export function paginateArray<T>(
	data: T[],
	opts: PaginateOpts,
): PaginatedResults<T> {
	const firstItemIndex = (opts.page - 1) * opts.pageSize;
	const lastItemIndex = firstItemIndex + opts.pageSize - 1;
	const totalPages = Math.ceil(data.length / opts.pageSize);

	const items = data.slice(firstItemIndex, lastItemIndex + 1);

	return {
		items,
		pagination: {
			page: opts.page,
			pageSize: opts.pageSize,
			firstItemIndex,
			lastItemIndex,
			totalItems: data.length,
			totalPages,
		},
	};
}

type PaginateOpts = z.infer<typeof paginateOptsSchema>;
export const paginateOptsSchema = z.object({
	/** the page size */
	pageSize: z.coerce.number().min(1),
	/** the page number */
	page: z.coerce.number().min(1),
});

export type PaginatedResults<T> = {
	items: T[];
	pagination: PaginationResultsMetadata;
};

type PaginationResultsMetadata = {
	/** the current page number */
	page: number;
	/** the maximum number of items per page */
	pageSize: number;
	/** the start index of the items on this page */
	firstItemIndex: number;
	/** the end index of the items on this page */
	lastItemIndex: number;
	/** the total number of items */
	totalItems: number;
	/** the total number of pages */
	totalPages: number;
};
