<script lang="ts">
	import '$lib/styles/global.css';
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n.svelte';
	import { SITE_URL, ogImage } from '$lib/seo';

	let { children } = $props();

	const isIndexable = $derived(page.url.pathname === '/');
	const canonical = $derived(isIndexable ? SITE_URL : undefined);

	const image = $derived(isIndexable ? ogImage(page.url.pathname) : undefined);

	$effect(() => {
		document.documentElement.lang = i18n.locale;
	});
</script>

<svelte:head>
	{#if isIndexable}
		<link rel="canonical" href={canonical} />
		<meta property="og:url" content={canonical} />
		<meta property="og:image" content={image} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta name="twitter:image" content={image} />
	{:else}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
</svelte:head>

<div
	class="relative min-h-screen overflow-x-hidden bg-zinc-950 font-sans text-zinc-100 antialiased"
>
	{@render children()}
</div>
