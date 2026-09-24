export const prerender = false;

import { router } from "@/rpc/router";
import type { APIRoute } from "astro";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";

const handler = new RPCHandler(router, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

export const ALL: APIRoute = async ({ request }) => {
	const { response } = await handler.handle(request, { prefix: "/rpc" });

	return response ?? new Response("Not found", { status: 404 });
};
