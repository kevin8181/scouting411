import { CardFeed } from "@/components/react/cardFeed";
import { resources } from "@/lib/resources/config";
import { Resource } from "@/components/react/resource";
import { SecondarySidebar } from "@/components/layout/sidebar/secondarySidebar";

export function Page() {
	return (
		<SecondarySidebar sidebar={<></>}>
			<div className="flex flex-1 flex-col gap-5 p-8">
				<CardFeed>
					{resources.map((resource) => (
						<Resource resource={resource} key={resource.url} />
					))}
				</CardFeed>
			</div>
		</SecondarySidebar>
	);
}
