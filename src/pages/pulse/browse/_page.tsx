import { CardList } from "@/components/react/cardList";
import { Post } from "@/components/react/post";
import { FeedManager } from "@/features/feeds/feedManager";

export async function IndexPage() {
	return (
		<CardList>
			{FeedManager.allPosts().map((post) => (
				<Post post={post} key={post.url} />
			))}
		</CardList>
	);
}
