import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		plugins: { js },
		extends: ["js/recommended"],
	},
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		languageOptions: { globals: globals.browser },
	},
	tseslint.configs.recommended, // todo change to strict and fix errors
	eslintPluginAstro.configs.recommended,
	{
		// eslint-plugin-astro sniffs for @typescript-eslint/parser via cwd-relative
		// resolution, which only succeeds because pnpm's bin shim injects NODE_PATH.
		// Editors and other runners bypass that shim, so astro-eslint-parser silently
		// falls back to espree and fails on TS frontmatter. Set the parser explicitly.
		files: ["**/*.astro"],
		processor: "astro/client-side-ts",
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: [".astro"],
			},
		},
	},
]);
