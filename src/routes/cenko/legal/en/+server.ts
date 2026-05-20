import { legalDataEn } from '$lib/cenko/constants';

export function GET() {
	return new Response(JSON.stringify(legalDataEn), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
