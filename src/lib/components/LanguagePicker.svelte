<script lang="ts">
	import { i18n, supportedLocales, switchLocale } from '$lib/i18n.svelte';
	import { shine } from '$lib/actions/shine';

	let btnEls = $state<HTMLButtonElement[]>([]);
	let indicator = $state({ x: 0, width: 0, ready: false });

	function moveIndicator() {
		const el = btnEls[supportedLocales.findIndex((l) => l === i18n.locale)];
		if (!el) return;
		indicator = { x: el.offsetLeft, width: el.offsetWidth, ready: true };
	}

	$effect(() => {
		void i18n.locale;
		moveIndicator();
	});
</script>

<div
	role="radiogroup"
	aria-label="Language"
	class="relative flex items-center gap-0.5 rounded-full border border-zinc-700 bg-zinc-900/70 p-1 shadow-sm backdrop-blur"
>
	<div
		class="absolute left-0 top-1 h-[calc(100%-0.5rem)] rounded-full bg-zinc-100 shadow transition-[transform,width] duration-300 ease-out"
		style={`transform: translateX(${indicator.x}px); width: ${indicator.width}px; opacity: ${indicator.ready ? 1 : 0};`}
		aria-hidden="true"
	></div>
	{#each supportedLocales as lang, i (lang)}
		<button
			use:shine
			bind:this={btnEls[i]}
			onclick={() => switchLocale(lang)}
			role="radio"
			aria-checked={i18n.locale === lang}
			class={`relative z-10 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
				i18n.locale === lang ? 'text-zinc-900' : 'btn-shine pill-shine text-zinc-400 hover:text-white'
			}`}
		>
			{lang}
		</button>
	{/each}
</div>
