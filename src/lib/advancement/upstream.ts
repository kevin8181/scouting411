import { z } from "zod";

const baseUrl = "https://api.scouting.org/advancements";

/** fetch a path from the scouting america advancement api and validate it against a schema */
export async function fetchUpstream<T extends z.ZodType>(
	path: string,
	schema: T,
): Promise<z.infer<T>> {
	const url = `${baseUrl}${path}`;
	const response = await fetch(url);

	if (response.status !== 200) {
		throw new Error(`failed to fetch ${url} - status code ${response.status}`);
	}

	return schema.parse(await response.json());
}

/**
 * ranks, merit badges, and awards stringify their booleans as "True" / "False".
 * adventures return real booleans, so don't reach for this there
 */
export const upstreamBool = z
	.enum(["True", "False"])
	.transform((value) => value === "True");
