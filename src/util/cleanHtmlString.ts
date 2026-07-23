import he from "he";
import sanitizeHtml from "sanitize-html";

/** clean up a string which may contain html tags and entities */
export function cleanHtmlString(html: string) {
	// sanitize the html
	const stripped = sanitizeHtml(html, {
		allowedTags: [],
	});

	// decode any html entities present (e.g. &amp;)
	return he.decode(stripped);
}
