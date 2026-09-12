import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/sidebar/appSidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { CommandPalette } from "@/components/react/commandPalette";

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
		<>
			<CommandPalette />
			<SidebarProvider>
				<AppSidebar url={url} />
				<SidebarInset>
					<header className="bg-sidebar sticky top-0 flex h-13 shrink-0 items-center gap-4 border-b px-4">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger
									render={
										<SidebarTrigger className="md:hidden" variant="outline" />
									}
								/>
								<TooltipContent>Toggle sidebar</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<span className="font-serif font-bold">{title}</span>
					</header>
					{children}
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}
