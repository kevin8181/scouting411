import { CardList } from "@/components/react/cardList";
import { RenderPost as PostComponent } from "@/components/react/post";
import type { Post } from "@/features/posts/post";

export async function BrowsePage({ posts }: { posts: Post[] }) {
	return (
		<CardList>
			{posts.map((post) => (
				<PostComponent post={post} key={post.url} />
			))}
		</CardList>
	);
}
