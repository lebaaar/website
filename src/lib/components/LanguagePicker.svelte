<script lang="ts">
	import { i18n, supportedLocales, switchLocale, type Locale } from '$lib/i18n.svelte';
	import { shine } from '$lib/actions/shine';

	// Apps whose paraglide strategy includes 'url' must navigate instead of only flipping the cookie, so the handler is overridable.
	// See website/DESIGN.md.
	// `compact` is for chrome where the picker is a utility rather than a feature, such as a documentation header.
	let {
		onselect = switchLocale,
		compact = false
	}: { onselect?: (lang: Locale) => void; compact?: boolean } = $props();

	const size = $derived(
		compact
			? { pad: 'gap-0.5 p-0.5', track: 'top-0.5 h-[calc(100%-0.25rem)]', label: 'px-2.5 py-1' }
			: { pad: 'gap-0.5 p-1', track: 'top-1 h-[calc(100%-0.5rem)]', label: 'px-3 py-1.5' }
	);

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
	class="relative flex items-center rounded-full border border-zinc-700 bg-zinc-900/70 shadow-sm backdrop-blur {size.pad}"
>
	<div
		class="absolute left-0 rounded-full bg-zinc-100 shadow transition-[transform,width] duration-300 ease-out {size.track}"
		style={`transform: translateX(${indicator.x}px); width: ${indicator.width}px; opacity: ${indicator.ready ? 1 : 0};`}
		aria-hidden="true"
	></div>
	{#each supportedLocales as lang, i (lang)}
		<button
			use:shine
			bind:this={btnEls[i]}
			onclick={() => onselect(lang)}
			role="radio"
			aria-checked={i18n.locale === lang}
			class={`relative z-10 cursor-pointer rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${size.label} ${
				i18n.locale === lang && indicator.ready
					? 'text-zinc-900'
					: 'btn-shine pill-shine text-zinc-400 hover:text-white'
			}`}
		>
			{lang}
		</button>
	{/each}
</div>
