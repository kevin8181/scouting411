import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/util/cn";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DarkModeControl() {
	const [theme, setThemeState] = React.useState<
		"theme-light" | "dark" | "system"
	>("theme-light");

	React.useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains("dark");
		setThemeState(isDarkMode ? "dark" : "theme-light");
	}, []);

	React.useEffect(() => {
		const isDark =
			theme === "dark" ||
			(theme === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);
		document.documentElement.classList[isDark ? "add" : "remove"]("dark");
	}, [theme]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-full">
				<SidebarMenuButton
					className={cn(
						"h-auto justify-between gap-2.5 rounded-md border-transparent px-3 py-2 text-sm font-normal outline-none",
						"hover:bg-blue/8",
						"data-active:bg-blue/12 data-active:text-blue data-active:font-bold",
					)}
					render={
						<button>
							<div className="flex items-center gap-2">
								<FontAwesomeIcon
									icon={theme === "theme-light" ? faSun : faMoon}
									height={"1em"}
								/>
								{theme === "theme-light" ? "Light" : "Dark"} Mode
							</div>
						</button>
					}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setThemeState("theme-light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setThemeState("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setThemeState("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
