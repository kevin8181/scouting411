import type { Post } from "@/lib/news/posts/post";

export function PostComponent({ post }: { post: Post }) {
	return (
		<div className="flex justify-between gap-4 rounded-lg border p-6">
			<div className="flex flex-col items-start gap-3">
				<span className="flex items-center gap-2 text-xs">
					<a href={post.feed.urls.overview} className="hover:underline">
						{post.feed.name}
					</a>

					<span className="font-bold">&middot;</span>
					<span className="whitespace-nowrap">
						{post.date.toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
				</span>
				<a
					href={post.url}
					rel="noopener noreferrer"
					target="_blank"
					className="text-primary font-serif text-xl font-bold wrap-anywhere hyphens-auto hover:underline"
				>
					{post.title}
				</a>
				<span className="line-clamp-3 text-sm wrap-anywhere hyphens-auto">
					{post.description ?? "No excerpt available."}
				</span>
			</div>

			{post.thumbnail && (
				<img
					className="h-36 w-48 shrink-0 rounded-lg border object-cover"
					src={post.thumbnail}
				/>
			)}
		</div>
	);
}
