import React from "react";

export function NavGroup({
	label,
	children,
}: {
	label?: string;
	children: React.ReactNode;
}) {
	return (
		<nav className="flex flex-col gap-1 px-3 pb-3">
			{label && (
				<h3 className="text-brand-gray-8 pl-3 text-[0.78rem]">{label}</h3>
			)}

			<ul className="flex flex-col gap-[3px]">
				{React.Children.map(children, (child) => {
					return <li>{child}</li>;
				})}
			</ul>
		</nav>
	);
}
