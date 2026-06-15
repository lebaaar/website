<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$paraglide/messages';
	import domacahrana from '$lib/assets/domacahrana.png';
	import potegnime from '$lib/assets/potegnime.webp';
	import periodTracker from '$lib/assets/period_tracker.webp';
	import librelock from '$lib/assets/librelock.svg';
	import cenko from '$lib/assets/cenko.png';
	import globalShapers from '$lib/assets/globalshapers.png';

	interface Project {
		title: string;
		description: string;
		technologies: string[];
		link?: string;
		github?: string;
		radius?: string;
		iconImage?: string;
		stats?: {
			label: string;
			value: string;
		}[];
	}

	let visible = $state(false);
	let hoveredCard = $state<number | null>(null);
	let sectionEl = $state<HTMLElement | null>(null);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		if (sectionEl) observer.observe(sectionEl);
		return () => observer.disconnect();
	});

	const projects: Project[] = [
		{
			title: 'Domača Hrana',
			description: m.project_domacahrana_desc(),
			technologies: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Cloudflare Workers'],
			link: 'https://domacahrana.si',
			iconImage: domacahrana,
			radius: 'rounded-full',
		},
		{
			title: 'Cenko',
			description: m.project_cenko_desc(),
			technologies: ['Flutter', 'Dart', 'Supabase', 'Play Store'],
			link: 'https://cenko.lan.si',
			github: 'https://github.com/lebaaar/cenko',
			iconImage: cenko,
		},
		{
			title: 'potegni.me',
			description: m.project_potegnime_desc(),
			technologies: ['.NET', 'Angular', 'Express.js', 'PostgreSQL', 'Docker'],
			github: 'https://github.com/potegnime',
			link: 'https://potegni.me',
			iconImage: potegnime,
			radius: 'rounded-full',
			stats: [
				{ label: 'Users', value: '20+' },
				{ label: 'Uptime', value: '99.99%' }
			]
		},
		{
			title: 'LibreLock',
			description: m.project_librelock_desc(),
			technologies: ['Vue', 'Go', 'PostgreSQL', 'Docker'],
			github: 'https://github.com/LibreLock',
			iconImage: librelock
		},
		{
			title: 'Shapers Academy',
			description: m.project_globalshapers_desc(),
			technologies: ['SvelteKit', 'Tailwind CSS', 'Cloudflare Pages'],
			link: 'https://academy.globalshapers.si',
			iconImage: globalShapers,
		},
		{
			title: 'Period Tracker',
			description: m.project_period_tracker_desc(),
			technologies: ['Flutter', 'Dart', 'SQLite', 'Play Store'],
			link: 'https://play.google.com/store/apps/details?id=com.lebaaar.period_tracker',
			github: 'https://github.com/lebaaar/period_tracker',
			iconImage: periodTracker,
			radius: 'rounded-full',
			stats: [
				{ label: 'Rating', value: '4.8/5' },
				{ label: 'Downloads', value: '150+' }
			]
		}
	];

	const projectButtonClass =
		'inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:-translate-y-0.5 hover:border-zinc-500 hover:text-white';
</script>

<section id="projects" bind:this={sectionEl} class={`mx-auto w-full max-w-7xl px-6 py-20 transition-all duration-700 sm:px-8 lg:py-24 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
	<div class="mb-12 text-center sm:mb-16">
		<h2 class="mb-2 pb-2 text-white text-4xl font-bold sm:text-5xl">{m.projects_title()}</h2>
	</div>

	<div class="flex flex-wrap justify-center gap-8">
		{#each projects as project, i (project.title)}
			<div
				class={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900/80 p-7 shadow-xl shadow-black/20 backdrop-blur transition-all duration-300 hover:border-zinc-500 hover:shadow-2xl hover:shadow-black/30
				${visible ? 'opacity-100' : ' opacity-0'}
				${hoveredCard === i ? 'ring-1 ring-zinc-500/60' : ''}
				w-full sm:w-[calc(50%-1rem)] 2xl:w-[calc(33.333%-1.34rem)]`}
				onmouseenter={() => (hoveredCard = i)}
				onmouseleave={() => (hoveredCard = null)}
				role="article"
			>
				<div class="absolute inset-x-0 top-0 h-1 bg-linear-to-r opacity-0 transition group-hover:opacity-100"></div>

				<div class="mb-6 flex gap-3 items-center">
					<div class={`shrink-0 h-10 w-10 ${project.radius} overflow-hidden`}>
						<img src={project.iconImage} alt={project.title} class="w-full h-full object-cover" />
					</div>
					<div class="flex-1">
						<h3 class="text-2xl font-bold tracking-tight text-white">{project.title}</h3>
					</div>
				</div>

				<p class="mb-6 flex-1 leading-7 text-zinc-300">{project.description}</p>

				<!-- {#if project.stats}
					<div class="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
						{#each project.stats as stat (stat.label)}
							<div class="text-center">
								<span class="block text-2xl font-bold text-white">{stat.value}</span>
								<span class="block text-[11px] font-medium uppercase tracking-wide text-zinc-500">{stat.label}</span>
							</div>
						{/each}
					</div>
				{/if} -->

				<div class="mb-7 flex flex-wrap gap-2">
					{#each project.technologies as tech (tech)}
						<span class="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-300 transition group-hover:border-zinc-500/70 hover:border-zinc-600 hover:text-white hover:-translate-y-0.5 cursor-default">
							{tech}
						</span>
					{/each}
				</div>

				<div class="mt-auto flex flex-wrap gap-2">
					{#if project.link}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							class={`${projectButtonClass} border-zinc-600 bg-zinc-900 text-zinc-100 hover:border-zinc-400 hover:bg-zinc-800`}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
							<span class="inline sm:hidden lg:inline">{m.view_project()}</span><span class="hidden sm:inline lg:hidden">{m.view_project().split(' ')[0]}</span>
						</a>
					{/if}
					{#if project.github}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a href={project.github} target="_blank" rel="noopener noreferrer" class={`${projectButtonClass} hover:bg-zinc-800`}>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
							<span class="inline sm:hidden lg:inline">{m.source_code()}</span><span class="hidden sm:inline lg:hidden">{m.source_code().split(' ')[0]}</span>
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>
