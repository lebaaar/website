<script lang="ts">
	import * as m from '$paraglide/messages';
	import { shine } from '$lib/actions/shine';

	interface Feature {
		title: string;
		description: string;
	}

	let {
		title,
		type,
		badge = undefined,
		tagline,
		icon,
		iconRadius = '',
		iconBg = '',
		iconShadow = 'shadow-lg shadow-black/30',
		screenshot = undefined,
		screenshotBlur = '1.5px',
		screenshotOpacity = 0.5,
		screenshotSaturate = 1,
		screenshotScale = 1.05,
		screenshotPosition = 'top',
		link = undefined,
		linkLabel = undefined,
		linkBadge = undefined,
		github = undefined,
		overview,
		features
	}: {
		title: string;
		type: string;
		badge?: string;
		tagline: string;
		icon: string;
		iconRadius?: string;
		iconBg?: string;
		iconShadow?: string;
		screenshot?: string;
		screenshotBlur?: string;
		screenshotOpacity?: number;
		screenshotSaturate?: number;
		screenshotScale?: number;
		screenshotPosition?: string;
		link?: string;
		linkLabel?: string;
		linkBadge?: string;
		github?: string;
		overview: string[];
		features: Feature[];
		technologies: string[];
	} = $props();
</script>

<svelte:head>
	<title>{title} | Lan Lebar</title>
	<meta name="description" content={tagline} />
</svelte:head>

<div class="relative overflow-hidden">
	{#if screenshot}
		<div class="absolute inset-x-0 top-0 h-105 overflow-hidden sm:h-120" aria-hidden="true">
			<img
				src={screenshot}
				alt=""
				class="h-full w-full object-cover"
				style={`opacity: ${screenshotOpacity}; filter: blur(${screenshotBlur}) saturate(${screenshotSaturate}); transform: scale(${screenshotScale}); object-position: ${screenshotPosition};`}
			/>
			<div class="absolute inset-0 bg-linear-to-b from-zinc-950/55 via-zinc-950/70 to-zinc-950"></div>
		</div>
	{/if}

	<div class="relative mx-auto w-full max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a use:shine href="/"
			class="btn-shine mb-10 inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:text-white"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
			{m.project_page_back()}
		</a>

		<header class="detail-fade mb-12 sm:mb-16">
			<div class="mb-6 flex items-center gap-5">
				<div class={`h-20 w-20 shrink-0 overflow-hidden ${iconRadius} ${iconBg} ${iconShadow}`}>
					<img src={icon} alt={title} class="h-full w-full object-cover" />
				</div>
				<div>
					<h1 use:shine class="title-shimmer text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
					<p class="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
						{type}
						{#if badge}
							<span class="rounded-full border border-zinc-600/50 bg-zinc-700/25 px-2 py-0.5 text-xs text-zinc-300">
								{badge}
							</span>
						{/if}
					</p>
				</div>
			</div>

			<p class="mb-8 max-w-2xl text-lg leading-8 text-zinc-200">{tagline}</p>

			<div class="flex flex-wrap items-center gap-3">
				{#if link && linkBadge}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={link}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex transition"
						aria-label={linkLabel ?? m.project_page_visit()}
					>
						<img src={linkBadge} alt={linkLabel ?? m.project_page_visit()} class="h-12 w-auto" />
					</a>
				{:else if link}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a use:shine href={link}
						target="_blank"
						rel="noopener noreferrer"
						class="btn-shine inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950/80 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
						{linkLabel ?? m.project_page_visit()}
					</a>
				{/if}
				{#if github}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a use:shine href={github}
						target="_blank"
						rel="noopener noreferrer"
						class="btn-shine inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950/80 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
						{m.source_code()}
					</a>
				{/if}
			</div>
		</header>

		<section class="detail-fade mb-12 sm:mb-16" style="animation-delay: 100ms">
			<h2 use:shine class="title-shimmer mb-5 text-2xl font-bold text-white">{m.project_page_overview()}</h2>
			<div class="space-y-4 leading-8 text-zinc-300">
				{#each overview as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		</section>

		<section class="detail-fade mb-12 sm:mb-16" style="animation-delay: 200ms">
			<h2 use:shine class="title-shimmer mb-6 text-2xl font-bold text-white">{m.project_page_features()}</h2>
			<ul class="space-y-6">
				{#each features as feature (feature.title)}
					<li class="flex gap-4">
						<svg class="mt-1 h-5 w-5 shrink-0 text-zinc-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
						<div>
							<h3 class="text-lg font-semibold text-white">{feature.title}</h3>
							<p class="mt-1 leading-7 text-zinc-400">{feature.description}</p>
						</div>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</div>

<style>
	.detail-fade {
		animation: detail-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	@keyframes detail-fade-up {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.detail-fade {
			animation: none;
		}
	}
</style>
