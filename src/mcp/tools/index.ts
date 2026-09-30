import { queryPostsTool } from "@/mcp/tools/news/posts";
import { getFeedsTool } from "@/mcp/tools/news/feeds";
import { queryResourcesTool } from "@/mcp/tools/resources/resources";
import {
	getMeritBadgeTool,
	listMeritBadgesTool,
} from "@/mcp/tools/advancement/meritBadges";

export const tools = [
	queryPostsTool,
	getFeedsTool,
	queryResourcesTool,
	listMeritBadgesTool,
	getMeritBadgeTool,
];
