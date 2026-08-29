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
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { SearchIcon } from "lucide-react";

import { atom } from "nanostores";
import { useStore } from "@nanostores/react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useIsMobile } from "@/util/hooks/use-mobile";

import { feeds } from "@/lib/news/feeds/feedManager";
import { resources } from "@/lib/resources/config";

/** global store for whether the command palette is open */
const $commandPaletteOpen = atom(false);

/** hook for the command palette open/closed state */
export function useCommandPalette() {
	const open = useStore($commandPaletteOpen);
	const setOpen = $commandPaletteOpen.set;
	return { open, setOpen };
}

/**
 * mount this component to wire up the command palette and hotkeys.
 * doesn't render anything until the command palette is actually open.
 * */
export function CommandPalette() {
	const { open, setOpen } = useCommandPalette();
	const isMobile = useIsMobile();

	useHotkey("/", () => setOpen(true));
	useHotkey("Mod+K", () => setOpen(true));

	return (
		<>
			<CommandDialog open={open && !isMobile} onOpenChange={setOpen}>
				<CommandPaletteContent />
			</CommandDialog>

			<Sheet open={open && isMobile} onOpenChange={setOpen}>
				<SheetContent side="top" showCloseButton={false}>
					<CommandPaletteContent />
				</SheetContent>
			</Sheet>
		</>
	);
}

/** the trigger button used in the site header */
export function CommandPaletteTrigger() {
	const { setOpen } = useCommandPalette();

	return (
		<Button
			variant="outline"
			onClick={() => setOpen(true)}
			aria-label="Search"
			className="h-8 w-8 items-center justify-center gap-2 sm:w-40 sm:justify-between sm:px-1.5"
		>
			<span className="flex items-center gap-2">
				<SearchIcon className="" />
				<span className="text-muted-foreground hidden sm:block">Search...</span>
			</span>
			<KbdGroup className="hidden sm:inline-flex">
				<Kbd>Ctrl K</Kbd>
			</KbdGroup>
		</Button>
	);
}

function CommandPaletteContent() {
	return (
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
							onSelect={() => openSelection(item.href)}
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
							onSelect={() => openSelection(feed.urls.overview)}
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
							onSelect={() => openSelection(resource.url, true)}
						>
							{resource.title}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}

/** run when a command palette item is selected */
function openSelection(url: string, newTab = false) {
	// have to close the pallete first, because of spa routing
	const { setOpen } = useCommandPalette();
	setOpen(false);

	if (newTab) {
		window.open(url, "_blank", "noopener,noreferrer");
	} else {
		window.location.href = url;
	}
}

/** site navigation links to include in the palette */
const navigation = [
	{ href: "/", label: "Launchpad" },
	{ href: "/news/browse", label: "Newsfeed" },
	{ href: "/news/sources", label: "Sources" },
	{ href: "/news/subscribe", label: "Subscribe" },
	{ href: "/news/stats", label: "Stats" },
	{ href: "/resources", label: "Resources" },
	{ href: "/developers", label: "API" },
];
