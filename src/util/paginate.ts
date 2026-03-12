/** paginate an array of items */
function paginate({
	page,
	pageSize,
	totalItems,
}: PaginateOpts): PaginateResult {
	const startIndex = (page - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const totalPages = Math.ceil(totalItems / pageSize);

	return {
		startIndex,
		endIndex,
		page,
		pageSize,
		totalItems,
		totalPages,
	};
}

type PaginateOpts = {
	/** the total number of items */
	totalItems: number;
	/** the page size */
	pageSize: number;
	/** the page number */
	page: number;
};

type PaginateResult = {
	/** the start index of the items on this page */
	startIndex: number;
	/** the end index of the items on this page */
	endIndex: number;
	/** the current page number */
	page: number;
	/** the maximum number of items per page */
	pageSize: number;
	/** the total number of items */
	totalItems: number;
	/** the total number of pages */
	totalPages: number;
};
