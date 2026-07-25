<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import * as m from '$paraglide/messages';

	const errorMessages: Record<number, () => string> = {
		404: m.error_404,
		500: m.error_500,
		403: m.error_403
	};

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<svelte:head>
	<title>{page.status} | Lan Lebar</title>
</svelte:head>

<main>
	<div class={`mx-auto flex min-h-[95vh] max-w-xl flex-col items-center justify-center px-6 text-center transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
		<h1 class="mb-3 text-7xl font-semibold tracking-tight text-white sm:text-8xl">{page.status}</h1>
		<p class="mb-8 text-base text-zinc-400 sm:text-lg">{errorMessages[page.status]?.() ?? page.error?.message ?? m.error_default()}</p>
		<a
			href={resolve('/')}
			class="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:-translate-y-1 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
			{m.back_home()}
		</a>
	</div>
</main>
