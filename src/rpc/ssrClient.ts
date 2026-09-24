import { createRouterClient } from "@orpc/server";
import { router } from "@/rpc/router";

if (typeof window !== "undefined") {
	throw new Error("This file should not be imported in the browser");
}

globalThis.$client = createRouterClient(router);
