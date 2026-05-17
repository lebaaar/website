import { legalData } from '$lib/cenko/constants';

export function GET() {
	return new Response(JSON.stringify(legalData), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
