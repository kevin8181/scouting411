import { NavLink } from "@/components/layout/sidebar/navLink";
import { NavGroup } from "@/components/layout/sidebar/navGroup";
import { NavDivider } from "@/components/layout/sidebar/navDivider";
import {
	faBookBookmark,
	faHome,
	faNewspaper,
	faSquareRss,
} from "@fortawesome/free-solid-svg-icons";
import { faGitAlt } from "@fortawesome/free-brands-svg-icons";

export default function Sidebar({ url }: { url: URL }) {
	return (
		<aside
			className="bg-brand-gray-1 border-brand-gray-3 hidden h-full w-64 min-w-64 flex-col justify-between overflow-auto border-r xl:flex"
			aria-label="Main sidebar"
		>
			<NavGroup>
				<NavLink href="/" label="Home" currentUrl={url} icon={faHome} />
				<NavLink
					href="/feed"
					label="Feed"
					currentUrl={url}
					icon={faNewspaper}
				/>
				<NavLink
					href="/resources"
					label="Resources"
					currentUrl={url}
					icon={faBookBookmark}
				/>
			</NavGroup>

			<div>
				<NavGroup label="about">
					<NavLink
						href="/feeds/rss.xml"
						label="RSS Feed"
						newTab
						currentUrl={url}
						icon={faSquareRss}
					/>
					<NavLink
						href="https://github.com/kevin8181/scouting411"
						label="GitHub"
						newTab
						currentUrl={url}
						icon={faGitAlt}
					/>
				</NavGroup>
				<NavDivider />
				<div className="text-brand-gray-8 p-3 text-xs">
					Not affiliated with Boy Scouts of America. Built at{" "}
					{new Date().toISOString()}.
				</div>
			</div>
		</aside>
	);
}
