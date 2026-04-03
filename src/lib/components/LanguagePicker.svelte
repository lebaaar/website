<script lang="ts">
	import { onMount } from 'svelte';
	import { getLocale, setLocale, locales } from '$paraglide/runtime';

	type Locale = Parameters<typeof setLocale>[0];

	const locale = $derived(getLocale());
	const supportedLocales = locales as readonly Locale[];

	let open = $state(false);
	let menuRoot: HTMLDivElement | null = null;

	function selectLocale(lang: Locale) {
		setLocale(lang);
		open = false;
	}

	onMount(() => {
		const handleDocumentClick = (event: MouseEvent) => {
			if (menuRoot && !menuRoot.contains(event.target as Node)) {
				open = false;
			}
		};

		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				open = false;
			}
		};

		document.addEventListener('click', handleDocumentClick);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('click', handleDocumentClick);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div bind:this={menuRoot} class="relative">
	<button
		onclick={() => (open = !open)}
		aria-label={`Change language, current ${locale.toUpperCase()}`}
		aria-haspopup="menu"
		aria-expanded={open}
		class="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-300 shadow-sm backdrop-blur transition-colors hover:border-zinc-500 hover:bg-zinc-800 hover:text-white cursor-pointer"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="12" r="10"></circle>
			<path d="M2 12h20"></path>
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
		</svg>
	</button>

	{#if open}
		<div
			role="menu"
			class="absolute right-0 mt-2 flex w-32 flex-col gap-1 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950/95 p-1 shadow-2xl shadow-black/40 backdrop-blur"
		>
			{#each supportedLocales as lang (lang)}
				<button
					onclick={() => selectLocale(lang)}
					role="menuitemradio"
					aria-checked={locale === lang}
					class={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold uppercase tracking-widest transition-colors cursor-pointer ${
						locale === lang
							? 'bg-zinc-800 text-white'
							: 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
					}
					`}
				>
					<span>{lang}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
