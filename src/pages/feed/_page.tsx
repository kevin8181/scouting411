import { CardList } from "@/components/react/cardList";
import { Post } from "@/components/react/post";
import { Feed } from "@/features/feeds/feed";

export async function IndexPage() {
	return (
		<CardList>
			{(await Feed.allPosts()).map((post) => (
				<Post post={post} key={post.url} />
			))}
		</CardList>
	);
}
