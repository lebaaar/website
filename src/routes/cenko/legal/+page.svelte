<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Cenko | Legal</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-6 py-16">
	<h1 class="mb-2 text-3xl font-bold">Cenko Legal Information</h1>
	<p class="mb-12 text-sm text-zinc-400">Last updated: {data.lastEdited}</p>

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

	<h2 class="mb-2 text-lg font-semibold">Questions?</h2>
	<a href="mailto:{data.contactEmail}" class="text-sm text-zinc-300 underline underline-offset-2">
		{data.contactEmail}
	</a>
</main>
