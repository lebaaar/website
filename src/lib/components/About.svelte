<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$paraglide/messages';

	let visible = $state(false);
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

	const skills = [
		{ name: m.skill_web_mobile(), items: ['TypeScript', 'Angular', 'SvelteKit', 'Tailwind CSS', 'Flutter'] },
		{ name: m.skill_backend_db(), items: ['.NET', 'Python', 'Java', 'Express.js', 'PostgreSQL'] },
		{ name: m.skill_tools_platforms(), items: ['Docker', 'Cloudflare', 'Azure', 'Linux', 'Firebase'] },
	];

	const experiences = [
		{
			role: m.exp_role(),
			company: 'Loftware',
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
		<div class="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
			<div>
				<h2 class="mb-8 text-white text-4xl font-bold sm:text-5xl">{m.about_title()}</h2>
				<div class="space-y-5 text-base leading-8 text-zinc-300 sm:text-lg">
					<p>{m.about_para1()}</p>
					<p>
						{m.about_para2_prefix()}
						<a href="https://www.loftware.com" target="_blank" rel="noopener noreferrer" class="underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200">
							Loftware
						</a>{m.about_para2_middle()}
						<a href="https://fri.uni-lj.si/" target="_blank" rel="noopener noreferrer" class="underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200">
							FRI
						</a>{m.about_para2_suffix()}
					</p>
					<p>{m.about_para3()}</p>
				</div>

				<div class="mt-12 border-t border-zinc-800 pt-12">
					<h3 class="mb-8 text-2xl font-semibold text-white">{m.experience_title()}</h3>
					<div class="space-y-1">
						{#each experiences as exp, index (index)}
							<div class="relative flex gap-4 pb-10 last:pb-0">
								{#if index <= experiences.length || true}
									<div class="absolute left-[9px] top-7 h-[calc(100%-0.25rem)] w-px bg-gradient-to-b from-indigo-400/70 to-transparent"></div>
								{/if}
								<div class="relative mt-1 h-5 w-5 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500"></div>
								<div class="flex-1">
									<div class="mb-2 flex flex-wrap items-baseline justify-between gap-2">
										<h4 class="text-xl font-semibold text-white">{exp.role}</h4>
										<span class="text-sm font-medium text-zinc-500">{exp.period}</span>
									</div>
									<p class="mb-2 font-medium text-zinc-300">{exp.company}</p>
									<p class="leading-7 text-zinc-400">{exp.description}</p>
									<p class="mt-2 text-sm font-medium text-zinc-500">{exp.tech_stack} C#, ASP.NET, Angular, TypeScript, MSSQL, PostgreSQL, Python, Azure</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="lg:sticky lg:top-8">
				<h3 class="mb-6 text-2xl font-semibold text-white">{m.skills_title()}</h3>
				<div class="space-y-6">
					{#each skills as skillGroup (skillGroup.name)}
						<div class="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 transition hover:border-zinc-600">
							<h4 class="mb-4 text-lg font-semibold text-zinc-200">{skillGroup.name}</h4>
							<div class="flex flex-wrap gap-2">
								{#each skillGroup.items as skill (skill)}
									<span class="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white hover:-translate-y-0.5 cursor-default">
										{skill}
									</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>

				<div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
					<div class="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-5 text-center transition hover:border-zinc-600">
						<div class="text-3xl font-bold">3+</div>
						<div class="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">{m.stat_years_experience()}</div>
					</div>
					<div class="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-5 text-center transition hover:border-zinc-600">
						<div class="text-3xl font-bold">5+</div>
						<div class="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">{m.stat_projects_built()}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
