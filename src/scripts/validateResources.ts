import type { Resource } from "@/features/resourcesConfig/types";
import { processResource } from "@/features/resources/logic/testResource";
import { arrayHasDupes } from "@/util/arrayDupeCheck";

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

import z from "zod";
import normalizeUrl from "normalize-url";

/**
 * given a string, check that it's a valid, normalized url. throw if not.
 * @throws
 */
export async function validateUrl(url: string) {
	if (validate(url).error) {
		throw new Error(`URL failed Zod validation: "${url}".`);
	}

	const normalized = normalize(url);
	//check if the link passes normalization rules
	if (normalized !== url) {
		throw new Error(
			`URL failed normalization rules: "${url}". Normalized to "${normalized}".`,
		);
	}
}

/** check if the string is a url */
function validate(url: string) {
	return z.url(url).safeParse(url);
}

/** return the normalized version of the url passed */
function normalize(url: string) {
	return normalizeUrl(url, {
		defaultProtocol: "https",
		forceHttps: true,
		stripHash: true,
		removeQueryParameters: true,
		removeDirectoryIndex: true,
		removeExplicitPort: true,
	});
}
