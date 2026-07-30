<script lang="ts">
	import { onMount, tick } from 'svelte';
	import * as m from '$paraglide/messages';
	import { shine } from '$lib/actions/shine';
	import { i18n } from '$lib/i18n.svelte';

	// Anchors live in +page.svelte (#home) and the section components.
	const items = $derived.by(() => {
		void i18n.locale;
		return [
			{ id: 'home', label: m.nav_home() },
			{ id: 'about', label: m.nav_about() },
			{ id: 'projects', label: m.nav_projects() }
		];
	});

	let active = $state('home');
	let mounted = $state(false);
	let labelEls = $state<HTMLSpanElement[]>([]);
	let labelWidths = $state<number[]>([]);

	// Labels expand to their measured width rather than an arbitrary max-width,
	// so the open/close motion is a single even sweep instead of a snap.
	function measureLabels() {
		labelWidths = labelEls.map((el) => (el ? Math.ceil(el.getBoundingClientRect().width) : 0));
	}

	$effect(() => {
		void i18n.locale;
		void items;
		measureLabels();
	});

	// The page scrolls inside `.scroll-container`, not the window, so the active
	// section is resolved from that container's scroll offsets.
	function resolveActive(container: HTMLElement) {
		const containerTop = container.getBoundingClientRect().top;
		const line = container.clientHeight * 0.35;

		if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) {
			active = items[items.length - 1].id;
			return;
		}

		let current = items[0].id;
		for (const item of items) {
			const el = document.getElementById(item.id);
			if (!el) continue;
			if (el.getBoundingClientRect().top - containerTop <= line) current = item.id;
		}
		active = current;
	}

	onMount(() => {
		const container = document.querySelector<HTMLElement>('.scroll-container');
		if (!container) return;

		let frame = 0;
		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				resolveActive(container);
			});
		};

		const onResize = () => {
			onScroll();
			measureLabels();
		};

		resolveActive(container);
		tick().then(() => {
			measureLabels();
			mounted = true;
		});

		// Web fonts settle after first paint and shift the measured label widths.
		document.fonts?.ready.then(measureLabels);

		container.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);
		return () => {
			cancelAnimationFrame(frame);
			container.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		};
	});

	function jumpTo(id: string) {
		const el = document.getElementById(id);
		if (!el) return;
		active = id;
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<nav
	aria-label={m.nav_label()}
	class={`section-nav fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-stretch py-2 pl-2 lg:flex ${mounted ? 'opacity-100' : 'opacity-0'}`}
>
	{#each items as item, i (item.id)}
		{@const isActive = active === item.id}
		<button
			onclick={() => jumpTo(item.id)}
			aria-current={isActive ? 'true' : undefined}
			class="group/item relative flex cursor-pointer items-center justify-end rounded-lg py-1.5 pl-2 pr-1"
		>
			<span
				class="label-wrap"
				style={`--label-w: ${labelWidths[i] ?? 0}px; --label-delay: ${i * 45}ms;`}
			>
				<span
					bind:this={labelEls[i]}
					use:shine={{ within: '.section-nav' }}
					class={`nav-label link-shine block w-max text-[13px] font-medium leading-5 tracking-[0.01em] transition-colors duration-300 ease-out ${
						isActive ? 'text-zinc-100' : 'text-zinc-400 group-hover/item:text-zinc-100'
					}`}
				>
					{item.label}
				</span>
			</span>
			<span
				aria-hidden="true"
				class={`dot w-1.25 shrink-0 rounded-full ${
					isActive ? 'is-active bg-zinc-400' : 'bg-zinc-700 group-hover/item:bg-zinc-500'
				}`}
			></span>
		</button>
	{/each}
</nav>

<style>
	/* Site easing, shared with the hero intro. */
	.section-nav {
		--nav-ease: cubic-bezier(0.22, 1, 0.36, 1);
		transition: opacity 700ms ease-out;
	}

	/* One light source for the rail: every label tracks the same cursor x, so the
	   shimmer reads as a single column sweeping across them. The highlight tops
	   out partway to zinc-100 instead of white, and spreads wide, so it lifts the
	   label's own colour rather than flashing over it. */
	.nav-label {
		--shine-spread: 3.5rem;
		--shine-hot: color-mix(in oklab, var(--color-zinc-100) calc(var(--shine) * 55%), currentColor);
	}

	.section-nav:hover .nav-label {
		--shine: 1;
	}

	/* Position reads from the marker's length, not its brightness — a bright dot
	   with a halo glared against the dark page. */
	.dot {
		height: 5px;
		transition:
			background-color 300ms ease-out,
			height 400ms var(--nav-ease);
	}

	.dot.is-active {
		height: 1.125rem;
	}

	/* Collapsed labels hold zero width; hover sweeps them to their measured
	   width, staggered top to bottom, and pulls them back in unison. */
	.label-wrap {
		width: 0;
		margin-right: 0;
		overflow: hidden;
		opacity: 0;
		transition:
			width 450ms var(--nav-ease),
			margin-right 450ms var(--nav-ease),
			opacity 220ms ease-out;
	}

	.section-nav:hover .label-wrap {
		width: var(--label-w);
		margin-right: 0.625rem;
		opacity: 1;
		transition-delay: var(--label-delay), var(--label-delay), var(--label-delay);
	}

	@media (prefers-reduced-motion: reduce) {
		.section-nav,
		.section-nav :global(*) {
			transition: none;
		}
	}
</style>
