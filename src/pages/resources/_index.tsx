import { CardList } from "@/components/react/cardList";
import { resources } from "@/lib/resources/data";
import { Resource } from "@/components/react/resource";

export function Page() {
	return (
		<CardList>
			{resources.map((resource) => (
				<Resource resource={resource} key={resource.url} />
			))}
		</CardList>
	);
}
