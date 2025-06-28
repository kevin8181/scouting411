import { CardList } from "@/components/react/cardList";
import { resources } from "@/features/resources/data";
import { Resource } from "@/components/react/resource";

export function ResourcesPage() {
	return (
		<CardList>
			{resources.map((resource) => (
				<Resource resource={resource} key={resource.url} />
			))}
		</CardList>
	);
}
