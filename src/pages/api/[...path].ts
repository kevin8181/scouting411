export const prerender = false;

import type { APIRoute } from "astro";
import { onError } from "@orpc/server";
import { OpenAPIGenerator } from "@orpc/openapi";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferenceHandlerPlugin } from "@orpc/openapi/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
import { router } from "@/rpc/router";

const generator = new OpenAPIGenerator({
	converters: [new ZodToJsonSchemaConverter()],
});

const handler = new OpenAPIHandler(router, {
	plugins: [
		new OpenAPIReferenceHandlerPlugin({
			providerConfig: {
				telemetry: false,
			},
			spec: () =>
				generator.generate(router, {
					base: {
						info: { title: "Scouting411 API", version: "1.0.0" },
						servers: [{ url: "/api" }],
					},
				}),
		}),
	],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

export const ALL: APIRoute = async ({ request }) => {
	const { response } = await handler.handle(request, { prefix: "/api" });

	return response ?? new Response("Not found", { status: 404 });
};
