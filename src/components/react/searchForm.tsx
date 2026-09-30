import { SearchIcon } from "lucide-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/util/cn";

/** a plain get form to the search page, so it works without javascript */
export function SearchForm({
	query,
	className,
}: {
	/** the current query, to fill in the box */
	query?: string;
	className?: string;
}) {
	return (
		<form
			action="/search"
			method="get"
			role="search"
			className={cn("w-full", className)}
		>
			<InputGroup className="h-11">
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
				<InputGroupInput
					name="q"
					type="search"
					defaultValue={query}
					placeholder="Search..."
					aria-label="Search"
					required
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton type="submit" variant="default" size="sm">
						Search
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</form>
	);
}
