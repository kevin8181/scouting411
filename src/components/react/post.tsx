import type { Post, PostWithFeed } from "@/features/feeds/types";

export function Post({ post }: { post: PostWithFeed }) {
	return (
		<div className="border-brand-gray-3 flex flex-col items-start gap-3 rounded-lg border bg-white p-6">
			<a
				href={post.url}
				rel="noopener noreferrer"
				target="_blank"
				className="text-brand-blue font-serif text-xl font-bold wrap-anywhere hyphens-auto hover:underline"
			>
				{post.title}
			</a>
			<span className="text-sm wrap-anywhere hyphens-auto">
				{post.description}
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
