import { faSquareUpRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { queryPosts } from "@/lib/news/query/query";
import type { Post } from "@/lib/news/posts/post";
import relativeDate from "tiny-relative-date";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useCommandPalette } from "@/components/react/commandPalette";

const quickLinks = [
	{ href: "https://my.scouting.org", label: "my.Scouting" },
	{ href: "https://advancements.scouting.org", label: "Scoutbook Plus" },
	{ href: "https://scoutbook.scouting.org", label: "Scoutbook" },
	{ href: "https://status.scouting.org", label: "System Status" },
];

export function Page({
	latestPosts,
}: {
	latestPosts: Awaited<ReturnType<typeof queryPosts>>;
}) {
	const { setOpen } = useCommandPalette();

	return (
		<div className="flex h-full w-full flex-col items-center justify-center p-8">
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-primary font-display text-5xl font-extrabold">
					Scouting411
				</h1>
				<h2 className="text-secondary-foreground text-xl mb-3">
					the unofficial front page of Scouting America
				</h2>

				<Button
					variant="outline"
					size="lg"
					onClick={() => setOpen(true)}
					aria-label="Search"
					className="h-10 w-lg items-center justify-between gap-2 px-3 text-md"
				>
					<span className="flex items-center gap-2">
						<SearchIcon className="" />
						<span className="text-muted-foreground hidden sm:block">
							Search...
						</span>
					</span>
					<KbdGroup className="hidden sm:inline-flex">
						<Kbd>Ctrl K</Kbd>
					</KbdGroup>
				</Button>
			</div>

			<div className="mt-10 mb-3 flex w-full max-w-5xl justify-between">
				<span className="text-primary font-serif text-xl font-bold">
					Latest News
				</span>

				<a href="/news/browse" className="text-primary font-bold underline">
					View all news &rarr;
				</a>
			</div>

			<div className="grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
				{latestPosts.posts.map((post) => (
					<PostSmallCard post={post} key={post.url} />
				))}
			</div>

			<div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
				<div className="flex flex-col items-start gap-4 rounded-lg border p-6">
					<span className="text-primary font-serif text-xl font-bold">
						Resources
					</span>
					<div className="flex flex-wrap gap-2"></div>
					<a
						href="/resources"
						className="text-primary mt-auto text-xs font-medium hover:underline"
					>
						View all resources &rarr;
					</a>
				</div>

				<div className="flex flex-col items-start gap-4 rounded-lg border p-6">
					<span className="text-primary font-serif text-xl font-bold">
						Quick Links
					</span>
					<ul className="flex w-full flex-col gap-2 text-sm">
						{quickLinks.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									rel="noopener noreferrer"
									target="_blank"
									className="hover:border-primary hover:text-primary flex items-center justify-between gap-2 rounded-md border px-3 py-2 font-medium transition-colors"
								>
									{link.label}
									<FontAwesomeIcon icon={faSquareUpRight} height="1em" />
								</a>
							</li>
						))}
					</ul>
				</div>

				<div className="flex flex-col items-start gap-4 rounded-lg border p-6">
					<span className="text-primary font-serif text-xl font-bold">
						Stay in the Loop
					</span>
					<p className="text-sm">
						Get new posts via RSS or Atom &mdash; plug the feeds into your
						favorite reader.
					</p>
					<a
						href="/news/subscribe"
						className="bg-primary hover:bg-primary/90 text-primary-foreground mt-3 rounded-md px-4 py-2 text-sm font-semibold"
					>
						Subscribe
					</a>
				</div>
			</div>
		</div>
	);
}

function PostSmallCard({ post }: { post: Post }) {
	return (
		<a
			href={post.url}
			rel="noopener noreferrer"
			target="_blank"
			className="hover:border-primary flex h-full flex-col items-start gap-2 rounded-lg border p-3"
		>
			<span className="text-muted-foreground text-sm">
				{post.feed.name} &middot; {relativeDate(post.date)}
			</span>
			<h3 className="line-clamp-2 font-serif font-bold text-ellipsis">
				{post.title}
			</h3>
		</a>
	);
}
