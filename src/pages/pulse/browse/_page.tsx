import { CardList } from "@/components/react/cardList";
import { RenderPost as PostComponent } from "@/components/react/post";
import { queryPosts, type QueryOpts } from "@/features/postsQuery/query";

export async function BrowsePage({ query }: { query: QueryOpts }) {
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
		</>
	);
}
