import { queryPostsTool } from "@/mcp/tools/news/posts";
import { getFeedsTool } from "@/mcp/tools/news/feeds";
import { queryResourcesTool } from "@/mcp/tools/resources/resources";

export const tools = [queryPostsTool, getFeedsTool, queryResourcesTool];
