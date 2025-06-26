import type { UrlShaped } from "@/util/utilTypes";
import { ResourceTypeTags, TopicTags } from "@/features/resources/tags";

export interface Resource {
	url: UrlShaped;
	title: string;
	description: string;
	tags: {
		resourceType: TagOf<typeof ResourceTypeTags>[];
		topic: TagOf<typeof TopicTags>[];
	};
}

type Tag<T extends string> = {
	id: T;
	displayName: string;
};

export type TagCollection = {
	[T in string]: Tag<T>;
};

type TagOf<T = TagCollection> = T[keyof T];
