import { os } from "@orpc/server";
import { queryResources } from "@/lib/resources/query";

export const listResourcesProcedure = os.handler(() => queryResources());
