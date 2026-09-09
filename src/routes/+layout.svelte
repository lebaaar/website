<script lang="ts">
	import '$lib/styles/global.css';
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n.svelte';
	import { SITE_URL, ogImage } from '$lib/seo';

	let { children } = $props();

	const canonical = $derived(
		SITE_URL + (page.url.pathname === '/' ? '' : page.url.pathname.replace(/\/$/, ''))
	);

	const image = $derived(ogImage(page.url.pathname));

	$effect(() => {
		document.documentElement.lang = i18n.locale;
	});
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content={image} />
</svelte:head>

<div class="relative min-h-screen overflow-x-hidden bg-zinc-950 font-sans text-zinc-100 antialiased">
	{@render children()}
</div>
