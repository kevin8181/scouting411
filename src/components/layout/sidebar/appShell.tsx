import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/sidebar/appSidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppShell({ url, children }: { url: URL; children: ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar url={url} />
			<SidebarInset>
				<header className="sticky top-0 bg-gray-1 border-gray-3 flex h-13 items-center justify-end border-b px-5 py-3">
					<SidebarTrigger className="md:hidden" />
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
