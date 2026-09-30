import type { APIRoute } from "astro";
import { ingestMeritBadges } from "@/lib/advancement/meritBadges/ingest";
import { ingestRanks } from "@/lib/advancement/ranks/ingest";
import { CRON_SECRET } from "astro:env/server";
import { sendDevDebugEmail } from "@/lib/email/templates/devDebug";

export const prerender = false;

export const GET: APIRoute = async (context) => {
	const authHeader = context.request.headers.get("authorization");

	if (authHeader !== `Bearer ${CRON_SECRET}` && import.meta.env.PROD) {
		return new Response("401 Unauthorized", { status: 401 });
	}

	const [meritBadges, ranks] = await Promise.all([
		ingestMeritBadges(),
		ingestRanks(),
	]);
	const result = { meritBadges, ranks };
	const failed = meritBadges.errors.length > 0 || ranks.errors.length > 0;

	if (failed) {
		await sendDevDebugEmail({
			text: JSON.stringify(
				{ meritBadges: meritBadges.errors, ranks: ranks.errors },
				null,
				"\t",
			),
			subject: "Errors updating advancement",
		});
	}

	return new Response(JSON.stringify(result), {
		headers: {
			"Content-Type": "application/json",
		},
		status: failed ? 500 : 200,
	});
};
