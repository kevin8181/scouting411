import { NavLink } from "@/components/layout/sidebar/navLink";
import { NavGroup } from "@/components/layout/sidebar/navGroup";
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
} from "@fortawesome/free-solid-svg-icons";
import { faGitAlt } from "@fortawesome/free-brands-svg-icons";

export function AppSidebar({ url }: { url: URL }) {
	return (
		<Sidebar className="border-r" aria-label="Main sidebar">
			<SidebarHeader className="flex h-13 shrink-0 items-start justify-center border-b px-4">
				<a
					href="/"
					className="font-display text-primary text-xl font-extrabold"
				>
					Scouting411
				</a>
			</SidebarHeader>

			<SidebarContent className="flex h-full flex-col justify-between overflow-auto">
				<div className="pt-3">
					<NavGroup>
						<NavLink
							href="/"
							label="Home"
							currentUrl={url}
							icon={faHouseChimney}
						/>
					</NavGroup>

					<NavGroup label="news">
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
					</NavGroup>

					<NavGroup label="resources">
						<NavLink
							href="/resources"
							label="Resources"
							currentUrl={url}
							icon={faBookBookmark}
						/>
					</NavGroup>
				</div>

				<div>
					<NavGroup label="about">
						<NavLink
							href="https://github.com/kevin8181/scouting411/issues/new/choose"
							label="Give Feedback"
							newTab
							currentUrl={url}
							icon={faCommentDots}
						/>
						<NavLink
							href="/developers"
							label="API"
							currentUrl={url}
							icon={faCode}
						/>
						<NavLink
							href="https://github.com/kevin8181/scouting411"
							label="Source Code"
							newTab
							currentUrl={url}
							icon={faGitAlt}
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
				</div>
			</SidebarContent>
			<SidebarFooter className="border-t">
				<span className="text-muted-foreground p-3 py-1 text-xs">
					Not affiliated with Scouting America.
				</span>
			</SidebarFooter>
		</Sidebar>
	);
}
