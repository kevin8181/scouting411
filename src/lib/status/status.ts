import { z } from "zod";

/** status.scouting.org is an uptime kuma instance; this is its status page's slug */
const baseUrl = "https://status.scouting.org";
const slug = "scouting";

/** uptime kuma's heartbeat codes */
const heartbeatStatuses = {
	0: "down",
	1: "up",
	2: "pending",
	3: "maintenance",
} as const;

const monitorStatusSchema = z.enum([
	...Object.values(heartbeatStatuses),
	// a monitor with no heartbeats yet
	"unknown",
]);

export const systemStatusSchema = z.object({
	/** false if any monitor's latest heartbeat is down */
	operational: z.boolean(),
	monitors: z.array(
		z.object({
			name: z.string(),
			status: monitorStatusSchema,
		}),
	),
	url: z.url(),
});

type SystemStatus = z.infer<typeof systemStatusSchema>;

/**
 * how long a result is reused. unlike news and advancement, status is read live rather
 * than from a cron-filled cache - a day-old status is useless - so this keeps a busy
 * homepage from hitting upstream on every view. it's per serverless instance, which is
 * close enough
 */
const maxAgeMs = 60_000;
let cached: { status: SystemStatus; fetchedAt: number } | undefined;

/** the current state of every monitor on status.scouting.org */
export async function getSystemStatus(): Promise<SystemStatus> {
	if (cached && Date.now() - cached.fetchedAt < maxAgeMs) return cached.status;

	// the page lists the monitors by name, and the heartbeats say which are up
	const [page, heartbeats] = await Promise.all([
		fetchJson(`/api/status-page/${slug}`, statusPageSchema),
		fetchJson(`/api/status-page/heartbeat/${slug}`, heartbeatSchema),
	]);

	const monitors = page.publicGroupList
		.flatMap((group) => group.monitorList)
		.map((monitor) => {
			// heartbeats come back oldest first
			const latest = heartbeats.heartbeatList[monitor.id]?.at(-1);

			return {
				name: monitor.name.trim(),
				status: latest ? heartbeatStatuses[latest.status] : "unknown",
			} as const;
		});

	const status = {
		operational: monitors.every((monitor) => monitor.status !== "down"),
		monitors,
		url: baseUrl,
	};

	cached = { status, fetchedAt: Date.now() };

	return status;
}

async function fetchJson<T extends z.ZodType>(path: string, schema: T) {
	const url = new URL(path, baseUrl).toString();
	const response = await fetch(url);

	if (response.status !== 200) {
		throw new Error(`failed to fetch ${url} - status code ${response.status}`);
	}

	return schema.parse(await response.json());
}

const statusPageSchema = z.object({
	publicGroupList: z.array(
		z.object({
			monitorList: z.array(z.object({ id: z.number(), name: z.string() })),
		}),
	),
});

const heartbeatSchema = z.object({
	/** keyed by monitor id */
	heartbeatList: z.record(
		z.string(),
		z.array(z.object({ status: z.literal([0, 1, 2, 3]) })),
	),
});
