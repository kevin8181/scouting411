/** sleep for a certain number of milliseconds */
export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
