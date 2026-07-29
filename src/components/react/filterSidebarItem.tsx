export function FilterSidebarItem({
	label,
	children,
	accessory,
}: {
	label: string;
	children: React.ReactNode;
	accessory?: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-3 p-3">
			<div className="flex items-center gap-2 justify-between">
				<span className="text-muted-foreground text-xs font-bold uppercase">
					{label}
				</span>
				{accessory}
			</div>
			{children}
		</div>
	);
}
