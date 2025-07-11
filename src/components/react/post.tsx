import type { Post } from "@/features/posts/post";

export function Post({ post }: { post: Post }) {
	return (
		<div className="border-gray-3 flex flex-col items-start gap-3 rounded-lg border bg-white p-6">
			<a
				href={post.url}
				rel="noopener noreferrer"
				target="_blank"
				className="text-blue font-serif text-xl font-bold wrap-anywhere hyphens-auto hover:underline"
			>
				{post.title}
			</a>
			<span className="text-sm wrap-anywhere hyphens-auto">
				{post.description ?? "No excerpt available."}
			</span>
			<span className="flex items-center gap-2 text-xs text-gray-700">
				<a href={post.feed.overviewUrl} className="underline">
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
