import { NavLink } from "@/components/layout/sidebar/navLink";
import { NavGroup } from "@/components/layout/sidebar/navGroup";
import { Badge } from "@/components/ui/badge";
import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
} from "@/components/ui/sidebar";
import {
	faBookBookmark,
	faBullhorn,
	faCommentDots,
	faHouseChimney,
	faMagnifyingGlassChart,
	faNewspaper,
	faRssSquare,
	faCode,
	faArrowsRotate,
	faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { buttonVariants } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DarkModeControl } from "@/components/react/darkModeControl";

import { CommandPaletteTrigger } from "@/components/react/commandPalette";

export function AppSidebar({ url }: { url: URL }) {
	return (
		<Sidebar className="border-r" aria-label="Main sidebar">
			<SidebarHeader className="flex h-13 shrink-0 flex-row items-center justify-start gap-2 border-b px-4">
				<a
					href="/"
					className="font-display text-primary text-xl font-extrabold"
				>
					Scouting411
				</a>
				<Badge variant="secondary" className="text-muted-foreground font-mono">
					alpha
				</Badge>
			</SidebarHeader>

			<SidebarContent className="flex h-full flex-col overflow-auto py-3 gap-5">
				<div className="flex flex-col px-3">
					<CommandPaletteTrigger />
				</div>

				<NavGroup>
					<NavLink
						href="/"
						label="Home"
						currentUrl={url}
						icon={faHouseChimney}
					/>
				</NavGroup>

				<NavGroup label="news" collapsible>
					<NavLink
						href="/news/browse"
						label="Newsfeed"
						currentUrl={url}
						icon={faNewspaper}
					/>
					<NavLink
						href="/news/sources"
						label="Sources"
						currentUrl={url}
						icon={faBullhorn}
					/>
					<NavLink
						href="/news/subscribe"
						label="Subscribe"
						currentUrl={url}
						icon={faRssSquare}
					/>
					<NavLink
						href="/news/stats"
						label="Stats"
						currentUrl={url}
						icon={faMagnifyingGlassChart}
					/>
					{import.meta.env.DEV && (
						<NavLink
							href="/api/updateAllFeeds"
							label="Update All Feeds"
							currentUrl={url}
							icon={faArrowsRotate}
							newTab
						/>
					)}
				</NavGroup>

				<NavGroup label="resources" collapsible>
					<NavLink
						href="/resources"
						label="Resources"
						currentUrl={url}
						icon={faBookBookmark}
					/>
				</NavGroup>
			</SidebarContent>

			<SidebarFooter className="p-0">
				<span className="text-muted-foreground p-3 py-1 text-xs">
					Not affiliated with Scouting America.
				</span>
				<div className="flex flex-row items-center justify-between gap-2 border-t p-4">
					<a
						href="/about"
						className={buttonVariants({ size: "icon-sm", variant: "outline" })}
					>
						<FontAwesomeIcon icon={faCircleInfo} />
					</a>
					<a
						href="https://github.com/kevin8181/scouting411/issues/new/choose"
						className={buttonVariants({ size: "icon-sm", variant: "outline" })}
					>
						<FontAwesomeIcon icon={faCommentDots} />
					</a>
					<a
						href="/developers"
						className={buttonVariants({ size: "icon-sm", variant: "outline" })}
					>
						<FontAwesomeIcon icon={faCode} />
					</a>
					<DarkModeControl />
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
