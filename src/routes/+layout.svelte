<script lang="ts">
	import '$lib/styles/global.css';
	import { i18n } from '$lib/i18n.svelte';

	let { children } = $props();

	$effect(() => {
		document.documentElement.lang = i18n.locale;
	});
</script>

<div class="relative min-h-screen overflow-x-hidden bg-zinc-950 font-sans text-zinc-100 antialiased">
	{@render children()}
</div>
