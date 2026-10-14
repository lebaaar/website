<script lang="ts">
	import '$lib/styles/global.css';
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n.svelte';
	import { SITE_URL, ogImage } from '$lib/seo';
	import MoonCanvas from '$lib/components/MoonCanvas.svelte';

	let { children } = $props();

	// Only the home page is indexed. Project pages stay noindex but keep their link previews.
	const isIndexable = $derived(page.url.pathname === '/');
	const url = $derived(SITE_URL + page.url.pathname.replace(/\/$/, ''));

	// One moon for the whole site, so it glides between pages instead of restarting on each.
	const moonMode = $derived(
		page.url.pathname === '/'
			? 'home'
			: page.url.pathname.startsWith('/projects/')
				? 'detail'
				: undefined
	);

	const image = $derived(ogImage(page.url.pathname));

	$effect(() => {
		document.documentElement.lang = i18n.locale;
	});
</script>

<svelte:head>
	{#if isIndexable}
		<link rel="canonical" href={url} />
	{:else}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Lan Lebar" />
	<meta name="twitter:image" content={image} />
</svelte:head>

<div
	class="relative min-h-screen overflow-x-hidden bg-zinc-950 font-sans text-zinc-100 antialiased"
>
	{#if moonMode}
		<MoonCanvas mode={moonMode} />
	{/if}
	{@render children()}
</div>
