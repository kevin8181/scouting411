import { CardList } from "@/components/react/cardList";
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

export async function Page({ query }: { query: QueryOpts }) {
	const results = await queryPosts(query);
	return (
		<>
			<span>
				Showing posts {results.pagination.firstItemIndex + 1} -{" "}
				{results.pagination.lastItemIndex + 1} of{" "}
				{results.pagination.totalItems}.
			</span>
			<CardList>
				{results.items.map((post) => (
					<PostComponent post={post} key={post.url} />
				))}
			</CardList>
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
		</>
	);
}
