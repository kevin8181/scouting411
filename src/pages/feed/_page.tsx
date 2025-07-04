import { CardList } from "@/components/react/cardList";
import { Post } from "@/components/react/post";
import { getAllPosts } from "@/features/feeds/getAllPosts";

export async function IndexPage() {
	return (
		<CardList>
			{(await getAllPosts()).map((item) => (
				<Post post={item} key={item.post.url} />
			))}
		</CardList>
	);
}
