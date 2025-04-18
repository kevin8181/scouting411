import type { LinkConfig } from "@/lib/links/types";
import { validateUrl } from "@/lib/links/logic/validateUrl";
import { arrayHasDupes } from "@/lib/util/arrayDupeCheck";

export async function checkAll(input: LinkConfig[]) {
	// check that all urls are valid and normalized
	for (const link of input) {
		await validateUrl(link.url);
	}

	// check that all urls are different
	if (arrayHasDupes(input)) {
		throw new Error("Duplicate URLs found.");
	}

	return input;
}
