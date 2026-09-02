export function Page() {
	return (
		<div className="flex flex-col items-start gap-4 p-8">
			<div>
				The REST API can be found at{" "}
				<a href="/api/posts" className="text-primary underline">
					/api/posts
				</a>
				. No authentication is required.
			</div>

			<span>The API is not yet documented and will be subject to major breaking changes.</span>

			<span>
				Scouting411 is free and open source software, licensed under the AGPLv3.
				Stars, issues, and pull requests are all very appreciated!
			</span>
			<a
				href="https://github.com/kevin8181/scouting411"
				className="text-primary underline"
			>
				Github Repo
			</a>
		</div>
	);
}
