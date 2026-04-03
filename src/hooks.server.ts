import { paraglideMiddleware } from '$paraglide/server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) =>
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	paraglideMiddleware(event.request, ({ request, locale: _locale }) => {
		event.request = request;
		return resolve(event);
	});
