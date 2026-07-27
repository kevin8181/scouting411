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

import { feeds } from "@/lib/news/feeds/feedManager";
import { resources } from "@/lib/resources/config";

export function CommandPalette() {
	return (
		<CommandDialog open={true} onOpenChange={() => {}}>
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
	);
}
