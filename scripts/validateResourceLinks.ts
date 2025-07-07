import { arrayHasDupes } from "@/util/arrayDupeCheck";
import { tryCatch } from "@/util/tryCatch";
import z from "zod";
import normalize from "normalize-url";
import { resources } from "@/features/resources/data";

// get all the resource urls
const urls = resources.map((link) => link.url);

// check that all urls are valid and normalized
for (const url of urls) {
	validateUrl(url);
}
console.log("All URLs are valid and normalized.");

// check that all urls are different
if (arrayHasDupes(urls)) {
	throw new Error("Duplicate URLs found.");
}
console.log("All URLs are unique.");

// check that all the urls are online
await Promise.all(resources.map((config) => checkUrlStatus(config.url)));
console.log("All URLs are online.");

/**
 * fetch a url and throw if it fails or returns a non-200 response code
 * @throws
 */
async function checkUrlStatus(url: string) {
	const { data, error } = await tryCatch(fetch(url));

	if (error) {
		throw new Error(`Failed to fetch url "${url}". Error: ${error.message}`);
	}

	if (data.status !== 200) {
		throw new Error(
			`Failed to fetch url "${url}". Status code: ${data.status}`,
		);
	}
}

/**
 * given a string, check that it's a valid, normalized url. throw if not.
 * @throws
 */
function validateUrl(url: string) {
	if (z.url(url).safeParse(url).error) {
		throw new Error(`URL failed Zod validation: "${url}".`);
	}

	const normalized = normalizeUrl(url);
	//check if the link passes normalization rules
	if (normalized !== url) {
		throw new Error(
			`URL failed normalization rules: "${url}". Normalized to "${normalized}".`,
		);
	}
}

/** return the normalized version of the url passed */
function normalizeUrl(url: string) {
	return normalize(url, {
		defaultProtocol: "https",
		forceHttps: true,
		stripHash: true,
		removeQueryParameters: true,
		removeDirectoryIndex: true,
		removeExplicitPort: true,
	});
}
