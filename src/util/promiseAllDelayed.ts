import { sleep } from "@/util/sleep";

/** resolves an array of async functions, but spaces out the calls by a given interval */
export async function promiseAllDelayed<R>(
	/** an array of async functions to call	*/
	functions: Array<() => Promise<R>>,

	/** the number of milliseconds to wait between each call */
	interval: number,
): Promise<R[]> {
	const tasks = functions.map((fn, i) => sleep(i * interval).then(() => fn()));
	return Promise.all(tasks);
}
