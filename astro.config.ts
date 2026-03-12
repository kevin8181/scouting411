import { defineConfig, fontProviders, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	site: "https://scouting411.org",
	trailingSlash: "never",

	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		sitemap({
			xslURL: "/xslt/sitemap.xslt",
		}),
		react(),
	],
	adapter: vercel({
		maxDuration: 300,
	}),

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

			// vercel.com/docs/cron-jobs/manage-cron-jobs?framework=other#securing-cron-jobs
			/** token to secure the vercel cron job that updates all the upstream feeds. */
			CRON_SECRET: envField.string({
				context: "server",
				access: "secret",
			}),
		},
	},

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

	devToolbar: { enabled: false },
});
