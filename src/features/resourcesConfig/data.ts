import type { Resource } from "@/features/resourcesConfig/types";
import { ResourceTypeTags, TopicTags } from "@/features/tagsConfig/data";

export const resources: Resource[] = [
	{
		url: "https://scouting.org",
		metadata: {
			title: "Scouting America Homepage",
			description: "The front page of Scouting America",
		},
		tags: {
			resourceType: [ResourceTypeTags.Homepage],
			topic: [],
		},
	},
	{
		url: "https://scoutingwire.org",
		metadata: {
			title: "Scouting Wire",
			description: "The Official Blog of the Scouting Movement",
		},
		tags: {
			resourceType: [ResourceTypeTags.Blog],
			topic: [],
		},
	},
	{
		url: "https://oa-bsa.org",
		metadata: {
			title: "Order of the Arrow Homepage",
			description: "The front page of Order of the Arrow",
		},
		tags: {
			resourceType: [ResourceTypeTags.Homepage],
			topic: [TopicTags.Oa],
		},
	},
	{
		url: "https://scene.zeplin.io/project/59b6b6554fc4d8840a822300",
		metadata: {
			title: "BSA Digital Design System",
			description: "Style guide for Scouting America branded websites",
		},
		tags: {
			resourceType: [ResourceTypeTags.Reference],
			topic: [],
		},
	},
];
