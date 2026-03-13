import { CardList } from "@/components/react/cardList";
import { RenderPost as PostComponent } from "@/components/react/post";
import { queryPosts } from "@/features/postsQuery/query";

export async function BrowsePage() {
	const results = await queryPosts({
		filter: {},
		sort: {
			mode: "date",
			direction: "desc",
		},
		paginate: {
			maxPageSize: 100,
			page: 1,
		},
	});
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
		</>
	);
}
