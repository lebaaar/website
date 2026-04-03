<script lang="ts">
	import '$lib/styles/global.css';
	import { getLocale } from '$paraglide/runtime';

	let { children } = $props();
	const locale = $derived(getLocale());

	$effect(() => {
		document.documentElement.lang = locale;
	});
</script>

<div class="relative min-h-screen overflow-x-hidden bg-zinc-950 font-sans text-zinc-100 antialiased">
	{@render children()}
</div>
