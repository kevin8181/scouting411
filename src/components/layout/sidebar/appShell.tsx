import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/sidebar/appSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function AppShell({ url, children }: { url: URL; children: ReactNode }) {
	return (
		<SidebarProvider className="flex h-dvh w-full flex-col">
			<header className="bg-blue flex h-13 items-center justify-between px-5 py-3 text-white">
				<a href="/" className="font-display text-xl font-extrabold">
					Scouting411
				</a>
			</header>

			<div className="flex h-[calc(100vh-52px)]">
				<AppSidebar url={url} />
				<main className="h-full w-full overflow-auto">{children}</main>
			</div>
		</SidebarProvider>
	);
}
