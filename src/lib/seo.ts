export const SITE_URL = 'https://lan.si';

export const PROJECT_SLUGS = [
	'domacahrana',
	'cenko',
	'potegnime',
	'librelock',
	'periodtracker',
	'companies',
	'amadejvidner',
	'kavarna',
	'shapers'
] as const;

export function ogImage(pathname: string): string {
	const slug = pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
	return slug && PROJECT_SLUGS.includes(slug as (typeof PROJECT_SLUGS)[number])
		? `${SITE_URL}/og/${slug}.png`
		: `${SITE_URL}/og-image.png`;
}
