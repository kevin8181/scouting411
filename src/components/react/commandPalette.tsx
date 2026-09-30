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
import { useEffect, useState } from "react";

import { feeds } from "@/lib/news/feeds/feed";
import { hubs } from "@/lib/hubs/hub";
import { queryResources } from "@/lib/resources/query";
import { useTheme } from "@/components/react/darkModeControl";
import {
	type MeritBadge,
	meritBadgePath,
} from "@/lib/advancement/meritBadges/types";
import { type Rank, rankPath } from "@/lib/advancement/ranks/types";
import {
	type Adventure,
	adventurePath,
} from "@/lib/advancement/adventures/types";
import { rpc } from "@/rpc/client";

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
			className="items-center justify-between gap-2 px-1.5"
		>
			<span className="flex items-center gap-2">
				<SearchIcon className="" />
				<span className="text-muted-foreground">Search...</span>
			</span>
			<KbdGroup className="inline-flex">
				<Kbd>Ctrl K</Kbd>
			</KbdGroup>
		</Button>
	);
}

function CommandPaletteContent() {
	const { setTheme } = useTheme();
	const resources = queryResources();
	const { ranks, meritBadges, adventures } = useAdvancement();

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
							onSelect={handleSelection({ url: item.href })}
						>
							{item.label}
						</CommandItem>
					))}
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Hubs">
					{hubs.map((hub) => (
						<CommandItem
							key={hub.slug}
							value={hub.links.page}
							keywords={[hub.name, `${hub.name} Hub`, hub.description]}
							onSelect={handleSelection({ url: hub.links.page })}
						>
							<span
								className="size-2.5 shrink-0 rounded-xs"
								style={{ backgroundColor: hub.color }}
							/>
							{hub.name}
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
							onSelect={handleSelection({ url: feed.links.overview })}
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
							onSelect={handleSelection({ url: resource.url, newTab: true })}
						>
							{resource.title}
						</CommandItem>
					))}
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Ranks">
					{ranks.map((rank) => (
						<CommandItem
							key={rank.slug}
							value={rankPath(rank.slug)}
							keywords={[rank.name, `${rank.name} Rank`, rank.program]}
							onSelect={handleSelection({ url: rankPath(rank.slug) })}
						>
							<img
								src={rank.images.medium}
								alt=""
								className="size-5 object-contain"
							/>
							{rank.name}
						</CommandItem>
					))}
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Merit Badges">
					{meritBadges.map((badge) => (
						<CommandItem
							key={badge.slug}
							value={meritBadgePath(badge.slug)}
							keywords={[badge.name, `${badge.name} Merit Badge`]}
							onSelect={handleSelection({ url: meritBadgePath(badge.slug) })}
						>
							<img src={badge.images.small} alt="" className="size-5" />
							{badge.name}
						</CommandItem>
					))}
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Adventures">
					{adventures.map((adventure) => (
						<CommandItem
							key={adventure.slug}
							value={adventurePath(adventure.slug)}
							keywords={[
								adventure.name,
								`${adventure.name} Adventure`,
								adventure.rank.name,
							]}
							onSelect={handleSelection({ url: adventurePath(adventure.slug) })}
						>
							<img
								src={adventure.images.small}
								alt=""
								className="size-5 object-contain"
							/>
							{adventure.name}
						</CommandItem>
					))}
				</CommandGroup>
				<CommandSeparator />

				<CommandGroup heading="Site Theme">
					<CommandItem
						key={"dark"}
						value={"dark"}
						keywords={["dark mode", "light mode", "system theme"]}
						onSelect={handleSelection(() => setTheme("dark"))}
					>
						Enable dark mode
					</CommandItem>
					<CommandItem
						key={"light"}
						value={"light"}
						keywords={["dark mode", "light mode", "system theme"]}
						onSelect={handleSelection(() => setTheme("light"))}
					>
						Enable light mode
					</CommandItem>
					<CommandItem
						key={"system"}
						value={"system"}
						keywords={["dark mode", "light mode", "system theme"]}
						onSelect={handleSelection(() => setTheme("system"))}
					>
						Use system theme
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	);
}

/**
 * ranks, merit badges, and adventures live in redis rather than in config, so fetch them
 * once the palette opens. their groups are empty until they arrive
 */
function useAdvancement() {
	const [ranks, setRanks] = useState<Rank[]>([]);
	const [meritBadges, setMeritBadges] = useState<MeritBadge[]>([]);
	const [adventures, setAdventures] = useState<Adventure[]>([]);

	useEffect(() => {
		let stale = false;

		rpc.advancement.ranks
			.list()
			.then((data) => {
				if (!stale) setRanks(data);
			})
			.catch(console.error);

		rpc.advancement.meritBadges
			.list()
			.then((data) => {
				if (!stale) setMeritBadges(data);
			})
			.catch(console.error);

		rpc.advancement.adventures
			.list({})
			.then((data) => {
				if (!stale) setAdventures(data);
			})
			.catch(console.error);

		return () => {
			stale = true;
		};
	}, []);

	return { ranks, meritBadges, adventures };
}

/** run when a command palette item is selected */
function handleSelection(
	opts: { url: string; newTab?: boolean } | (() => void),
) {
	return () => {
		$commandPaletteOpen.set(false);

		if (typeof opts === "function") {
			opts();
			return;
		}

		if (opts.newTab) {
			window.open(opts.url, "_blank", "noopener,noreferrer");
		} else {
			window.location.href = opts.url;
		}
	};
}

/** site navigation links to include in the palette */
const navigation = [
	{ href: "/", label: "Home" },
	{ href: "/news/browse", label: "Newsfeed" },
	{ href: "/news/sources", label: "Sources" },
	{ href: "/news/subscribe", label: "Subscribe" },
	{ href: "/news/stats", label: "Stats" },
	{ href: "/advancement/ranks", label: "Ranks" },
	{ href: "/advancement/merit-badges", label: "Merit Badges" },
	{ href: "/advancement/adventures", label: "Adventures" },
	{ href: "/resources", label: "Resources" },
	{ href: "/developers", label: "Developers" },
];
