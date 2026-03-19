/** turns a JSON object into a string, pretty-printed with tabs */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsonPrettyPrint(obj: any) {
	return JSON.stringify(obj, null, "\t");
}
