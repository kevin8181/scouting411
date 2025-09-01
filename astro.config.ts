import { defineConfig, fontProviders, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	adapter: vercel({
		maxDuration: 1000 * 300,
	}),

	site: "https://scouting411.org/",
	devToolbar: { enabled: false },
	trailingSlash: "never",

	experimental: {
		fonts: [
			{
				name: "Roboto Slab",
				provider: fontProviders.fontsource(),
				cssVariable: "--font-roboto-slab",
				weights: [400, 700],
				fallbacks: ["serif"],
			},
			{
				name: "Roboto",
				provider: fontProviders.fontsource(),
				cssVariable: "--font-roboto",
				weights: [100, 400, 700],
				fallbacks: ["sans-serif"],
			},
			{
				name: "Montserrat",
				provider: fontProviders.fontsource(),
				cssVariable: "--font-montserrat",
				weights: [800],
				fallbacks: ["sans-serif"],
			},
		],
	},

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [
		sitemap({
			xslURL: "/xslt/sitemap.xslt",
		}),
		react(),
	],

	env: {
		schema: {
			UPSTASH_REDIS_REST_URL: envField.string({
				context: "server",
				access: "secret",
				startsWith: "https://",
			}),

			UPSTASH_REDIS_REST_TOKEN: envField.string({
				context: "server",
				access: "secret",
			}),
		},
	},
});
