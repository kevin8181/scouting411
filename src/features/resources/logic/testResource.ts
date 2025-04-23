import type { Resource } from "@/features/resourcesConfig/types";
import { tryCatch } from "@/util/tryCatch";

export async function processResource(config: Resource) {
	const { error } = await tryCatch(fetchResource(config.url));

	if (error) {
		throw new Error(error.message);
	}
}

/**
 * fetch a url and return the parsed metadata for the page. throw if fail or non-200 status code
 * @throws
 */
export async function fetchResource(url: string) {
	const { error } = await tryCatch(fetchUrl(url));

	if (error) {
		throw new Error(`Failed to fetch url "${url}". ${error.message}`);
	}
}

/** fetch the url and return the response. throw if the fetch fails or the status code is not 200 */
async function fetchUrl(url: string) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Returned status code ${response.status}.`);
	}

	return response;
}
