import { CardList } from "@/components/react/cardList";
import { Post } from "@/components/react/post";

//todo
import { wordpressProvider } from "@/features/feeds/providers/wordpress";
const feed = await wordpressProvider({
	baseUrl: "https://scouting.org",
	categoryFilter: 15054,
});

export function IndexPage() {
	return (
		<CardList>
			{feed.map((item) => (
				<Post post={item} key={item.url} />
			))}
		</CardList>
	);
}
