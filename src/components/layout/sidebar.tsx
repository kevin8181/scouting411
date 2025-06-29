export default function Sidebar() {
	return (
		<aside className="bg-brand-gray-2 w-64 min-w-64 flex-col justify-between hidden xl:flex">
			<nav className="text-brand-gray-10 flex flex-col p-4">
				<a
					href="/"
					className="hover:bg-brand-gray-1 hover:border-brand-gray-3 rounded-lg border border-transparent px-2 py-1.5"
				>
					Home
				</a>
				<a
					href="/feed"
					className="hover:bg-brand-gray-1 hover:border-brand-gray-3 rounded-lg border border-transparent px-2 py-1.5"
				>
					Feed
				</a>
				<a
					href="/resources"
					className="hover:bg-brand-gray-1 hover:border-brand-gray-3 rounded-lg border border-transparent px-2 py-1.5"
				>
					Resources
				</a>
			</nav>
			<div>
				<nav className="flex flex-col p-4">
					<a
						href="/rss.xml"
						target="_blank"
						className="hover:bg-brand-gray-1 hover:border-brand-gray-3 rounded-lg border border-transparent px-2 py-1.5"
					>
						RSS Feed
					</a>
					<a
						href="https://github.com/kevin8181/scouting411"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:bg-brand-gray-1 hover:border-brand-gray-3 rounded-lg border border-transparent px-2 py-1.5"
					>
						GitHub
					</a>
				</nav>
				<div className="bg-brand-gray-3 px-4 py-2 text-xs">
					Not affiliated with Boy Scouts of America. Updated{" "}
					{new Date().toLocaleString()}.
				</div>
			</div>
		</aside>
	);
}
