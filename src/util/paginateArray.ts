import { z } from "astro/zod";

/** paginate an array of items */
export function paginateArray<T>(
	data: T[],
	opts: PaginateOpts,
): PaginatedResults<T> {
	const firstItemIndex = (opts.page - 1) * opts.maxPageSize;
	const lastItemIndex = firstItemIndex + opts.maxPageSize - 1;
	/** if the last item would be greater than the length of the array, set it to the last index */
	const realLastItemIndex = Math.min(lastItemIndex, data.length - 1);
	const totalPages = Math.ceil(data.length / opts.maxPageSize);

	const items = data.slice(firstItemIndex, lastItemIndex + 1);

	return {
		items,
		pagination: {
			page: opts.page,
			maxPageSize: opts.maxPageSize,
			pageSize: items.length,
			firstItemIndex,
			lastItemIndex: realLastItemIndex,
			totalItems: data.length,
			totalPages,
		},
	};
}

type PaginateOpts = z.infer<typeof paginateOptsSchema>;
export const paginateOptsSchema = z.object({
	/** the maximum page size */
	maxPageSize: z.coerce.number().min(1),
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
	maxPageSize: number;
	/** the number of items on the current page */
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
