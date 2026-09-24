import type { Feed } from "@/lib/news/feeds/types";

import {
	faSquareUpRight,
	faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const feedEndpoints = [
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
					authentication, no API key, no rate limit. Posts are served from our
					cache, which is refreshed once a day, so responses may be stale by up
					to 24 hours.
				</p>

				<p className="text-sm">
					The API reference lists every endpoint with its parameters and
					responses, and lets you try requests from the browser.
				</p>

				<a
					href="/api"
					className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 self-start rounded-md px-4 py-2 text-sm font-semibold"
				>
					API Reference
					<FontAwesomeIcon icon={faSquareUpRight} height="0.9em" />
				</a>

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

			<Section title="Feeds">
				<p className="text-sm">
					Each source's cached posts are also re-published as RSS and Atom, so
					you can follow them in any feed reader.
				</p>

				<Table headers={["Method", "Path", "Description"]}>
					{feedEndpoints.map((endpoint) => (
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

			<Section title="Feed slugs">
				<p className="text-sm">
					The <Code>/feeds/</Code> routes take these slugs. Anything else is
					rejected.
				</p>

				<Table headers={["Source", "Slug"]}>
					{feeds.map((feed) => (
						<tr
							key={feed.slug}
							className="hover:bg-muted border-b last:border-0"
						>
							<td className="px-4 py-3">
								<a
									href={feed.links.overview}
									className="text-primary font-medium wrap-anywhere hyphens-auto hover:underline"
								>
									{feed.name}
								</a>
							</td>
							<td className="px-4 py-3 font-mono text-xs wrap-anywhere">
								{feed.slug}
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
