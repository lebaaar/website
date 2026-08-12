<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$paraglide/messages';
	import { shine } from '$lib/actions/shine';
	import loftwareLogo from '$lib/assets/loftware.png';

	let seen = false;
	let visible = $state(seen);
	let sectionEl = $state<HTMLElement | null>(null);

	onMount(() => {
		if (seen) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					seen = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		if (sectionEl) observer.observe(sectionEl);
		return () => observer.disconnect();
	});

	const skills = [
		{ name: m.skill_web_mobile(), items: ['TypeScript', 'Angular', 'Vue', 'SvelteKit', 'Tailwind CSS', 'Flutter'] },
		{ name: m.skill_backend_db(), items: ['.NET', 'Python', 'Java', 'Node.js', 'PostgreSQL', 'MongoDB'] },
		{ name: m.skill_tools_platforms(), items: ['AWS', 'Azure', 'Cloudflare', 'Docker', 'Linux', 'Supabase', 'Firebase'] },
	];

	const experiences = [
		{
			role: m.exp_role(),
			company: 'Loftware',
			companyLink: 'https://www.loftware.com',
			period: m.exp_period(),
			description: m.exp_description(),
			tech_stack: m.exp_tech_stack()
		}
	];
</script>

<section id="about"
	bind:this={sectionEl}
	class={`relative z-10 w-full px-6 py-0 sm:py-20 transition-all duration-700 sm:px-8 lg:py-24 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
>
	<div class="mx-auto max-w-7xl">
		<div class="grid items-start gap-20 sm:gap-12 lg:grid-cols-[1.5fr_1fr]">
			<div>
				<h2 use:shine={{ hitTest: true }} class="title-shimmer mb-8 text-white text-4xl font-bold sm:text-5xl">{m.about_title()}</h2>
				<div class="space-y-5 text-base leading-8 text-zinc-300 sm:text-lg">
					<p>{m.about_para1()}</p>
					<p>
						{m.about_para2_prefix()}
						<a use:shine href="https://www.loftware.com" target="_blank" rel="noopener noreferrer" class="link-shine underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200">
							Loftware
						</a>{m.about_para2_middle()}
						<a use:shine href="https://fri.uni-lj.si/" target="_blank" rel="noopener noreferrer" class="link-shine underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200">
							FRI
						</a>{m.about_para2_suffix()}
					</p>
					<p>{m.about_para3()}</p>
				</div>

				<div class="mt-12 border-t border-zinc-800 pt-12">
					<h3 use:shine={{ hitTest: true }} class="title-shimmer mb-8 text-2xl font-semibold text-white">{m.experience_title()}</h3>
					<div class="space-y-1">
						{#each experiences as exp, index (index)}
							<div class="relative flex gap-4 pb-10 last:pb-0">
								<div class="relative mt-1 h-10 w-10 shrink-0 overflow-hidden">
									<img src={loftwareLogo} alt={exp.company} class="h-full w-full object-cover" />
								</div>
								<div class="flex-1">
									<div class="mb-2 flex flex-wrap items-baseline justify-between gap-2">
										<h4 use:shine={{ hitTest: true }} class="title-shimmer text-xl font-semibold text-white">{exp.role}</h4>
										<span class="text-sm font-medium text-zinc-500">{exp.period}</span>
									</div>
									<p class="mb-2 font-medium text-zinc-300">
										<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
										<a use:shine href={exp.companyLink} target="_blank" rel="noopener noreferrer" class="link-shine underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200">
											{exp.company}
										</a>
									</p>
									<p class="leading-7 text-zinc-400">{exp.description}</p>
									<p class="mt-2 text-sm font-medium text-zinc-500">{exp.tech_stack} C#, ASP.NET, Angular, TypeScript, MSSQL, PostgreSQL, Python, AWS, Azure</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="lg:sticky lg:top-8">
				<h3 use:shine={{ hitTest: true }} class="title-shimmer mb-4 text-2xl font-semibold text-white sm:mb-6">{m.skills_title()}</h3>
				<div class="space-y-3 sm:space-y-6">
					{#each skills as skillGroup (skillGroup.name)}
						<div use:shine class="box-shine rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20 transition hover:border-zinc-600 sm:p-6">
							<h4 use:shine={{ within: '.box-shine' }} class="link-shine shine-inherit mb-3 text-base font-semibold text-zinc-200 sm:mb-4 sm:text-xl">{skillGroup.name}</h4>
							<div class="flex flex-wrap gap-2">
								{#each skillGroup.items as skill (skill)}
									<span use:shine class="btn-shine pill-shine cursor-default rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-[13px] font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white sm:px-3 sm:py-2 sm:text-sm">
										<span use:shine={{ within: '.btn-shine' }} class="btn-shine-label">{skill}</span>
									</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>

				<div class="mt-3 grid grid-cols-2 gap-3 sm:mt-6">
					<div use:shine class="box-shine rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5 text-center transition hover:border-zinc-600 sm:py-5">
						<div use:shine={{ within: '.box-shine' }} class="title-shimmer shine-inherit text-3xl font-bold">3+</div>
						<div class="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">{m.stat_years_experience()}</div>
					</div>
					<div use:shine class="box-shine rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5 text-center transition hover:border-zinc-600 sm:py-5">
						<div use:shine={{ within: '.box-shine' }} class="title-shimmer shine-inherit text-3xl font-bold">10+</div>
						<div class="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">{m.stat_projects_built()}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
