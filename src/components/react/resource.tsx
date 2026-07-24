import type { Resource } from "@/lib/resources/types";

export function Resource({ resource }: { resource: Resource }) {
	return (
		<div className="border-gray-3 flex flex-col justify-between gap-3 rounded-lg border p-6 md:flex-row">
			<div className="flex flex-col gap-3">
				<a
					href={resource.url}
					rel="noopener noreferrer"
					target="_blank"
					className="text-blue font-serif text-xl font-bold hover:underline"
				>
					{resource.title}
				</a>

				<p className="text-sm">{resource.description}</p>
			</div>
		</div>
	);
}
