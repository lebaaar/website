import * as m from '$lib/paraglide/messages';
import type { Locale } from '$lib/paraglide/runtime';
import domacahrana from '$lib/assets/domacahrana.png';
import hisamarinic from '$lib/assets/hisamarinic.png';
import potegnime from '$lib/assets/potegnime.webp';
import doomwalk from '$lib/assets/doomwalk.webp';
import periodTracker from '$lib/assets/period_tracker.webp';
import librelock from '$lib/assets/librelock.svg';
import cenko from '$lib/assets/cenko.png';
import kavarna from '$lib/assets/kavarna.webp';
import companies from '$lib/assets/companies.webp';
import undefinedIcon from '$lib/assets/undefined.webp';
import amadejvidner from '$lib/assets/amadejvidner.webp';
import ajdahozjan from '$lib/assets/ajdahozjan.webp';
// import globalShapers from '$lib/assets/globalshapers.png';
// import domainForSale from '$lib/assets/domain-for-sale.svg';

export const TABS = ['featured', 'webapp', 'website', 'mobile'] as const;
export type ProjectTab = (typeof TABS)[number];

export interface Project {
	title: string;
	description: (inputs?: object, options?: { locale?: Locale }) => string;
	tabs: ProjectTab[];
	technologies?: string[];
	slug?: string;
	link?: string;
	github?: string;
	radius?: string;
	iconImage?: string;
}

/** Shared by the home page's project grid and /llms.txt. */
export const PROJECTS: Project[] = [
	{
		title: 'LibreLock',
		description: m.project_librelock_desc,
		tabs: ['featured', 'webapp'],
		technologies: ['Vue', 'Go', 'SQLite', 'Docker'],
		slug: 'librelock',
		github: 'https://github.com/LibreLock',
		iconImage: librelock
	},
	{
		title: 'Hiša Marinič',
		description: m.project_hisamarinic_desc,
		tabs: ['featured', 'webapp'],
		slug: 'hisamarinic',
		link: 'https://hisamarinic.si',
		iconImage: hisamarinic
	},
	{
		title: 'Domača Hrana',
		description: m.project_domacahrana_desc,
		tabs: ['featured', 'webapp'],
		technologies: ['SvelteKit', 'Tailwind CSS', 'Cloudflare'],
		slug: 'domacahrana',
		link: 'https://domacahrana.si',
		iconImage: domacahrana
	},
	{
		title: 'Amadej Vidner',
		description: m.project_amadejvidner_desc,
		tabs: ['featured', 'website'],
		slug: 'amadejvidner',
		link: 'https://amadejvidner.com',
		radius: 'rounded-sm',
		iconImage: amadejvidner
	},
	{
		title: 'DoomWalk',
		description: m.project_doomwalk_desc,
		tabs: ['featured', 'mobile'],
		technologies: ['Flutter', 'Kotlin', 'Play Store'],
		slug: 'doomwalk',
		github: 'https://github.com/lebaaar/doomwalk',
		iconImage: doomwalk
	},
	{
		title: 'Ajda Hozjan',
		description: m.project_ajdahozjan_desc,
		tabs: ['featured', 'website'],
		slug: 'ajdahozjan',
		link: 'https://ajdahozjan.eu',
		radius: 'rounded-sm',
		iconImage: ajdahozjan
	},
	{
		title: 'companies.si',
		description: m.project_companies_desc,
		tabs: ['featured', 'webapp'],
		technologies: ['SvelteKit', 'Tailwind CSS', 'Cloudflare'],
		slug: 'companies',
		link: 'https://companies.si',
		radius: 'rounded-lg',
		iconImage: companies
	},
	{
		title: 'undefined',
		description: m.project_undefined_desc,
		technologies: ['SvelteKit', 'Tailwind CSS', 'three.js'],
		tabs: ['featured', 'webapp'],
		slug: 'undefined',
		github: 'https://github.com/undefined-application',
		iconImage: undefinedIcon
	},
	{
		title: 'Cenko',
		description: m.project_cenko_desc,
		technologies: ['Flutter', 'Supabase', 'Play Store'],
		tabs: ['featured', 'mobile'],
		slug: 'cenko',
		link: 'https://cenko.app',
		iconImage: cenko
	},
	{
		title: 'potegni.me',
		description: m.project_potegnime_desc,
		technologies: ['.NET', 'Angular', 'Express.js', 'PostgreSQL'],
		tabs: ['webapp'],
		slug: 'potegnime',
		github: 'https://github.com/potegnime',
		link: 'https://potegni.me',
		iconImage: potegnime,
		radius: 'rounded-full'
	},
	{
		title: 'Period Tracker',
		description: m.project_period_tracker_desc,
		tabs: ['mobile'],
		technologies: ['Flutter', 'SQLite', 'Play Store'],
		slug: 'periodtracker',
		link: 'https://play.google.com/store/apps/details?id=com.lebaaar.period_tracker',
		github: 'https://github.com/lebaaar/period_tracker',
		iconImage: periodTracker,
		radius: 'rounded-full'
	},
	{
		title: 'Kavarna & Cukrarija',
		description: m.project_kavarna_cukrarija_desc,
		tabs: ['website'],
		slug: 'kavarna',
		link: 'https://torta-bo.si',
		radius: 'rounded-full',
		iconImage: kavarna
	}
	// {
	// 	title: 'Shapers Academy',
	// 	description: m.project_globalshapers_desc,
	// 	tabs: ['website'],
	// 	slug: 'shapers',
	// 	link: 'https://academy.globalshapers.si',
	// 	iconImage: globalShapers
	// }
	// {
	// 	title: 'Domain for sale',
	// 	description: m.project_domainforsale_desc,
	// 	technologies: ['SvelteKit', 'Tailwind CSS'],
	// 	category: 'website',
	// 	slug: 'domain-for-sale',
	// 	github: 'https://github.com/lebaaar/domain-for-sale',
	// 	link: 'https://ll.si',
	// 	iconImage: domainForSale
	// }
];
