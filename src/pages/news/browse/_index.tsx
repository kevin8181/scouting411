import { CardFeed } from "@/components/react/cardFeed";
import { Post } from "@/components/react/post";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
// import { FeedManager } from "@/lib/news/feeds/feedManager";
import type { queryPosts, QueryOpts } from "@/lib/news/query";

import { SecondarySidebar } from "@/components/layout/sidebar/secondarySidebar";
import { FilterSidebarItem } from "@/components/react/filterSidebarItem";

export function Page({
	results,
	query,
}: {
	results: Awaited<ReturnType<typeof queryPosts>>;
	query: QueryOpts;
}) {
	return (
		<SecondarySidebar sidebar={<FilterSidebar query={query} />}>
			<div className="flex flex-1 flex-col gap-5 p-8">
				<CardFeed>
					{results.items.map((post) => (
						<Post post={post} key={post.url} />
					))}
				</CardFeed>
			</div>
		</SecondarySidebar>
	);
}

function FilterSidebar({ query }: { query: QueryOpts }) {
	return (
		<div className="flex flex-col">
			<div className="flex flex-col divide-y">
				<FilterSidebarItem label="sort">
					<Select value={query.sort.direction}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="asc">Ascending</SelectItem>
								<SelectItem value="desc">Descending</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</FilterSidebarItem>

				<FilterSidebarItem label="page">
					<Input type="number" placeholder="Page" value={query.paginate.page} />
				</FilterSidebarItem>

				<FilterSidebarItem label="items per page">
					<Input
						type="number"
						placeholder="Items"
						value={query.paginate.maxPageSize}
					/>
				</FilterSidebarItem>

				<FilterSidebarItem label="keyword">
					<Input placeholder="Search..." value={query.filter.keyword} />
				</FilterSidebarItem>

				<FilterSidebarItem label="sources">
					todo
					{/* <FieldSet>
						<FieldGroup className="gap-3">
							{FeedManager.feeds.map((feed) => (
								<Field orientation="horizontal" key={feed.slug}>
									<Checkbox id={feed.name} name={feed.name} defaultChecked />
									<FieldLabel htmlFor={feed.name}>{feed.name}</FieldLabel>
								</Field>
							))}
						</FieldGroup>
					</FieldSet> */}
				</FilterSidebarItem>

				<FilterSidebarItem label="debug">
					<span className="text-sm">{JSON.stringify(query, null, 2)}</span>
				</FilterSidebarItem>
			</div>
		</div>
	);
}
