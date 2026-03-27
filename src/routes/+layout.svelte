<script lang="ts">
	import '$lib/styles/global.css';

	let { children } = $props();
</script>

<div class="relative min-h-screen overflow-x-hidden bg-zinc-950 font-sans text-zinc-100 antialiased">
	{@render children()}
</div>
