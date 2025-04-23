import { processAll } from "@/features/resources/logic/processAll";
import { resources } from "@/features/resourcesConfig/data";

//todo put this into the astro content layer for caching
export async function getResources() {
	await processAll(resources);

	return resources;
}
