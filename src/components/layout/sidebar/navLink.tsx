import { faSquareUpRight } from "@fortawesome/free-solid-svg-icons";
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarMenuButton } from "@/components/ui/sidebar";

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
		? "bg-white border-gray-3 text-black"
		: "border-transparent text-gray-9";

	return (
		<SidebarMenuButton
			isActive={isActive}
			className={
				"h-auto justify-between gap-2.5 rounded-lg border px-3 py-2 text-sm font-normal ring-0 outline-none hover:border-gray-3 hover:bg-transparent hover:text-inherit active:bg-transparent active:text-inherit data-active:bg-transparent data-active:font-normal data-active:text-inherit focus-visible:ring-0 " +
				activeStateCss
			}
			render={
				<a
					href={href}
					target={newTab ? "_blank" : undefined}
					rel={newTab ? "noopener noreferrer" : undefined}
				>
					<div className="flex items-center gap-2">
						<FontAwesomeIcon icon={icon} height={"1em"}></FontAwesomeIcon>{" "}
						{label}
					</div>
					{newTab && <FontAwesomeIcon icon={faSquareUpRight} height={"1em"} />}
				</a>
			}
		/>
	);
}
