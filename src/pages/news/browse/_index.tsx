import { CardFeed } from "@/components/react/cardFeed";
import { Post } from "@/components/react/post";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
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
import { FeedManager } from "@/lib/news/feeds/feedManager";
import type { queryPosts } from "@/lib/news/query";

import { SecondarySidebar } from "@/components/layout/sidebar/secondarySidebar";
import { FilterSidebarItem } from "@/components/react/filterSidebarItem";

export async function Page({
	results,
}: {
	results: Awaited<ReturnType<typeof queryPosts>>;
}) {
	return (
		<SecondarySidebar sidebar={<FilterSidebar />}>
			<div className="flex flex-1 flex-col gap-5 p-8">
				<CardFeed>
					{results.items.map((post) => (
						<Post post={post} key={post.url} />
					))}
				</CardFeed>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#" isActive>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">2</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="#" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</SecondarySidebar>
	);
}

function FilterSidebar() {
	return (
		<div className="flex flex-col">
			{/* <span>
				Showing posts {results.pagination.firstItemIndex + 1} -{" "}
				{results.pagination.lastItemIndex + 1} of{" "}
				{results.pagination.totalItems}.
			</span> */}

			<div className="flex flex-col divide-y">
				<FilterSidebarItem label="sort">
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="1">Option 1</SelectItem>
								<SelectItem value="2">Option 2</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</FilterSidebarItem>

				<FilterSidebarItem label="pagination">todo</FilterSidebarItem>

				<FilterSidebarItem label="search">
					<Input placeholder="Search..." />
				</FilterSidebarItem>

				<FilterSidebarItem label="sources">
					<FieldSet>
						{/* <FieldLegend variant="label">
									Show these items on the desktop:
								</FieldLegend> */}
						{/* <FieldDescription>
									Select the items you want to show on the desktop.
								</FieldDescription> */}
						<FieldGroup className="gap-3">
							{FeedManager.feeds.map((feed) => (
								<Field orientation="horizontal" key={feed.slug}>
									<Checkbox id={feed.name} name={feed.name} defaultChecked />
									<FieldLabel htmlFor={feed.name}>{feed.name}</FieldLabel>
								</Field>
							))}
						</FieldGroup>
					</FieldSet>
				</FilterSidebarItem>
			</div>
		</div>
	);
}
