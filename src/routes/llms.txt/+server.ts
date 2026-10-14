import * as m from '$lib/paraglide/messages';
import { PROJECTS } from '$lib/projects';
import { EMAIL, KNOWS_ABOUT, PROFILES, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '$lib/seo';

// https://llmstxt.org — a Markdown summary of the site for LLMs. Always English: it is prerendered
// once, and the cookie that picks the locale does not exist at build time.
const en = { locale: 'en' } as const;

const services = [
	[m.contact_service1_title, m.contact_service1_desc],
	[m.contact_service2_title, m.contact_service2_desc],
	[m.contact_service3_title, m.contact_service3_desc],
	[m.contact_service4_title, m.contact_service4_desc]
] as const;

function project(p: (typeof PROJECTS)[number]): string {
	const links = [p.link && `[website](${p.link})`, p.github && `[source](${p.github})`]
		.filter(Boolean)
		.join(', ');
	const tech = p.technologies.filter((t) => t !== 'Play Store').join(', ');
	return `- **${p.title}**: ${p.description({}, en)} Built with ${tech}.${links ? ` Links: ${links}.` : ''}`;
}

export function GET() {
	const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${m.about_para1_prefix({}, en)}${m.about_para1_word1({}, en)}${m.about_para1_sep1({}, en)}${m.about_para1_word2({}, en)}${m.about_para1_sep2({}, en)}${m.about_para1_word3({}, en)}${m.about_para1_suffix({}, en)}

${m.about_para2_prefix({}, en)} Loftware${m.about_para2_middle({}, en)} the University of Ljubljana, Faculty of Computer and Information Science${m.about_para2_suffix({}, en)}

## Experience

- **${m.exp_role({}, en)}, [Loftware](https://www.loftware.com)** (${m.exp_period({}, en)}): ${m.exp_description({}, en)}

## Services

${m.contact_lead({}, en)}

${services.map(([title, desc]) => `- **${title({}, en)}**: ${desc({}, en)}`).join('\n')}

## Skills

${KNOWS_ABOUT.join(', ')}

## Projects

${PROJECTS.map(project).join('\n')}

## Contact

- Email: [${EMAIL}](mailto:${EMAIL})
- Contact form: [${SITE_URL}/#contact](${SITE_URL}/#contact)
- GitHub: [${PROFILES.github}](${PROFILES.github})
- LinkedIn: [${PROFILES.linkedin}](${PROFILES.linkedin})
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
}

export const prerender = true;
