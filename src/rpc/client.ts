import type { RouterClient } from "@orpc/server";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { router } from "@/rpc/router";

if (import.meta.env.SSR) {
	await import("@/rpc/ssrClient");
}

declare global {
	var $client: RouterClient<typeof router> | undefined;
}

const link = new RPCLink({
	url: "/rpc",
	origin: () => {
		if (typeof window === "undefined") {
			throw new Error("This link is not allowed on the server side.");
		}

		return window.location.origin;
	},
});

/**
 * Fall back to a browser client when no SSR client is registered.
 */
export const client: RouterClient<typeof router> =
	globalThis.$client ?? createORPCClient(link);
