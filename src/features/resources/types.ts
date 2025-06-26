import type { UrlShaped } from "@/util/utilTypes";
import { ResourceTypeTags, TopicTags } from "@/features/tagsConfig/data";
import type { TagOf } from "@/features/tagsConfig/types";

export interface Resource {
	url: UrlShaped;
	title: string;
	description: string;
	tags: {
		resourceType: TagOf<typeof ResourceTypeTags>[];
		topic: TagOf<typeof TopicTags>[];
	};
}
