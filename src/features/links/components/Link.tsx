import type { Link } from "@/features/links/types";

export function Link({ link }: { link: Link }) {
	return (
		<div className="shadow-card flex justify-between rounded bg-white p-6">
			<div>
				<a
					href={link.url}
					rel="noopener noreferrer"
					target="_blank"
					className="text-brand-blue font-serif text-xl font-bold hover:underline"
				>
					{link.metadata.title}
				</a>

				<p className="text-sm">{link.metadata.description}</p>
			</div>
			<div>
				{link.feed?.type === "rss" && (
					<a
						href={link.feed.url}
						rel="noopener noreferrer"
						target="_blank"
						className="text-brand-blue font-serif text-xl font-bold hover:underline"
					>
						RSS
					</a>
				)}
			</div>
		</div>
	);
}
