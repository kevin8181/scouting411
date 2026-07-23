import React from "react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavGroup({
	label,
	children,
}: {
	label?: string;
	children: React.ReactNode;
}) {
	return (
		<SidebarGroup className="gap-1 p-0 px-3 pb-3">
			{label && (
				<SidebarGroupLabel className="text-gray-8 h-auto rounded-none p-0 pl-3 text-[0.78rem] font-normal">
					{label}
				</SidebarGroupLabel>
			)}
			<SidebarGroupContent>
				<SidebarMenu className="gap-0.75">
					{React.Children.map(children, (child) => (
						<SidebarMenuItem>{child}</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
