import type { Link } from "@/features/links/types";

export function Link({ link }: { link: Link }) {
	return (
		<div className="shadow-card flex flex-col items-start gap-2 rounded bg-white px-6 py-6">
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
	);
}
