import { faSquareUpRight } from "@fortawesome/free-solid-svg-icons";
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/util/cn";

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

	return (
		<SidebarMenuButton
			isActive={isActive}
			className={cn(
				"h-auto justify-between gap-2.5 rounded-lg border border-transparent px-3 py-2 text-sm font-normal outline-none",
				"hover:border-gray-3",
				"data-active:bg-blue/10 data-active:text-blue data-active:font-bold",
			)}
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
