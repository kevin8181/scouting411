import { os } from "@orpc/server";
import { getFeedConsumerOutput } from "@/lib/news/feeds/consumerOutput";

/** metadata and content-quality stats for every feed. returns no posts */
export const listFeedsProcedure = os.handler(() => getFeedConsumerOutput());
