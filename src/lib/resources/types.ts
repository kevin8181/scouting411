import { z } from "zod";

export type Resource = z.infer<typeof resourceSchema>;
export const resourceSchema = z.object({
	url: z.url(),
	title: z.string(),
	description: z.string(),
});
