import he from "he";

/** clean up a string which may contain html tags and entities */
export function cleanHtmlString(html: string): string {
	// decode any html entities present (e.g. &amp;)
	return he.decode(html);

	// todo strip out / render out html tags
}
