import type { LinkConfig } from "@/features/content/types";
import { validateUrl } from "@/features/content/logic/validateUrl";
import { arrayHasDupes } from "@/util/arrayDupeCheck";

/**
 * verifies the links config is valid and normalized
 * @throws
 * */
export async function checkLinksConfig(input: LinkConfig[]) {
	// check that all urls are valid and normalized
	for (const link of input) {
		await validateUrl(link.url);
	}

	// check that all urls are different
	if (arrayHasDupes(input)) {
		throw new Error("Duplicate URLs found.");
	}
}
