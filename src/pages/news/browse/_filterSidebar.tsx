import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { FilterSidebarItem } from "@/components/react/filterSidebarItem";
import { feeds } from "@/lib/news/feeds/feed";
import { type QueryInput, queryInputSchema } from "@/lib/news/query/types";
import { type ResolvedQuery, resolveQuery } from "@/lib/news/query/resolve";
import { useForm } from "@tanstack/react-form";
import type { PaginatedResults } from "@/util/paginateArray";
import type { Post } from "@/lib/news/feeds/post";
import { SidebarHeader, SidebarContent } from "@/components/ui/sidebar";
import { PaginationControl } from "@/components/react/paginate";
import { Button } from "@/components/ui/button";

/** value -> pretty label for the sort direction select */
const sortDirectionItems = [
	{ value: "desc", label: "Newest first" },
	{ value: "asc", label: "Oldest first" },
] satisfies { value: ResolvedQuery["sort"]["direction"]; label: string }[];

/**
 * the form holds the sparse query, so the url records only what the user
 * touched. a field the user hasn't touched is undefined, and displays what it
 * resolves to instead
 */
export function FilterSidebar({
	query,
	setQuery,
	results,
}: {
	query: QueryInput;
	setQuery: React.Dispatch<React.SetStateAction<QueryInput>>;
	results: PaginatedResults<Post> | undefined;
}) {
	const { sort, paginate } = resolveQuery(query);

	// a url can't express `paginate: false`, so browse always pages
	if (paginate === false) {
		throw new Error("the browse page cannot show unpaginated results");
	}

	const form = useForm({
		defaultValues: query,
		listeners: {
			/** push the form values up to the page query whenever they are valid */
			onChange: ({ formApi }) => {
				const parsed = queryInputSchema.safeParse(formApi.state.values);

				if (parsed.success) {
					setQuery(parsed.data);
				}
			},
			onChangeDebounceMs: 300,
		},
	});

	return (
		<>
			<SidebarHeader className="border-b p-3">
				<span className="text-sm">
					{"Showing "}
					<span className="font-bold">
						{Intl.NumberFormat("en-us").formatRange(
							(results?.pagination.firstItemIndex ?? 0) + 1,
							(results?.pagination.lastItemIndex ?? 0) + 1,
						)}
					</span>
					{" of "}
					<span className="font-bold">
						{Intl.NumberFormat("en-us").format(
							results?.pagination.totalItems ?? 0,
						)}
					</span>
					{" results."}
				</span>

				<form.Field name="paginate.page">
					{(field) => (
						<PaginationControl
							page={field.state.value ?? paginate.page}
							maxPage={results?.pagination.totalPages ?? 1}
							onPageChange={(page) => field.handleChange(page)}
						/>
					)}
				</form.Field>
			</SidebarHeader>
			<SidebarContent>
				<div className="flex flex-col">
					<div className="flex flex-col divide-y">
						<FilterSidebarItem label="sort by">
							<form.Field name="sort.direction">
								{(field) => (
									<Select
										items={sortDirectionItems}
										value={field.state.value ?? sort.direction}
										onValueChange={(value: "asc" | "desc" | null) => {
											if (value) field.handleChange(value);
										}}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Sort by" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{sortDirectionItems.map((item) => (
													<SelectItem key={item.value} value={item.value}>
														{item.label}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							</form.Field>
						</FilterSidebarItem>

						<FilterSidebarItem label="items per page">
							<form.Field name="paginate.maxPageSize">
								{(field) => (
									<Input
										type="number"
										min={1}
										placeholder="Items"
										value={field.state.value ?? paginate.maxPageSize}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.valueAsNumber)}
									/>
								)}
							</form.Field>
						</FilterSidebarItem>

						<FilterSidebarItem label="keyword">
							<form.Field name="filter.keyword">
								{(field) => (
									<Input
										placeholder="Search..."
										value={field.state.value ?? ""}
										onBlur={field.handleBlur}
										onChange={(e) =>
											field.handleChange(e.target.value || undefined)
										}
									/>
								)}
							</form.Field>
						</FilterSidebarItem>

						<FilterSidebarItem label="published from">
							<form.Field name="filter.from">
								{(field) => (
									<Input
										type="date"
										value={field.state.value ?? ""}
										onBlur={field.handleBlur}
										onChange={(e) =>
											field.handleChange(e.target.value || undefined)
										}
									/>
								)}
							</form.Field>
						</FilterSidebarItem>

						<FilterSidebarItem label="published to">
							<form.Field name="filter.to">
								{(field) => (
									<Input
										type="date"
										value={field.state.value ?? ""}
										onBlur={field.handleBlur}
										onChange={(e) =>
											field.handleChange(e.target.value || undefined)
										}
									/>
								)}
							</form.Field>
						</FilterSidebarItem>

						<form.Field name="feeds">
							{(field) => (
								<FilterSidebarItem
									label="sources"
									accessory={
										<Button
											variant="ghost"
											className="text-primary"
											size="xs"
											onClick={() =>
												field.handleChange(
													feeds.flatMap((feed) =>
														(field.state.value?.length ?? 0) < feeds.length
															? feed.slug
															: [],
													),
												)
											}
										>
											{field.state.value?.length === feeds.length
												? "Clear all"
												: "Select all"}
										</Button>
									}
								>
									<FieldSet>
										<FieldGroup data-slot="checkbox-group">
											{feeds.map((feed) => (
												<Field key={feed.slug} orientation="horizontal">
													<Checkbox
														id={`source-${feed.slug}`}
														name={feed.slug}
														checked={field.state.value?.includes(feed.slug)}
														onCheckedChange={(checked) =>
															field.handleChange(
																/** rebuild from the canonical feed list so the order stays stable */
																feeds
																	.filter((candidate) =>
																		candidate.slug === feed.slug
																			? checked
																			: !!field.state.value?.includes(
																					candidate.slug,
																				),
																	)
																	.map((candidate) => candidate.slug),
															)
														}
													/>
													<FieldLabel htmlFor={`source-${feed.slug}`}>
														{feed.name}
													</FieldLabel>
												</Field>
											))}
										</FieldGroup>
									</FieldSet>
								</FilterSidebarItem>
							)}
						</form.Field>

						{/* <FilterSidebarItem label="debug">
							<span className="text-sm">{JSON.stringify(query, null, 2)}</span>

							<span className="text-sm">
								{JSON.stringify(results?.pagination, null, 2)}
							</span>
						</FilterSidebarItem> */}
					</div>
				</div>
			</SidebarContent>
		</>
	);
}
