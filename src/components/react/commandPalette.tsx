import {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
	CompassIcon,
	ExternalLinkIcon,
	RssIcon,
	SearchIcon,
	SunMoonIcon,
} from "lucide-react";

import { atom } from "nanostores";
import { useStore } from "@nanostores/react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useIsMobile } from "@/util/hooks/use-mobile";
import { Fragment, type ReactNode, useEffect, useRef, useState } from "react";
import { defaultFilter } from "cmdk";

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
	const [search, setSearch] = useState("");

	// results reorder on every keystroke, so start each new search from the top. wait a
	// frame: cmdk scrolls its previously selected item into view after this effect, and
	// clearing the search moves that item deep into the grouped list
	const listRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const frame = requestAnimationFrame(() => {
			listRef.current?.scrollTo({ top: 0 });
		});
		return () => cancelAnimationFrame(frame);
	}, [search]);

	const sections: Section[] = [
		{
			heading: "Navigation",
			type: "Page",
			icon: <CompassIcon />,
			entries: navigation.map((item) => ({
				id: item.href,
				name: item.label,
				keywords: [item.label],
				onSelect: handleSelection({ url: item.href }),
			})),
		},
		{
			heading: "Hubs",
			type: "Hub",
			entries: hubs.map((hub) => ({
				id: hub.links.page,
				name: hub.name,
				keywords: [hub.name, `${hub.name} Hub`, hub.description],
				icon: (
					<span
						className="size-2.5 shrink-0 rounded-xs"
						style={{ backgroundColor: hub.color }}
					/>
				),
				onSelect: handleSelection({ url: hub.links.page }),
			})),
		},
		{
			heading: "Feeds",
			type: "Feed",
			icon: <RssIcon />,
			entries: feeds.map((feed) => ({
				id: feed.links.overview,
				name: feed.name,
				keywords: [feed.name, feed.description],
				onSelect: handleSelection({ url: feed.links.overview }),
			})),
		},
		{
			heading: "Resources",
			type: "Resource",
			icon: <ExternalLinkIcon />,
			entries: resources.map((resource) => ({
				id: resource.url,
				name: resource.title,
				keywords: [resource.title, resource.description],
				onSelect: handleSelection({ url: resource.url, newTab: true }),
			})),
		},
		{
			heading: "Ranks",
			type: "Rank",
			entries: ranks.map((rank) => ({
				id: rankPath(rank.slug),
				name: rank.name,
				keywords: [rank.name, `${rank.name} Rank`, rank.program],
				icon: (
					<img
						src={rank.images.medium}
						alt=""
						className="size-5 object-contain"
					/>
				),
				onSelect: handleSelection({ url: rankPath(rank.slug) }),
			})),
		},
		{
			heading: "Merit Badges",
			type: "Merit Badge",
			entries: meritBadges.map((badge) => ({
				id: meritBadgePath(badge.slug),
				name: badge.name,
				keywords: [badge.name, `${badge.name} Merit Badge`],
				icon: <img src={badge.images.small} alt="" className="size-5" />,
				onSelect: handleSelection({ url: meritBadgePath(badge.slug) }),
			})),
		},
		{
			heading: "Adventures",
			type: "Adventure",
			entries: adventures.map((adventure) => ({
				id: adventurePath(adventure.slug),
				name: adventure.name,
				keywords: [
					adventure.name,
					`${adventure.name} Adventure`,
					adventure.rank.name,
				],
				icon: (
					<img
						src={adventure.images.small}
						alt=""
						className="size-5 object-contain"
					/>
				),
				onSelect: handleSelection({ url: adventurePath(adventure.slug) }),
			})),
		},
		{
			heading: "Site Theme",
			type: "Theme",
			icon: <SunMoonIcon />,
			entries: [
				{
					id: "theme:dark",
					name: "Enable dark mode",
					keywords: ["Enable dark mode", "light mode", "system theme"],
					onSelect: handleSelection(() => setTheme("dark")),
				},
				{
					id: "theme:light",
					name: "Enable light mode",
					keywords: ["Enable light mode", "dark mode", "system theme"],
					onSelect: handleSelection(() => setTheme("light")),
				},
				{
					id: "theme:system",
					name: "Use system theme",
					keywords: ["Use system theme", "dark mode", "light mode"],
					onSelect: handleSelection(() => setTheme("system")),
				},
			],
		},
	];

	return (
		<Command filter={filterByKeywords}>
			<CommandInput
				placeholder="Search..."
				value={search}
				onValueChange={setSearch}
			/>
			<CommandList ref={listRef}>
				<CommandEmpty>No results found.</CommandEmpty>
				{search
					? // while searching, drop the groups so cmdk ranks every match in one list;
						// each item labels its own type instead
						sections.flatMap((section) =>
							section.entries.map((entry) => (
								<PaletteItem
									key={entry.id}
									entry={entry}
									section={section}
									showType
								/>
							)),
						)
					: sections.map((section, i) => (
							<Fragment key={section.heading}>
								{i > 0 && <CommandSeparator />}
								<CommandGroup heading={section.heading}>
									{section.entries.map((entry) => (
										<PaletteItem
											key={entry.id}
											entry={entry}
											section={section}
										/>
									))}
								</CommandGroup>
							</Fragment>
						))}
			</CommandList>
		</Command>
	);
}

/** one palette entry, grouped under a heading or, while searching, ranked in a flat list */
type Entry = {
	/** unique across the whole palette; cmdk uses it as the item's identity */
	id: string;
	name: string;
	/** matched against the search, name first */
	keywords: string[];
	icon?: ReactNode;
	onSelect: () => void;
};

type Section = {
	heading: string;
	/** singular label shown on each entry in the flat search results */
	type: string;
	/** shown on every entry that has no media of its own */
	icon?: ReactNode;
	entries: Entry[];
};

function PaletteItem({
	entry,
	section,
	showType = false,
}: {
	entry: Entry;
	section: Section;
	showType?: boolean;
}) {
	return (
		<CommandItem
			value={entry.id}
			keywords={entry.keywords}
			onSelect={entry.onSelect}
		>
			{entry.icon ?? (
				// same footprint as the size-5 images, so names line up across types
				<span className="text-muted-foreground flex size-5 shrink-0 items-center justify-center">
					{section.icon}
				</span>
			)}
			{entry.name}
			{showType && (
				<CommandShortcut className="shrink-0 tracking-normal">
					{section.type}
				</CommandShortcut>
			)}
		</CommandItem>
	);
}

/**
 * score only the keywords. an item's value is a unique id (usually its url), and cmdk's
 * default filter would otherwise match against that too and blur the ranking
 */
const filterByKeywords: typeof defaultFilter = (
	_value,
	search,
	keywords = [],
) => defaultFilter(keywords.join(" "), search);

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
