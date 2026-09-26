import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { queryPosts } from "@/lib/news/query/query";
import type { Post } from "@/lib/news/feeds/post";
import type { Hub } from "@/lib/hubs/types";
import type { Resource } from "@/lib/resources/types";
import { feeds } from "@/lib/news/feeds/feed";
import { resources } from "@/lib/resources/config";
import relativeDate from "tiny-relative-date";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, SearchIcon } from "lucide-react";
import { useCommandPalette } from "@/components/react/commandPalette";

const quickLinks = [
	{ href: "https://my.scouting.org", label: "my.Scouting" },
	{ href: "https://advancements.scouting.org", label: "Scoutbook Plus" },
	{ href: "https://scoutbook.scouting.org", label: "Scoutbook" },
	{ href: "https://status.scouting.org", label: "System Status" },
];

// todo replace with a curated list of featured resources
const featuredResources = resources.slice(0, 12);

export function Page({
	latestPosts,
	hubPosts,
	feedCount,
	postCount,
}: {
	latestPosts: Awaited<ReturnType<typeof queryPosts>>;
	hubPosts: { hub: Hub; latestPost: Post | undefined }[];
	feedCount: number;
	postCount: number;
}) {
	const { setOpen } = useCommandPalette();

	return (
		<div className="flex w-full flex-col items-center gap-20 p-8 pt-16 pb-20">
			<div className="flex w-full flex-col items-center gap-4 py-8">
				<h1 className="text-primary font-display text-center text-4xl font-extrabold min-[380px]:text-5xl">
					Scouting411
				</h1>
				<h2 className="text-secondary-foreground text-center text-xl">
					the unofficial front page of Scouting America
				</h2>

				<Button
					variant="outline"
					size="lg"
					onClick={() => setOpen(true)}
					aria-label="Search"
					className="text-md mt-3 h-10 w-full max-w-lg items-center justify-between gap-2 px-3"
				>
					<span className="flex items-center gap-2">
						<SearchIcon />
						<span className="text-muted-foreground">Search...</span>
					</span>
				</Button>

				<ul className="mt-3 flex flex-wrap justify-center gap-2">
					{quickLinks.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								rel="noopener noreferrer"
								target="_blank"
								className="hover:border-primary hover:text-primary bg-card flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
							>
								{link.label}
								<ArrowUpRightIcon className="size-3.5" />
							</a>
						</li>
					))}
				</ul>
			</div>

			<section className="flex w-full max-w-5xl flex-col gap-3">
				<SectionHeader
					title="Hubs"
					description="A home for each corner of Scouting, with its news and go-to resources on one page."
				/>

				<ul className="bg-card divide-y overflow-hidden rounded-lg border">
					{hubPosts.map(({ hub, latestPost }) => (
						<li key={hub.slug}>
							<HubRow hub={hub} latestPost={latestPost} />
						</li>
					))}
				</ul>
			</section>

			<section className="flex w-full max-w-5xl flex-col gap-3">
				<SectionHeader
					title="All News"
					description={`The firehose: all ${Intl.NumberFormat().format(postCount)} posts from ${Intl.NumberFormat().format(feedCount)} official sources.`}
					link={{ href: "/news/browse", label: "Open Newsfeed" }}
				/>

				<FeedMarquee />

				<div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 max-sm:[&>:nth-child(n+4)]:hidden">
					{latestPosts.posts.map((post) => (
						<PostCard post={post} key={post.url} />
					))}
				</div>
			</section>

			<section className="flex w-full max-w-5xl flex-col gap-3">
				<SectionHeader
					title="All Resources"
					description="Handbooks, forms, and tools, in one place."
					link={{ href: "/resources", label: "Browse all resources" }}
				/>

				<ul className="bg-border grid grid-cols-1 gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-4">
					{featuredResources.map((resource) => (
						<li key={resource.url} className="bg-card">
							<ResourceTile resource={resource} />
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

function SectionHeader({
	title,
	description,
	link,
}: {
	title: string;
	description: string;
	link?: { href: string; label: string };
}) {
	return (
		<div className="mb-2 flex flex-col items-start gap-x-6 gap-y-1 lg:flex-row lg:items-center lg:justify-between">
			<div className="flex min-w-0 flex-col gap-x-3 gap-y-1 lg:flex-1 lg:flex-row lg:items-center">
				<h2 className="text-primary font-serif text-2xl font-bold">{title}</h2>
				<span aria-hidden className="text-muted-foreground hidden lg:inline">
					|
				</span>
				<p className="text-muted-foreground text-sm">{description}</p>
			</div>
			{link && (
				<a
					href={link.href}
					className="text-primary text-sm font-semibold whitespace-nowrap underline"
				>
					{link.label} <FontAwesomeIcon icon={faArrowRight} />
				</a>
			)}
		</div>
	);
}

function HubRow({
	hub,
	latestPost,
}: {
	hub: Hub;
	latestPost: Post | undefined;
}) {
	return (
		<a
			href={hub.links.page}
			className="hover:bg-accent group grid grid-cols-[1fr_auto_auto] items-center gap-x-3 gap-y-1 px-5 py-4 sm:grid-cols-[13rem_1fr_auto_auto] sm:gap-x-6"
		>
			<span className="col-span-2 col-start-1 row-start-1 flex items-center gap-3 font-serif text-base font-bold sm:col-span-1">
				<span
					className="size-3 shrink-0 rounded-xs"
					style={{ backgroundColor: hub.color }}
				/>
				{hub.name}
			</span>

			<span className="col-start-1 row-start-2 min-w-0 truncate text-sm sm:col-start-2 sm:row-start-1">
				{latestPost ? (
					latestPost.title
				) : (
					<span className="text-muted-foreground">No posts yet</span>
				)}
			</span>

			{latestPost && (
				<span className="text-muted-foreground col-start-2 row-start-2 text-xs whitespace-nowrap sm:col-start-3 sm:row-start-1">
					{relativeDate(latestPost.date)}
				</span>
			)}

			<FontAwesomeIcon
				icon={faArrowRight}
				className="text-primary col-start-3 row-span-2 row-start-1 transition-transform group-hover:translate-x-0.5 sm:col-start-4 sm:row-span-1"
			/>
		</a>
	);
}

/** an endlessly scrolling row of every feed, linking to each feed's overview */
function FeedMarquee() {
	return (
		<div className="group overflow-hidden border-y mask-x-from-95% py-3 [contain:inline-size] motion-reduce:overflow-x-auto">
			<div className="animate-marquee flex w-max group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
				{/* the list is rendered twice so the loop is seamless */}
				{[false, true].map((isDuplicate) => (
					<ul
						key={String(isDuplicate)}
						aria-hidden={isDuplicate || undefined}
						className={`flex gap-2 pr-2 ${isDuplicate ? "motion-reduce:hidden" : ""}`}
					>
						{feeds.map((feed) => (
							<li key={feed.slug}>
								<a
									href={feed.links.overview}
									tabIndex={isDuplicate ? -1 : undefined}
									className="hover:border-primary hover:text-primary bg-card block rounded-full border px-4 py-1.5 text-sm whitespace-nowrap"
								>
									{feed.name}
								</a>
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	);
}

function PostCard({ post }: { post: Post }) {
	return (
		<a
			href={post.url}
			rel="noopener noreferrer"
			target="_blank"
			className="hover:border-primary bg-card flex h-full flex-col items-start gap-2 rounded-lg border p-5"
		>
			<span className="text-muted-foreground text-sm">
				{post.feed.name} &middot; {relativeDate(post.date)}
			</span>
			<h3 className="line-clamp-3 font-serif text-base font-bold">
				{post.title}
			</h3>
			{post.description && (
				<p className="text-muted-foreground line-clamp-2 text-sm">
					{post.description}
				</p>
			)}
		</a>
	);
}

function ResourceTile({ resource }: { resource: Resource }) {
	return (
		<a
			href={resource.url}
			rel="noopener noreferrer"
			target="_blank"
			className="hover:bg-accent group flex h-full items-center justify-between gap-3 px-5 py-3"
		>
			<span className="flex min-w-0 flex-col">
				<span className="truncate text-sm font-medium">{resource.title}</span>
				<span className="text-muted-foreground truncate text-xs">
					{new URL(resource.url).hostname.replace(/^www\./, "")}
				</span>
			</span>
			<ArrowUpRightIcon className="text-muted-foreground group-hover:text-primary size-3.5 shrink-0" />
		</a>
	);
}
