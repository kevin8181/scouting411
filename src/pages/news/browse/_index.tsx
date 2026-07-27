import { CardFeed } from "@/components/react/cardFeed";
import { PostComponent } from "@/components/react/post";
import type { Post } from "@/lib/news/posts/post";
import type { QueryOpts } from "@/lib/news/query/types";
import { SecondarySidebar } from "@/components/layout/sidebar/secondarySidebar";
import { useState, useEffect } from "react";
import { actions } from "astro:actions";
import { FilterSidebar } from "@/pages/news/browse/_filterSidebar";

export function Page({ initialQuery }: { initialQuery: QueryOpts }) {
	const [query, setQuery] = useState(initialQuery);
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		(async () => {
			const results = await actions.queryPosts(query);
			if (results.error) {
				alert(results.error);
				return;
			}

			setPosts(results.data.items);
		})();
	}, [query]);

	return (
		<SecondarySidebar
			sidebar={<FilterSidebar query={query} setQuery={setQuery} />}
		>
			<div className="flex flex-1 flex-col gap-5 p-8">
				<CardFeed>
					{posts.map((post) => (
						<PostComponent post={post} key={post.url} />
					))}
				</CardFeed>
			</div>
		</SecondarySidebar>
	);
}
