import { CardFeed } from "@/components/react/cardFeed";
import { resources } from "@/lib/resources/data";
import { Resource } from "@/components/react/resource";

export function Page() {
	return (
		<CardFeed>
			{resources.map((resource) => (
				<Resource resource={resource} key={resource.url} />
			))}
		</CardFeed>
	);
}
