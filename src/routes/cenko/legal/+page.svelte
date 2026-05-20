<script lang="ts">
	import { legalDataEn, legalDataSl } from '$lib/cenko/constants';

	let lang = $state<'en' | 'sl'>('en');
	let data = $derived(lang === 'en' ? legalDataEn : legalDataSl);
</script>

<svelte:head>
	<title>Cenko | Legal</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-6 py-16">
	<div class="mb-2 flex items-start justify-between gap-4">
		<h1 class="text-3xl font-bold">{data.ui.heading}</h1>
		<div class="flex shrink-0 gap-1 pt-1">
			<button
				onclick={() => (lang = 'en')}
				class="rounded px-2 py-0.5 text-xs font-medium cursor-pointer transition-colors {lang === 'en'
					? 'bg-zinc-200 text-zinc-900'
					: 'text-zinc-400 hover:text-zinc-200'}"
			>
				EN
			</button>
			<button
				onclick={() => (lang = 'sl')}
				class="rounded px-2 py-0.5 text-xs font-medium cursor-pointer transition-colors {lang === 'sl'
					? 'bg-zinc-200 text-zinc-900'
					: 'text-zinc-400 hover:text-zinc-200'}"
			>
				SL
			</button>
		</div>
	</div>
	<p class="mb-12 text-sm text-zinc-400">{data.ui.lastUpdated} {data.lastEdited}</p>

	{#each data.documents as doc (doc.title)}
		{#each doc.sections as section (section.title)}
			<section class="mb-8">
				<h2 class="mb-3 text-lg font-semibold">{section.title}</h2>
				<ul class="space-y-2">
					{#each section.bullets as bullet (section.title + bullet)}
						<li class="flex gap-3 text-sm text-zinc-300">
							<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400"></span>
							<span>{bullet}</span>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	{/each}

	<h2 class="mb-2 text-lg font-semibold">{data.ui.questions}</h2>
	<a href="mailto:{data.contactEmail}" class="text-sm text-zinc-300 underline underline-offset-2">
		{data.contactEmail}
	</a>
</main>
