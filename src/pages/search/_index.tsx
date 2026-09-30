import { ExternalLinkIcon, NewspaperIcon } from "lucide-react";
import { SearchForm } from "@/components/react/searchForm";
import { postsQueryParamsEncoder } from "@/lib/news/query/queryParams";
import { cn } from "@/util/cn";
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
	// on wide screens the news card sits in its own column beside everything else; on
	// narrow ones it falls between the result count and the results
	return (
		<div className="grid w-full max-w-6xl grid-cols-1 gap-x-12 gap-y-6 p-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
			<SearchForm query={query} className="lg:col-start-1" />

			<p className="text-muted-foreground text-sm lg:col-start-1">
				{results.length === 0
					? `No results for “${query}”. Try a shorter or different search.`
					: `${results.length} ${results.length === 1 ? "result" : "results"} for “${query}”`}
			</p>

			<NewsCard
				query={query}
				className="self-start lg:sticky lg:top-17 lg:col-start-2 lg:row-span-3 lg:row-start-1"
			/>

			<ol className="flex flex-col gap-7 lg:col-start-1">
				{results.map((result) => (
					<SearchResult key={result.id} item={result} origin={origin} />
				))}
			</ol>
		</div>
	);
}

/** search results don't cover news, so point to the newsfeed with the same keyword */
function NewsCard({ query, className }: { query: string; className?: string }) {
	const href = `/news/browse?${postsQueryParamsEncoder.encode({
		filter: { keyword: query },
	})}`;

	return (
		<aside
			className={cn(
				"bg-card flex flex-col gap-2 rounded-lg border p-4 text-sm",
				className,
			)}
		>
			<h2 className="flex items-center gap-2 font-serif font-bold">
				<NewspaperIcon className="text-muted-foreground size-4" />
				Looking for news?
			</h2>
			<p className="text-muted-foreground">
				Search results don't include news posts.
			</p>
			<a
				href={href}
				className="text-primary w-fit font-medium hover:underline"
			>
				Search news for “{query}” →
			</a>
		</aside>
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
