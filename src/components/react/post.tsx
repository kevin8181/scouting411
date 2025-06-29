import type { Post, PostWithFeedMeta } from "@/features/feeds/types";

export function Post({ post }: { post: PostWithFeedMeta }) {
	return (
		<div className="border-brand-gray-3 flex flex-col items-start gap-3 rounded-lg border bg-white p-6">
			<a
				href={post.post.url}
				rel="noopener noreferrer"
				target="_blank"
				className="text-brand-blue font-serif text-xl font-bold hover:underline"
				dangerouslySetInnerHTML={{ __html: post.post.title }}
			/>
			<span
				className="text-sm"
				dangerouslySetInnerHTML={{ __html: post.post.description ?? "" }}
			/>
			<span className="flex items-center gap-2 text-xs text-gray-700">
				{/* todo make this a link/button that does something */}
				<span className="underline">{post.feedMeta.name}</span>

				<span className="font-bold">&middot;</span>
				<span className="whitespace-nowrap">
					{post.post.date?.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</span>
			</span>
		</div>
	);
}
