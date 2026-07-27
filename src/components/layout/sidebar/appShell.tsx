import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/sidebar/appSidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

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
					<SidebarTrigger className="md:hidden" />
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
