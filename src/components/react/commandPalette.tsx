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

export function CommandPalette() {
	const [open, setOpen] = useState(false);

	useHotkey("/", () => setOpen(true));
	useHotkey("Mod+K", () => setOpen(true));

	return (
		<>
			<Button
				variant="outline"
				onClick={() => setOpen(true)}
				aria-label="Search"
				className="h-8 justify-between gap-2 px-2.5 font-normal md:text-sm"
			>
				<span className="flex min-w-0 items-center gap-2">
					<SearchIcon className="" />
					<span className="text-muted-foreground truncate">Search...</span>
				</span>
				<KbdGroup>
					<Kbd>/</Kbd>
				</KbdGroup>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>

						<CommandGroup heading="Navigation">
							<CommandItem>Home</CommandItem>
							<CommandItem>About</CommandItem>
							<CommandItem>News</CommandItem>
							<CommandItem>Resources</CommandItem>
							<CommandItem>Developers</CommandItem>
						</CommandGroup>
						<CommandSeparator />

						<CommandGroup heading="Feeds">
							{feeds.map((feed) => (
								<CommandItem key={feed.slug}>{feed.name}</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator />

						<CommandGroup heading="Resources">
							{resources.map((resource) => (
								<CommandItem key={resource.url}>{resource.title}</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	);
}
