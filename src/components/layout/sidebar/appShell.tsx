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
				<header className="bg-sidebar border-gray-3 sticky top-0 flex h-13 items-center justify-between border-b px-5 py-3 font-serif text-lg">
					<span>{title}</span>
					<SidebarTrigger className="md:hidden" />
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
