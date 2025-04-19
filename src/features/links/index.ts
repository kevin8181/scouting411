import { processAll } from "@/features/links/logic/processAll";
import { linksConfig } from "@/features/content/data/links";
import type { Link } from "@/features/links/types";

let data: Link[] = [];

export async function links() {
	if (!data.length) {
		data = await processAll(linksConfig);
	}

	return data;
}
