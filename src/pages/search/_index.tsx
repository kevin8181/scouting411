import { ExternalLinkIcon } from "lucide-react";
import { SearchForm } from "@/components/react/searchForm";
import {
	searchItemMedia,
	searchItemTypes,
} from "@/components/react/searchItem";
import type { SearchItem } from "@/lib/search/types";

export function Page({
	query,
	results,
	origin,
}: {
	query: string;
	results: SearchItem[];
	/** the site's origin, to resolve internal urls for display */
	origin: string;
}) {
	return (
		<div className="flex w-full max-w-3xl flex-col gap-6 p-8">
			<SearchForm query={query} />

			<p className="text-muted-foreground text-sm">
				{results.length === 0
					? `No results for “${query}”. Try a shorter or different search.`
					: `${results.length} ${results.length === 1 ? "result" : "results"} for “${query}”`}
			</p>

			<ol className="flex flex-col gap-7">
				{results.map((result) => (
					<SearchResult key={result.id} item={result} origin={origin} />
				))}
			</ol>
		</div>
	);
}

function SearchResult({ item, origin }: { item: SearchItem; origin: string }) {
	const type = searchItemTypes[item.type];

	return (
		<li className="flex gap-4">
			<div className="bg-muted/40 text-muted-foreground mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-md border [&_svg]:size-5">
				{searchItemMedia(item, "size-8 rounded-sm") ?? type.icon}
			</div>

			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<div className="text-muted-foreground flex min-w-0 items-center gap-1.5 text-xs">
					<span className="text-foreground shrink-0 font-medium">
						{type.label}
					</span>
					<span aria-hidden>·</span>
					<span className="truncate">{breadcrumb(item.url, origin)}</span>
				</div>

				<a
					href={item.url}
					{...(item.external && {
						target: "_blank",
						rel: "noopener noreferrer",
					})}
					className="text-primary w-fit font-serif text-lg leading-snug font-bold hover:underline"
				>
					{item.name}
					{item.external && (
						<ExternalLinkIcon
							className="ml-1.5 inline size-3.5 align-baseline"
							aria-label="(opens in a new tab)"
						/>
					)}
				</a>

				{item.description && (
					<p className="text-muted-foreground line-clamp-2 text-sm">
						{item.description}
					</p>
				)}
			</div>
		</li>
	);
}

/** a url as a breadcrumb, the way search engines show one: "host › path › segments" */
function breadcrumb(url: string, origin: string) {
	const { host, pathname } = new URL(url, origin);

	return [host.replace(/^www\./, ""), ...pathname.split("/").filter(Boolean)]
		.map(decodeURIComponent)
		.join(" › ");
}
