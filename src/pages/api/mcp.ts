export const prerender = false;

import type { APIRoute } from "astro";
import { mcpHandler } from "@/lib/mcp/server";

export const ALL: APIRoute = ({ request }) => mcpHandler.fetch(request);
