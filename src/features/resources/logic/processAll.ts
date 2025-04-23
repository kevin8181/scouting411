import type { Resource } from "@/features/resourcesConfig/types";
import { processResource } from "@/features/resources/logic/testResource";
import { checkResourcesConfig } from "@/features/resourcesConfig/logic/checkConfig";

/**
 * returns the list of all the processed resources or throws if any fail
 * @throws
 * */
export async function processAll(input: Resource[]) {
	// check that all urls are valid and normalized
	await checkResourcesConfig(input);

	// fetch all the links
	await Promise.all(input.map((config) => processResource(config)));
}
