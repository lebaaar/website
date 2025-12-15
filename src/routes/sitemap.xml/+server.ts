const site = 'https://lan.si';

const pages = [
	''
];

export function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
            .map(
                (page) => `<url>
                <loc>${site}${page ? `/${page}` : ''}</loc>
                <priority>${page === '' ? '1.0' : '0.8'}</priority>
            </url>`
            ).join('\n')}
        </urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}

export const prerender = true;
