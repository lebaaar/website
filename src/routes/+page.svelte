<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import About from '$lib/components/About.svelte';
	import LanguagePicker from '$lib/components/LanguagePicker.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import * as m from '$paraglide/messages';

	// The page scrolls inside .scroll-container, so SvelteKit's window scroll
	// restoration does nothing, so save/restore the container's position manually.
	beforeNavigate(() => {
		const container = document.querySelector<HTMLElement>('.scroll-container');
		if (container) sessionStorage.setItem('home-scroll', String(container.scrollTop));
	});

	afterNavigate((nav) => {
		if (!nav.from?.url.pathname.startsWith('/projects')) return;
		const saved = sessionStorage.getItem('home-scroll');
		if (!saved) return;
		// Restore after the restored tab has re-filtered the grid and laid out,
		// so the saved offset lands on the same content.
		const restore = () => {
			const container = document.querySelector<HTMLElement>('.scroll-container');
			if (container) container.scrollTo({ top: Number(saved), behavior: 'instant' });
		};
		restore();
		requestAnimationFrame(restore);
	});

	function scrollToProjects() {
		document.getElementById('about')?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}

	const interactiveTags = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'];

	function handleKeydown(event: KeyboardEvent) {
		if (event.code !== 'Space') return;

		const target = event.target as HTMLElement;
		if (interactiveTags.includes(target.tagName) || target.isContentEditable) return;

		const container = document.querySelector<HTMLElement>('.scroll-container');
		if (!container) return;

		const sections = Array.from(container.querySelectorAll<HTMLElement>('main, section'));
		const containerTop = container.getBoundingClientRect().top;
		const scrollTop = container.scrollTop;

		const next = sections.find((section) => {
			const offsetTop = section.getBoundingClientRect().top - containerTop + scrollTop;
			return offsetTop > scrollTop + 10;
		});

		if (!next) return;

		event.preventDefault();
		next.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// 3D tilt on the hero avatar: rotate towards the pointer, reset on leave.
	const maxTiltDeg = 12;
	let tiltX = $state(0);
	let tiltY = $state(0);
	let hovering = $state(false);

	function handleAvatarMove(event: PointerEvent) {
		if (event.pointerType !== 'mouse') return;
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		// -0.5..0.5 offset from the center of the image
		const px = (event.clientX - rect.left) / rect.width - 0.5;
		const py = (event.clientY - rect.top) / rect.height - 0.5;
		tiltX = -py * 2 * maxTiltDeg;
		tiltY = px * 2 * maxTiltDeg;
		hovering = true;
	}

	function resetAvatarTilt() {
		tiltX = 0;
		tiltY = 0;
		hovering = false;
	}

	const socialLinkClass =
		'inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-5 py-3 text-sm font-medium text-zinc-200 shadow-sm transition-transform transition-colors hover:-translate-y-1 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500';
</script>

<svelte:head>
	<title>Lan Lebar</title>
	<meta name="description" content="Lan Lebar - Software Developer" />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="scroll-container relative h-screen overflow-y-auto scroll-smooth">
	<main class="relative flex min-h-screen items-center justify-center px-6 pb-20 pt-10 sm:px-8">
		<div class="absolute right-4 top-4 z-50 sm:right-6 sm:top-6">
			<LanguagePicker />
		</div>
		<div class="hero-intro mx-auto flex w-full max-w-3xl flex-col items-center text-center">
			<div
				class="avatar-intro avatar-stage mb-6"
				onpointermove={handleAvatarMove}
				onpointerleave={resetAvatarTilt}
			>
				<img
					src="/me.jpeg"
					alt="Lan Lebar"
					class="avatar-tilt h-50 w-50 rounded-full object-cover"
					style="--tilt-x: {tiltX}deg; --tilt-y: {tiltY}deg; --tilt-scale: {hovering
						? 1.08
						: 1}; --tilt-shadow-alpha: {hovering ? 0.14 : 0};"
				/>
			</div>
			<h1 class="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Lan Lebar</h1>
			{#key i18n.locale}
				<p class="mb-6 text-base text-zinc-400 sm:text-lg">
					{m.hero_developer_at()}
					<a
						href="https://www.loftware.com"
						target="_blank"
						rel="noopener noreferrer"
						class="underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200"
					>
						Loftware
					</a>
					{m.hero_student_at()}
					<a
						href="https://fri.uni-lj.si/"
						target="_blank"
						rel="noopener noreferrer"
						class="underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200"
					>
						FRI
					</a>
				</p>
			{/key}

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
			aria-label={m.hero_scroll_label()}
			class="absolute bottom-4 mx-auto hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/70 text-zinc-400 shadow-sm backdrop-blur transition-colors hover:border-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 sm:flex animate-bounce">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="18 9 12 15 6 9"></polyline>
			</svg>
		</button>
	</main>

	{#key i18n.locale}
		<About />
		<Projects />
	{/key}
</div>

<style>
	.scroll-container {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.scroll-container::-webkit-scrollbar {
		display: none;
	}

	.hero-intro {
		animation: hero-fade-up 1200ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.avatar-intro {
		animation: avatar-pop 1200ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	/* Perspective lives on the wrapper so the pop animation and the tilt
	   don't fight over the same transform. */
	.avatar-stage {
		perspective: 700px;
	}

	.avatar-tilt {
		transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))
			scale(var(--tilt-scale, 1));
		transform-style: preserve-3d;
		/* Light glow, not a dark shadow — the hero sits on a near-black background. */
		box-shadow:
			0 0 24px -4px rgb(244 244 245 / var(--tilt-shadow-alpha, 0)),
			0 0 50px 2px rgb(244 244 245 / calc(var(--tilt-shadow-alpha, 0) * 0.4));
		transition:
			transform 150ms ease-out,
			box-shadow 250ms ease-out;
		will-change: transform;
	}

	@keyframes hero-fade-up {
		from {
			opacity: 0.5;
			transform: translateY(100px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes avatar-pop {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-intro,
		.avatar-intro {
			animation: none;
		}

		.avatar-tilt {
			transform: none;
			transition: none;
		}
	}
</style>
