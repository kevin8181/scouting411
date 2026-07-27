import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
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
			<DropdownMenuTrigger
				render={
					<Button variant="outline" size="icon-sm">
						<Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
						<Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				}
			></DropdownMenuTrigger>
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
