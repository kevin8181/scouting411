import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/sidebar/appSidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { DarkModeControl } from "@/components/react/darkModeControl";

import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";

export function AppShell({
	url,
	title,
	children,
}: {
	url: URL;
	title: string;
	children: ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar url={url} />
			<SidebarInset>
				<header className="bg-sidebar border-gray-3 sticky top-0 flex h-13 shrink-0 items-center justify-between border-b px-4">
					<span className="font-serif font-bold">{title}</span>
					<div className="flex items-center gap-2">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger render={<DarkModeControl />} />
								<TooltipContent>Toggle dark mode</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger
									render={
										<SidebarTrigger className="md:hidden" variant="outline" />
									}
								/>
								<TooltipContent>Toggle sidebar</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
