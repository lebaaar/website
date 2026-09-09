import { env } from '$env/dynamic/private';
import { isValidEmail, MAX_EMAIL, MAX_MESSAGE } from '$lib/validation';
import { json, type RequestHandler } from '@sveltejs/kit';

const MAX_NAME = 100;
// Discord caps an embed field value at 1024 characters; anything longer
// rides along as an attachment instead of being cut off.
const FIELD_LIMIT = 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
	if (recent.length >= MAX_PER_WINDOW) {
		hits.set(ip, recent);
		return true;
	}
	recent.push(now);
	hits.set(ip, recent);

	if (hits.size > 500) {
		for (const [key, times] of hits) {
			if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
		}
	}
	return false;
}

function clean(value: unknown, max?: number) {
	if (typeof value !== 'string') return '';
	const trimmed = value.trim();
	return max === undefined ? trimmed : trimmed.slice(0, max);
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const webhook = env.DISCORD_WEBHOOK_URL;
	if (!webhook) {
		console.error('DISCORD_WEBHOOK_URL is not set');
		return json({ error: 'server' }, { status: 500 });
	}

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'invalid' }, { status: 400 });
	}

	if (clean(body.company, 200)) return json({ ok: true });

	const name = clean(body.name, MAX_NAME);
	const email = clean(body.email, MAX_EMAIL);
	const message = clean(body.message);

	if (!name || !email || !message) return json({ error: 'missing' }, { status: 400 });
	if (!isValidEmail(email)) return json({ error: 'email' }, { status: 400 });
	if (message.length > MAX_MESSAGE) return json({ error: 'long' }, { status: 400 });

	const ip = getClientAddress();
	if (rateLimited(ip)) return json({ error: 'rate' }, { status: 429 });

	const overflows = message.length > FIELD_LIMIT;
	const notice = '\n\n… truncated, full message attached.';

	const payload = {
		username: 'lan.si',
		allowed_mentions: { parse: [] },
		embeds: [
			{
				title: 'New contact form message',
				color: 0x6366f1,
				timestamp: new Date().toISOString(),
				fields: [
					{ name: 'Name', value: name, inline: true },
					{ name: 'Email', value: email, inline: true },
					{
						name: 'Message',
						value: overflows ? message.slice(0, FIELD_LIMIT - notice.length) + notice : message
					}
				],
				footer: { text: `IP: ${ip}` }
			}
		]
	};

	let init: RequestInit;
	if (overflows) {
		const form = new FormData();
		form.append('payload_json', JSON.stringify(payload));
		form.append('files[0]', new Blob([message], { type: 'text/plain' }), 'message.txt');
		init = { method: 'POST', body: form };
	} else {
		init = {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(payload)
		};
	}

	const response = await fetch(webhook, init);

	if (!response.ok) {
		console.error('Discord webhook failed', response.status, await response.text());
		return json({ error: 'server' }, { status: 502 });
	}

	return json({ ok: true });
};
