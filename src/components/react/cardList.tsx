export function CardList({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex justify-center p-8">
			<div className="flex w-full max-w-5xl flex-col justify-stretch gap-5">
				{children}
			</div>
		</div>
	);
}
