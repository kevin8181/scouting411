import type { HubConfig } from "@/lib/hubs/types";

export const hubsConfig: HubConfig[] = [
	{
		slug: "scouts-bsa",
		name: "Scouts BSA",
		description: "Scouting's troop program for ages 11 through 17.",
		color: "#AD9D7B",
		newsSources: [
			"scouts-bsa-program-updates",
			"troop-leader-resource-updates",
			"scoutcast",
		],
	},
	{
		slug: "cub-scouts",
		name: "Cub Scouts",
		description: "Scouting's program for kindergarten through fifth grade.",
		color: "#FCD116",
		newsSources: ["cub-scouts-program-updates", "cubchat", "cubcast"],
	},
	{
		slug: "order-of-the-arrow",
		name: "Order of the Arrow",
		description: "Scouting's national honor society.",
		color: "#E31837",
		newsSources: ["oa-news", "oa-lodgemaster", "oa-system-maintenance"],
	},
	{
		slug: "sea-scouts",
		name: "Sea Scouts",
		description: "Scouting's high-adventure program on the water.",
		color: "#003366",
		newsSources: [
			"sea-scouts-news",
			"sea-scouts-program-updates",
			"the-lookout",
		],
	},
	{
		slug: "alumni",
		name: "Alumni & NESA",
		description:
			"Scouting's alumni network and the National Eagle Scout Association.",
		color: "#003F87",
		newsSources: [
			"nesa",
			"nesa-events",
			"scouting-alumni",
			"scouting-alumni-chair",
			"scouting-alumni-highlights",
		],
	},
];
