import type { HandleClientError } from '@sveltejs/kit';

const CHUNK_LOAD_ERROR = /dynamically imported module|Importing a module script failed|module script failed|Failed to fetch/i;

export const handleError: HandleClientError = ({ error, status }) => {
	const message = error instanceof Error ? error.message : String(error);

	if (CHUNK_LOAD_ERROR.test(message)) {
		const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
		if (nav?.type !== 'reload') {
			location.reload();
		}
	}

	return { message: status === 404 ? 'Not Found' : 'Internal Error' };
};
