export function arrayHasDupes<T>(array: T[]) {
	return new Set(array).size !== array.length;
}
