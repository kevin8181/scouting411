import type { Resource } from "@/features/resourcesConfig/types";
import { validateUrl } from "@/features/resourcesConfig/logic/validateUrl";
import { arrayHasDupes } from "@/util/arrayDupeCheck";

/**
 * verifies the links config is valid and normalized
 * @throws
 * */
export async function checkResourcesConfig(input: Resource[]) {
	// check that all urls are valid and normalized
	for (const link of input) {
		await validateUrl(link.url);
	}

	// check that all urls are different
	if (arrayHasDupes(input)) {
		throw new Error("Duplicate URLs found.");
	}
}
