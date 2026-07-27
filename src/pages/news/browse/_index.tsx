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
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);

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
				{posts?.length === 0 && (
					<div className="flex flex-col items-center gap-4 p-8">
						<div className="text-gray-10 text-xl">
							No posts found matching your search.
						</div>
						<div className="text-gray-10 text-sm">
							Try adjusting your filters or searching for a different keyword.
						</div>
					</div>
				)}

				{posts === undefined && (
					<div className="flex flex-col items-center gap-4 p-8">
						<div className="text-gray-10 text-xl">Loading posts...</div>
					</div>
				)}

				{posts && posts.length > 0 && (
					<CardFeed>
						{posts.map((post) => (
							<PostComponent post={post} key={post.url} />
						))}
					</CardFeed>
				)}
			</div>
		</SecondarySidebar>
	);
}
