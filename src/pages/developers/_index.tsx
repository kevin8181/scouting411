import type { Feed } from "@/lib/news/feeds/types";

import {
	faSquareUpRight,
	faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const exampleGetUrl =
	"/api/posts?feeds[]=cubchat&filter.keyword=camping&sort.mode=date&sort.direction=desc&paginate.page=1&paginate.maxPageSize=20";

const examplePostBody = `{
	"feeds": ["cubchat"],
	"filter": { "keyword": "camping" },
	"sort": { "mode": "date", "direction": "desc" },
	"paginate": { "page": 1, "maxPageSize": 20 }
}`;

const exampleResponse = `{
	"posts": [
		{
			"url": "https://example.org/a-post",
			"title": "A Post",
			"description": "An excerpt of the post.",
			"date": "2026-08-21T00:00:00.000Z",
			"thumbnail": "https://example.org/a-post.jpg",
			"feed": {
				"name": "#CubChatLive",
				"slug": "cubchat",
				"description": "The official video podcast of the Cub Scouts program.",
				"urls": { "overview": "...", "browsePosts": "...", "rss": "...", "atom": "...", "homepage": "..." },
				"type": { "id": "rss", "human": "RSS" },
				"defaultVisible": true
			}
		}
	],
	"pagination": {
		"page": 1,
		"maxPageSize": 20,
		"pageSize": 20,
		"firstItemIndex": 0,
		"lastItemIndex": 19,
		"totalItems": 133,
		"totalPages": 7
	}
}`;

const exampleError = `{
	"errors": [
		{
			"code": "invalid_value",
			"path": ["feeds", 0],
			"message": "Invalid option: expected one of \\"cubchat\\"|..."
		}
	]
}`;

const parameters = [
	{
		name: "feeds[]",
		type: "feed slug",
		default: "every default-visible feed",
		description:
			"Repeat the parameter once per source. Send an empty feeds[] to select no sources at all — omitting the key entirely falls back to the default.",
	},
	{
		name: "filter.keyword",
		type: "string",
		default: "none",
		description:
			"Case-insensitive substring match against each post's title and description.",
	},
	{
		name: "sort.mode",
		type: '"date"',
		default: '"date"',
		description: "The field to sort on. Only date is supported today.",
	},
	{
		name: "sort.direction",
		type: '"asc" | "desc"',
		default: '"desc"',
		description: "Sort direction.",
	},
	{
		name: "paginate.page",
		type: "number ≥ 1",
		default: "1",
		description: "Which page of results to return.",
	},
	{
		name: "paginate.maxPageSize",
		type: "number ≥ 1",
		default: "20",
		description: "How many posts a page holds.",
	},
];

const endpoints = [
	{
		method: "GET",
		path: "/api/posts",
		description: "Query posts using the search parameters described below.",
	},
	{
		method: "POST",
		path: "/api/posts",
		description: "The same query, sent as a JSON body.",
	},
	{
		method: "GET",
		path: "/feeds/{slug}/rss",
		description: "One source's cached posts, re-published as RSS.",
	},
	{
		method: "GET",
		path: "/feeds/{slug}/atom",
		description: "One source's cached posts, re-published as Atom.",
	},
	{
		method: "GET",
		path: "/feeds/all/opml",
		description: "Every Scouting411 feed as an OPML subscription list.",
	},
];

export function Page({ feeds }: { feeds: Feed[] }) {
	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-8">
			<section className="flex flex-col gap-3">
				<p className="text-sm">
					Scouting411 exposes its aggregated news index as a public JSON API. No
					authentication, no API key, no rate limit — just{" "}
					<Code>/api/posts</Code>. Posts are served from our cache, which is
					refreshed once a day, so responses may be stale by up to 24 hours.
				</p>

				<div className="border-primary/30 bg-primary/5 flex gap-3 rounded-lg border p-4 text-sm">
					<FontAwesomeIcon
						icon={faTriangleExclamation}
						height="0.9em"
						className="mt-1 shrink-0"
					/>
					<span>
						The API is not versioned and is still subject to major breaking
						changes. Pin nothing you can't fix quickly, and please open an issue
						if you're depending on it — we'd love to know.
					</span>
				</div>
			</section>

			<Section title="Endpoints">
				<Table headers={["Method", "Path", "Description"]}>
					{endpoints.map((endpoint) => (
						<tr
							key={endpoint.method + endpoint.path}
							className="border-b last:border-0"
						>
							<td className="px-4 py-3 font-mono text-xs font-medium">
								{endpoint.method}
							</td>
							<td className="px-4 py-3 font-mono text-xs wrap-anywhere">
								{endpoint.path}
							</td>
							<td className="px-4 py-3">{endpoint.description}</td>
						</tr>
					))}
				</Table>
			</Section>

			<Section title="Query parameters">
				<p className="text-sm">
					Nested keys use dot notation, and arrays use bracket notation (
					<Code>feeds[]=cubchat&feeds[]=on-scouting</Code>). Every parameter is
					optional; an empty query returns the most recent posts from the
					default-visible sources.
				</p>

				<Table headers={["Parameter", "Type", "Default", "Description"]}>
					{parameters.map((parameter) => (
						<tr key={parameter.name} className="border-b last:border-0">
							<td className="px-4 py-3 font-mono text-xs wrap-anywhere">
								{parameter.name}
							</td>
							<td className="text-muted-foreground px-4 py-3 font-mono text-xs wrap-anywhere">
								{parameter.type}
							</td>
							<td className="text-muted-foreground px-4 py-3 font-mono text-xs wrap-anywhere">
								{parameter.default}
							</td>
							<td className="px-4 py-3">{parameter.description}</td>
						</tr>
					))}
				</Table>
			</Section>

			<Section title="Examples">
				<div className="flex flex-col gap-2">
					<h3 className="text-muted-foreground text-xs font-medium uppercase">
						GET
					</h3>
					<CodeBlock>{exampleGetUrl}</CodeBlock>
					<a
						href={exampleGetUrl}
						rel="noopener noreferrer"
						target="_blank"
						className="text-primary flex items-center gap-2 self-start text-sm font-medium hover:underline"
					>
						Run this query
						<FontAwesomeIcon icon={faSquareUpRight} height="0.9em" />
					</a>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-muted-foreground text-xs font-medium uppercase">
						POST body
					</h3>
					<CodeBlock>{examplePostBody}</CodeBlock>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-muted-foreground text-xs font-medium uppercase">
						Response
					</h3>
					<CodeBlock>{exampleResponse}</CodeBlock>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-muted-foreground text-xs font-medium uppercase">
						Errors
					</h3>
					<p className="text-sm">
						An invalid query returns <Code>400</Code> with the validation issues
						that caused it. Every other successful call returns <Code>200</Code>
						.
					</p>
					<CodeBlock>{exampleError}</CodeBlock>
				</div>
			</Section>

			<Section title="Feed slugs">
				<p className="text-sm">
					The <Code>feeds[]</Code> parameter and the <Code>/feeds/</Code> routes
					both take these slugs. Anything else is rejected.
				</p>

				<Table headers={["Source", "Slug", "Default"]}>
					{feeds.map((feed) => (
						<tr
							key={feed.slug}
							className="hover:bg-muted border-b last:border-0"
						>
							<td className="px-4 py-3">
								<a
									href={feed.urls.overview}
									className="text-primary font-medium wrap-anywhere hyphens-auto hover:underline"
								>
									{feed.name}
								</a>
							</td>
							<td className="px-4 py-3 font-mono text-xs wrap-anywhere">
								{feed.slug}
							</td>
							<td className="text-muted-foreground px-4 py-3">
								{feed.defaultVisible ? "Visible" : "Hidden"}
							</td>
						</tr>
					))}
				</Table>
			</Section>

			<Section title="Open source">
				<p className="text-sm">
					Scouting411 is free and open source software, licensed under the
					AGPLv3. Stars, issues, and pull requests are all very appreciated!
				</p>
				<a
					href="https://github.com/kevin8181/scouting411"
					rel="noopener noreferrer"
					target="_blank"
					className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 self-start rounded-md px-4 py-2 text-sm font-semibold"
				>
					<FontAwesomeIcon icon={faGithub} height="0.9em" />
					GitHub Repo
				</a>
			</Section>
		</div>
	);
}

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col gap-4">
			<h2 className="font-serif text-xl font-bold">{title}</h2>
			{children}
		</section>
	);
}

function Table({
	headers,
	children,
}: {
	headers: string[];
	children: React.ReactNode;
}) {
	return (
		<div className="overflow-hidden rounded-lg border">
			<table className="w-full border-collapse text-sm">
				<thead>
					<tr className="border-b">
						{headers.map((header) => (
							<th key={header} className="px-4 py-3 text-left font-medium">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	);
}

function Code({ children }: { children: React.ReactNode }) {
	return (
		<code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs wrap-anywhere">
			{children}
		</code>
	);
}

function CodeBlock({ children }: { children: React.ReactNode }) {
	return (
		<pre className="bg-muted rounded-lg border p-4 font-mono text-xs wrap-anywhere whitespace-pre-wrap">
			{children}
		</pre>
	);
}
