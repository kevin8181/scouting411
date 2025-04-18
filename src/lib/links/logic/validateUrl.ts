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

/** return the normalized version of the url */
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
