import { CardFeed } from "@/components/react/cardFeed";
import { RenderPost as PostComponent } from "@/components/react/post";
import { queryPosts, type QueryOpts } from "@/lib/news/query";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import { SecondarySidebar } from "@/components/layout/sidebar/secondarySidebar";
import { FilterSidebarItem } from "@/components/react/filterSidebarItem";

export async function Page({ query }: { query: QueryOpts }) {
	const results = await queryPosts(query);
	return (
		<SecondarySidebar
			sidebar={
				<div className="flex flex-col">
					<span>
						Showing posts {results.pagination.firstItemIndex + 1} -{" "}
						{results.pagination.lastItemIndex + 1} of{" "}
						{results.pagination.totalItems}.
					</span>

					<div className="flex flex-col divide-y">
						<FilterSidebarItem label="sort">todo</FilterSidebarItem>

						<FilterSidebarItem label="pagination">todo</FilterSidebarItem>

						<FilterSidebarItem label="search">todo</FilterSidebarItem>

						<FilterSidebarItem label="sources">todo</FilterSidebarItem>
					</div>
				</div>
			}
		>
			<div className="flex flex-1 flex-col gap-5 p-8">
				<CardFeed>
					{results.items.map((post) => (
						<PostComponent post={post} key={post.url} />
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
