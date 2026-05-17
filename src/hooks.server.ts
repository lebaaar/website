import { paraglideMiddleware } from '$paraglide/server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) =>
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	paraglideMiddleware(event.request, async ({ request, locale: _locale }) => {
		event.request = request;
		const response = await resolve(event);
		if (event.url.pathname.startsWith('/cenko')) {
			response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nositelinkssearchbox');
		}
		return response;
	});
