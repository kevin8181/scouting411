import type { Post } from "@/features/feeds/posts/types";

export function Post({ post }: { post: Post }) {
	return (
		<div className="shadow-card flex flex-col items-start gap-3 rounded bg-white p-6">
			<a
				href={post.url + "?utm_source=scouting411"}
				rel="noopener noreferrer"
				target="_blank"
				className="text-brand-blue font-serif text-xl font-bold hover:underline"
				dangerouslySetInnerHTML={{ __html: post.title }}
			/>
			<span className="flex items-center gap-2 text-xs text-gray-700">
				<span className="underline">Scouts BSA Program Updates</span>
				<span className="font-bold">&middot;</span>
				<span className="whitespace-nowrap">
					{post.date?.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</span>
			</span>
			<span
				className="text-sm"
				dangerouslySetInnerHTML={{ __html: post.description ?? "" }}
			/>
		</div>
	);
}