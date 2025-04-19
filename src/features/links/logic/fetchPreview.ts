import { tryCatch } from "@/util/tryCatch";
import getMetadata from "metadata-scraper";

/**
 * fetch a url and return the parsed metadata for the page. throw if fail or non-200 status code
 * @throws
 */
export async function fetchPreview(url: string) {
	const { data: fetchData, error: fetchError } = await tryCatch(fetchUrl(url));

	if (fetchError) {
		throw new Error(`Failed to fetch url "${url}". ${fetchError.message}`);
	}

	return await parseMetadata(fetchData);
}

/** fetch the url and return the response. throw if the fetch fails or the status code is not 200 */
async function fetchUrl(url: string) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Returned status code ${response.status}.`);
	}

	return response;
}

/** parse a document's metadata from its fetch response */
async function parseMetadata(response: Response) {
	const html = await response.text();

	return await getMetadata({
		html,
		url: response.url,
	});
}
