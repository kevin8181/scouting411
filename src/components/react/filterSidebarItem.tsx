export function FilterSidebarItem({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-3 p-3">
			<span className="text-gray-5 text-xs font-bold uppercase">{label}</span>
			{children}
		</div>
	);
}
