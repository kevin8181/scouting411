export function CardFeed({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex justify-center">
			<div className="flex w-full max-w-4xl flex-col justify-stretch gap-5">
				{children}
			</div>
		</div>
	);
}
