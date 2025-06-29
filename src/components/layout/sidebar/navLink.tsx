export function NavLink({
	href,
	label,
	newTab,
	currentUrl,
}: {
	href: string;
	label: string;
	newTab?: boolean;
	currentUrl: URL;
}) {
	const isActive = currentUrl.pathname === href;

	const activeStateCss = isActive
		? "bg-white border-brand-gray-3 text-black"
		: "border-transparent text-brand-gray-9";

	return (
		<a
			href={href}
			className={
				"hover:border-brand-gray-3 rounded-lg border px-3 py-2 text-sm " +
				activeStateCss
			}
			target={newTab ? "_blank" : undefined}
			rel={newTab ? "noopener noreferrer" : undefined}
		>
			{label}
		</a>
	);
}
