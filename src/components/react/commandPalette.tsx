import {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { SearchIcon } from "lucide-react";

import { feeds } from "@/lib/news/feeds/feedManager";
import { resources } from "@/lib/resources/config";

import { Kbd, KbdGroup } from "@/components/ui/kbd";

import { useHotkey } from "@tanstack/react-hotkeys";

const navigation = [
	{ href: "/", label: "Launchpad" },
	{ href: "/news/browse", label: "Newsfeed" },
	{ href: "/news/sources", label: "Sources" },
	{ href: "/news/subscribe", label: "Subscribe" },
	{ href: "/news/stats", label: "Stats" },
	{ href: "/resources", label: "Resources" },
	{ href: "/developers", label: "API" },
];

export function CommandPalette() {
	const [open, setOpen] = useState(false);

	useHotkey("/", () => setOpen(true));
	useHotkey("Mod+K", () => setOpen(true));

	function go(url: string, newTab = false) {
		setOpen(false);
		if (newTab) {
			window.open(url, "_blank", "noopener,noreferrer");
		} else {
			window.location.href = url;
		}
	}

	return (
		<>
			<Button
				variant="outline"
				onClick={() => setOpen(true)}
				aria-label="Search"
				className="h-8 w-8 items-center justify-center gap-2 sm:w-40 sm:justify-between sm:px-1.5"
			>
				<span className="flex items-center gap-2">
					<SearchIcon className="" />
					<span className="text-muted-foreground hidden sm:block">
						Search...
					</span>
				</span>
				<KbdGroup className="hidden sm:inline-flex">
					<Kbd>Ctrl K</Kbd>
				</KbdGroup>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>

						<CommandGroup heading="Navigation">
							{navigation.map((item) => (
								<CommandItem
									key={item.href}
									value={item.href}
									keywords={[item.label]}
									onSelect={() => go(item.href)}
								>
									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator />

						<CommandGroup heading="Feeds">
							{feeds.map((feed) => (
								<CommandItem
									key={feed.slug}
									value={feed.slug}
									keywords={[feed.name, feed.description]}
									onSelect={() => go(feed.urls.overview)}
								>
									{feed.name}
								</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator />

						<CommandGroup heading="Resources">
							{resources.map((resource) => (
								<CommandItem
									key={resource.url}
									value={resource.url}
									keywords={[resource.title, resource.description]}
									onSelect={() => go(resource.url, true)}
								>
									{resource.title}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	);
}
