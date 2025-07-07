import type { Post, PostWithFeed } from "@/features/feeds/types";

//todo move this symbol decoding somewhere else; it shouldn't be in the display layer
import he from "he";

export function Post({ post }: { post: PostWithFeed }) {
	return (
		<div className="border-brand-gray-3 flex flex-col items-start gap-3 rounded-lg border bg-white p-6">
			<a
				href={post.url}
				rel="noopener noreferrer"
				target="_blank"
				className="text-brand-blue font-serif text-xl font-bold wrap-anywhere hyphens-auto hover:underline"
			>
				{he.decode(post.title)}
			</a>
			<span className="text-sm wrap-anywhere hyphens-auto">
				{he.decode(post.description ?? "No excerpt available.")}
			</span>
			<span className="flex items-center gap-2 text-xs text-gray-700">
				{/* todo make this a link/button that does something */}
				<a
					href={post.feed.homepageUrl}
					rel="noopener noreferrer"
					target="_blank"
					className="underline"
				>
					{post.feed.name}
				</a>

				<span className="font-bold">&middot;</span>
				<span className="whitespace-nowrap">
					{post.date?.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</span>
			</span>
		</div>
	);
}
