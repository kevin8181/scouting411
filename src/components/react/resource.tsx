import type { Resource } from "@/features/resources/types";

export function Resource({ resource }: { resource: Resource }) {
	return (
		<div className="border-brand-gray-3 flex flex-col justify-between gap-3 rounded-lg border bg-white p-6 md:flex-row">
			<div className="flex flex-col gap-3">
				<a
					href={resource.url}
					rel="noopener noreferrer"
					target="_blank"
					className="text-brand-blue font-serif text-xl font-bold hover:underline"
				>
					{resource.title}
				</a>

				<p className="text-sm">{resource.description}</p>
			</div>
			{/* todo display all tags as one list */}
			{/* todo display resource type using an icon or something */}
			<div className="flex flex-col gap-3">
				<div className="flex items-center gap-3 md:justify-end">
					{resource.tags.resourceType.map((tag) => (
						<div
							key={tag.id}
							className="border-brand-blue/60 text-brand-blue rounded border-2 px-1 py-0.5 text-xs"
						>
							{tag.displayName}
						</div>
					))}
				</div>
				<div className="flex items-center gap-3 md:justify-end">
					{resource.tags.topic.map((tag) => (
						<div
							key={tag.id}
							className="border-brand-red/60 text-brand-red rounded border-2 px-1 py-0.5 text-xs"
						>
							{tag.displayName}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
