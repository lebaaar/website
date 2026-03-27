<script lang="ts">
	import favicon from '$lib/assets/me.jpeg';
	import '$lib/styles/global.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen overflow-x-hidden bg-zinc-950 font-sans text-zinc-100 antialiased">
	{@render children()}
</div>
