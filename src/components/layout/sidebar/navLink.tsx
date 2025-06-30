import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NavLink({
	href,
	label,
	newTab,
	currentUrl,
	icon,
}: {
	href: string;
	label: string;
	newTab?: boolean;
	currentUrl: URL;
	icon: FontAwesomeIconProps["icon"];
}) {
	const isActive = currentUrl.pathname === href;

	const activeStateCss = isActive
		? "bg-white border-brand-gray-3 text-black"
		: "border-transparent text-brand-gray-9";

	return (
		<a
			href={href}
			className={
				"hover:border-brand-gray-3 rounded-lg border px-3 py-2 text-sm flex items-center gap-2.5 " +
				activeStateCss
			}
			target={newTab ? "_blank" : undefined}
			rel={newTab ? "noopener noreferrer" : undefined}
		>
			<FontAwesomeIcon icon={icon} height={"1em"}></FontAwesomeIcon> {label}
		</a>
	);
}
