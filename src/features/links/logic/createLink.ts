import type { Link } from "@/features/links/types";
import type { LinkConfig } from "@/features/content/types";
import { fetchPreview } from "@/features/links/logic/fetchPreview";
import { tryCatch } from "@/util/tryCatch";
import type { MetaData } from "metadata-scraper";

export async function processLink(config: LinkConfig): Promise<Link> {
	const { data: metadata, error: fetchError } = await tryCatch(
		fetchPreview(config.url),
	);

	if (fetchError) {
		throw new Error(fetchError.message);
	}

	return createLink({ config, metadata });
}

/** combines a link config with fetched metadata to make a Link */
function createLink({
	config,
	metadata,
}: {
	config: LinkConfig;
	metadata: MetaData;
}): Link {
	// this is just here to make the editor happy.
	//todo do I need the metadata parser at all?
	metadata.title = config.metadata.title;

	return config;
}
