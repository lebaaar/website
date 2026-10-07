<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import LanguagePicker from '$lib/components/LanguagePicker.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import SectionNav from '$lib/components/SectionNav.svelte';
	import { shine } from '$lib/actions/shine';
	import { i18n } from '$lib/i18n.svelte';
	import * as m from '$lib/paraglide/messages';
	import { gsap, initScroll, prefersReducedMotion, scrollToTarget } from '$lib/motion/scroll';
	import { moonStage } from '$lib/moon/stage.svelte';
	import { onMount } from 'svelte';

	let container = $state<HTMLElement>();
	let content = $state<HTMLElement>();
	let hero = $state<HTMLElement>();

	// The layout's moon follows this container while the home page is mounted.
	$effect(() => {
		moonStage.container = container;
		return () => (moonStage.container = undefined);
	});

	onMount(() => {
		if (!container || !content || !hero) return;
		const stopScroll = initScroll(container, content);
		if (prefersReducedMotion()) return stopScroll;

		// Waits for the moon to land, with a timeout in case it never does.
		let revealed = false;
		const revealHero = () => {
			if (revealed) return;
			revealed = true;
			// Coming back from a project the moon never left, so the hero is simply there.
			if (moonStage.settled) {
				ctx.add(() => gsap.set('.hero-item, .hero-late', { opacity: 1, y: 0, filter: 'none' }));
				return;
			}
			ctx.add(() => {
				gsap.to('.hero-item', {
					opacity: 1,
					y: 0,
					filter: 'blur(0px)',
					duration: 1.4,
					ease: 'expo.out',
					stagger: 0.12
				});
				gsap.to('.hero-late', { opacity: 1, duration: 1, ease: 'power2.out', delay: 1.4 });
			});
		};

		const ctx = gsap.context(() => {
			gsap.delayedCall(6, revealHero);
			gsap.to('.hero-inner', {
				yPercent: -18,
				opacity: 0,
				ease: 'none',
				scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
			});
		}, hero);
		if (moonStage.settled) revealHero();
		else window.addEventListener('moon:settled', revealHero);

		return () => {
			window.removeEventListener('moon:settled', revealHero);
			ctx.revert();
			stopScroll();
		};
	});

	beforeNavigate(() => {
		const container = document.querySelector<HTMLElement>('.scroll-container');
		if (container) sessionStorage.setItem('home-scroll', String(container.scrollTop));
	});

	afterNavigate((nav) => {
		if (nav.to?.url.hash === '#contact') {
			const jump = () => {
				document.getElementById('contact')?.scrollIntoView({ behavior: 'instant', block: 'start' });
			};
			jump();
			requestAnimationFrame(jump);
			return;
		}

		if (!nav.from?.url.pathname.startsWith('/projects')) return;
		const saved = sessionStorage.getItem('home-scroll');
		if (!saved) {
			const toProjects = () => {
				document
					.getElementById('projects')
					?.scrollIntoView({ behavior: 'instant', block: 'start' });
			};
			toProjects();
			requestAnimationFrame(toProjects);
			setTimeout(toProjects, 400);
			return;
		}
		const restore = () => {
			const container = document.querySelector<HTMLElement>('.scroll-container');
			if (container) container.scrollTo({ top: Number(saved), behavior: 'instant' });
		};
		restore();
		requestAnimationFrame(restore);
	});

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
		scrollToTarget(next);
	}

	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Lan Lebar',
		url: 'https://lan.si',
		jobTitle: 'Software Developer',
		image: 'https://lan.si/og-image.png',
		sameAs: ['https://github.com/lebaaar', 'https://linkedin.com/in/lan-lebar']
	};

	const socialLinkClass =
		'btn-shine inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-3.5 py-2.5 text-sm font-medium text-zinc-200 sm:px-5 sm:py-3 shadow-sm transition-colors hover:border-zinc-500 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500';
</script>

<svelte:head>
	<title>Lan Lebar</title>
	<meta name="description" content="Lan Lebar - Software Developer" />
	<meta property="og:title" content="Lan Lebar" />
	<meta property="og:description" content="Lan Lebar - Software Developer" />
	<meta name="twitter:title" content="Lan Lebar" />
	<meta name="twitter:description" content="Lan Lebar - Software Developer" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</` + `script>`}
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<SectionNav />

<div bind:this={container} class="scroll-container relative z-10 h-screen overflow-y-auto">
	<div bind:this={content}>
		<main
			id="home"
			bind:this={hero}
			class="relative flex min-h-svh items-center px-5 pt-[22svh] pb-10 sm:px-8 lg:min-h-screen lg:pt-20 lg:pb-24"
		>
			<div class="hero-late absolute top-0 right-4 z-50 flex h-16 items-center sm:right-6">
				<LanguagePicker compact />
			</div>
			<div
				class="hero-inner mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12"
			>
				<div class="flex flex-col items-start text-left">
					<div class="hero-item mb-5 lg:mb-7">
						<div use:shine class="img-shine h-20 w-20 rounded-full sm:h-24 sm:w-24 lg:h-28 lg:w-28">
							<img src="/me.jpeg" alt="Lan Lebar" class="h-full w-full rounded-full object-cover" />
						</div>
					</div>
					<h1
						use:shine={{ hitTest: true }}
						class="hero-item title-shimmer mb-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
					>
						Lan Lebar
					</h1>
					<p class="hero-item mb-6 max-w-md text-base text-zinc-400 sm:text-lg lg:mb-8">
						<!-- Keyed inside the <p> so the revealed element survives a language switch. -->
						{#key i18n.locale}
							{m.hero_tagline()}
						{/key}
					</p>

					<div class="hero-item flex flex-wrap gap-2 sm:gap-3" id="links-container">
						<a
							use:shine
							href="https://github.com/lebaaar"
							target="_blank"
							rel="noopener noreferrer"
							class={socialLinkClass}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								/>
							</svg>
							GitHub
						</a>
						<a
							use:shine
							href="https://linkedin.com/in/lan-lebar"
							target="_blank"
							rel="noopener noreferrer"
							class={socialLinkClass}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
								/>
							</svg>
							LinkedIn
						</a>
						<a
							use:shine
							href="mailto:hello@lan.si"
							target="_blank"
							rel="noopener noreferrer"
							class={socialLinkClass}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect width="20" height="16" x="2" y="4" rx="2" /><path
									d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
								/>
							</svg>
							Email
						</a>
					</div>
				</div>
				<div class="hidden justify-center lg:flex">
					<div data-moon-slot aria-hidden="true" class="aspect-square w-full max-w-140"></div>
				</div>
			</div>
		</main>

		{#key i18n.locale}
			<About />
			<Projects />
			<Contact />
		{/key}
		<div class="h-[45vh]" aria-hidden="true"></div>
	</div>
</div>

<style>
	.scroll-container {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.scroll-container::-webkit-scrollbar {
		display: none;
	}

	/* Revealed by the GSAP intro. */
	.hero-late {
		opacity: 0;
	}

	.hero-item {
		opacity: 0;
		transform: translateY(32px);
		filter: blur(10px);
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-late {
			opacity: 1;
		}

		.hero-item {
			opacity: 1;
			transform: none;
			filter: none;
		}
	}
</style>
