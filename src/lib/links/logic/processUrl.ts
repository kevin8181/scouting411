import z from "zod";

/** given a string, validate that it's a valid, normalized, non-dead, non-redirected url */
export async function processUrl(url: string) {
	//check if the string is a url
	checkIfUrl(url);

	//check if the link passes normalization rules

	//attempt to fetch the link

	//throw if a fetch fails or the status code is not 200

	//return the fetched page contents

	return {
		url,
	};
}

/** check if the string is a url */
function checkIfUrl(url: string) {
	z.url(url).parse(url);
}
