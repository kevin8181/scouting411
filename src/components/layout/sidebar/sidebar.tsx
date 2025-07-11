import { NavLink } from "@/components/layout/sidebar/navLink";
import { NavGroup } from "@/components/layout/sidebar/navGroup";
import { NavDivider } from "@/components/layout/sidebar/navDivider";
import {
	faBookBookmark,
	faBullhorn,
	faHeartPulse,
	faHome,
	faMagnifyingGlassChart,
	faRssSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faGitAlt } from "@fortawesome/free-brands-svg-icons";

export default function Sidebar({ url }: { url: URL }) {
	return (
		<aside
			className="bg-gray-1 border-gray-3 hidden h-full w-64 min-w-64 flex-col justify-between overflow-auto border-r xl:flex"
			aria-label="Main sidebar"
		>
			<div className="pt-3">
				<NavGroup>
					<NavLink href="/" label="Home" currentUrl={url} icon={faHome} />
				</NavGroup>

				<NavGroup label="pulse">
					<NavLink
						href="/pulse/browse"
						label="Pulse"
						currentUrl={url}
						icon={faHeartPulse}
					/>
					<NavLink
						href="/pulse/sources"
						label="Sources"
						currentUrl={url}
						icon={faBullhorn}
					/>
					<NavLink
						href="/pulse/subscribe"
						label="Subscribe"
						currentUrl={url}
						icon={faRssSquare}
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
						href="/pulse/stats"
						label="Feed Stats"
						currentUrl={url}
						icon={faMagnifyingGlassChart}
					/>
					<NavLink
						href="https://github.com/kevin8181/scouting411"
						label="Github"
						newTab
						currentUrl={url}
						icon={faGitAlt}
					/>
				</NavGroup>
				<NavDivider />
				<div className="text-gray-8 p-3 text-xs">
					Not affiliated with Boy Scouts of America. Built at{" "}
					{new Date().toISOString()}.
				</div>
			</div>
		</aside>
	);
}
