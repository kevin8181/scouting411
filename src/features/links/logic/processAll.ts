import type { Link } from "@/features/links/types";
import type { LinkConfig } from "@/features/content/types";
import { processLink } from "@/features/links/logic/createLink";
import { checkLinksConfig } from "@/features/content/logic/checkConfig";

/**
 * returns the list of all the processed links or throws if any fail
 * @throws
 * */
export async function processAll(input: LinkConfig[]): Promise<Link[]> {
	// check that all urls are valid and normalized
	await checkLinksConfig(input);

	// fetch and process all the links and their metadata
	const processedLinks = await Promise.all(
		input.map((config) => processLink(config)),
	);

	return processedLinks;
}
