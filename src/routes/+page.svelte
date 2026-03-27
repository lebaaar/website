<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});

	function scrollToProjects() {
		document.getElementById('about')?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}

	const socialLinkClass =
		'inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-5 py-3 text-sm font-medium text-zinc-200 shadow-sm transition hover:-translate-y-1 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500';
</script>

<div class="relative h-screen overflow-y-auto scroll-smooth">
	<main class="relative flex min-h-screen items-center justify-center px-6 pb-24 pt-10 sm:px-8">
		<div class={`mx-auto flex w-full max-w-3xl flex-col items-center text-center transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
			<img
				src="/me.jpeg"
				alt="Lan Lebar"
				class={`mb-6 h-46 w-46 rounded-full object-cover transition-all duration-700 sm:h-50 sm:w-50 ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
			/>
			<h1 class="mb-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Lan Lebar</h1>
			<p class="mb-6 text-base text-zinc-400 sm:text-lg">
				Developer @
				<a
					href="https://www.loftware.com"
					target="_blank"
					rel="noopener noreferrer"
					class="underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200"
				>
					Loftware
				</a>
				&& Student @
				<a
					href="https://fri.uni-lj.si/"
					target="_blank"
					rel="noopener noreferrer"
					class="underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200"
				>
					FRI
				</a>
			</p>

			<div class="flex w-xs flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap" id="links-container">
				<a href="https://github.com/lebaaar" target="_blank" rel="noopener noreferrer" class={socialLinkClass}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
					GitHub
				</a>
				<a href="https://linkedin.com/in/lan-lebar" target="_blank" rel="noopener noreferrer" class={socialLinkClass}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
					LinkedIn
				</a>
				<a href="mailto:lanlebar6@gmail.com" target="_blank" rel="noopener noreferrer" class={socialLinkClass}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
					</svg>
					Email
				</a>
			</div>
		</div>

		<button
			onclick={scrollToProjects}
			aria-label="Scroll to about section"
			class={`absolute bottom-4 mx-auto hidden sm:flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/70 text-zinc-400 shadow-sm backdrop-blur transition hover:border-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 ${visible ? 'animate-bounce' : 'opacity-0'}`}		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="18 9 12 15 6 9"></polyline>
			</svg>
		</button>
	</main>

	<About />
	<!-- <Projects /> -->
</div>
