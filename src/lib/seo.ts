export const SITE_URL = 'https://lan.si';

export const SITE_NAME = 'Lan Lebar';

/** Meta description, also the summary line of /llms.txt. Keep it under ~160 characters. */
export const SITE_DESCRIPTION =
	'Lan Lebar is a full-stack software developer from Slovenia who designs and builds websites, web applications and mobile apps.';

export const EMAIL = 'hello@lan.si';

export const PROFILES = {
	github: 'https://github.com/lebaaar',
	linkedin: 'https://www.linkedin.com/in/lan-lebar'
};

export const KNOWS_ABOUT = [
	'Web development',
	'Web application development',
	'Mobile app development',
	'UI/UX design',
	'Search engine optimization',
	'SvelteKit',
	'TypeScript',
	'Angular',
	'Vue',
	'Flutter',
	'.NET',
	'Go',
	'Node.js',
	'PostgreSQL',
	'Cloudflare Workers',
	'AWS',
	'Azure',
	'Docker'
];

export const PROJECT_SLUGS = [
	'domacahrana',
	'hisamarinic',
	'cenko',
	'doomwalk',
	'potegnime',
	'librelock',
	'periodtracker',
	'companies',
	'undefined',
	'amadejvidner',
	'ajdahozjan',
	'kavarna',
	'shapers'
] as const;

export function ogImage(pathname: string): string {
	const slug = pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
	return slug && PROJECT_SLUGS.includes(slug as (typeof PROJECT_SLUGS)[number])
		? `${SITE_URL}/og/${slug}.png`
		: `${SITE_URL}/og-image.png`;
}

/** schema.org graph for the home page: the site, the profile page and the person it is about. */
export function homeJsonLd(): Record<string, unknown> {
	const person = `${SITE_URL}/#person`;
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				url: SITE_URL,
				name: SITE_NAME,
				description: SITE_DESCRIPTION,
				inLanguage: ['en', 'sl'],
				publisher: { '@id': person }
			},
			{
				'@type': 'ProfilePage',
				'@id': `${SITE_URL}/#profile`,
				url: SITE_URL,
				name: SITE_NAME,
				isPartOf: { '@id': `${SITE_URL}/#website` },
				mainEntity: { '@id': person }
			},
			{
				'@type': 'Person',
				'@id': person,
				name: SITE_NAME,
				givenName: 'Lan',
				familyName: 'Lebar',
				url: SITE_URL,
				image: `${SITE_URL}/me.jpeg`,
				email: `mailto:${EMAIL}`,
				jobTitle: 'Full-Stack Software Developer',
				description: SITE_DESCRIPTION,
				worksFor: { '@type': 'Organization', name: 'Loftware', url: 'https://www.loftware.com' },
				alumniOf: {
					'@type': 'CollegeOrUniversity',
					name: 'University of Ljubljana, Faculty of Computer and Information Science',
					url: 'https://fri.uni-lj.si/'
				},
				address: { '@type': 'PostalAddress', addressCountry: 'SI' },
				knowsLanguage: ['en', 'sl'],
				knowsAbout: KNOWS_ABOUT,
				sameAs: [PROFILES.github, PROFILES.linkedin]
			}
		]
	};
}
