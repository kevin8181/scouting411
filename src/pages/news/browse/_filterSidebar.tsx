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
import { feeds } from "@/lib/news/feeds/feedManager";
import { type QueryOpts, queryOptsSchema } from "@/lib/news/query/types";
import { useForm } from "@tanstack/react-form";
import { postsQueryParamsEncoder } from "@/lib/news/query/queryParams";
import type { PaginatedResults } from "@/util/paginateArray";
import type { Post } from "@/lib/news/posts/post";

/** value -> pretty label for the sort direction select */
const sortDirectionItems = [
	{ value: "desc", label: "Newest first" },
	{ value: "asc", label: "Oldest first" },
] satisfies { value: QueryOpts["sort"]["direction"]; label: string }[];

export function FilterSidebar({
	query,
	setQuery,
	results,
}: {
	query: QueryOpts;
	setQuery: React.Dispatch<React.SetStateAction<QueryOpts>>;
	results: PaginatedResults<Post> | undefined;
}) {
	const form = useForm({
		defaultValues: query,
		listeners: {
			/** push the form values up to the page query whenever they are valid */
			onChange: ({ formApi }) => {
				const parsed = queryOptsSchema.safeParse(formApi.state.values);

				if (parsed.success) {
					setQuery(parsed.data);

					updateUrlQuery(parsed.data);
				}
			},
			onChangeDebounceMs: 300,
		},
	});

	return (
		<div className="flex flex-col">
			<div className="flex flex-col divide-y">
				<FilterSidebarItem label="sort">
					<form.Field name="sort.direction">
						{(field) => (
							<Select
								items={sortDirectionItems}
								value={field.state.value}
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

				<FilterSidebarItem label="page">
					<form.Field name="paginate.page">
						{(field) => (
							<Input
								type="number"
								min={1}
								placeholder="Page"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.valueAsNumber)}
							/>
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
								value={field.state.value}
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
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						)}
					</form.Field>
				</FilterSidebarItem>

				<FilterSidebarItem label="sources">
					<form.Field name="feeds">
						{(field) => (
							<FieldSet>
								<FieldGroup data-slot="checkbox-group">
									{feeds.map((feed) => (
										<Field key={feed.slug} orientation="horizontal">
											<Checkbox
												id={`source-${feed.slug}`}
												name={feed.slug}
												checked={field.state.value.includes(feed.slug)}
												onCheckedChange={(checked) =>
													field.handleChange(
														/** rebuild from the canonical feed list so the order stays stable */
														feeds
															.filter((candidate) =>
																candidate.slug === feed.slug
																	? checked
																	: field.state.value.includes(candidate.slug),
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
						)}
					</form.Field>
				</FilterSidebarItem>

				<FilterSidebarItem label="debug">
					<span className="text-sm">{JSON.stringify(query, null, 2)}</span>

					<span className="text-sm">
						{JSON.stringify(results?.pagination, null, 2)}
					</span>
				</FilterSidebarItem>
			</div>
		</div>
	);
}

function updateUrlQuery(query: QueryOpts) {
	const queryString = postsQueryParamsEncoder.encode(query);

	const url = new URL(document.location.href);
	url.search = queryString.toString();

	history.replaceState(null, "", url);
}
