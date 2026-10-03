<script lang="ts" module>
	let introPlayed = false;
</script>

<script lang="ts">
	import {
		buildDetailKeyframes,
		buildKeyframes,
		introStart,
		introState,
		poseAt
	} from '$lib/moon/choreo';
	import { gsap, prefersReducedMotion } from '$lib/motion/scroll';

	interface Props {
		/**
		 * `home`: the full choreography, following `container`. `detail`: a project page, following
		 * the window's scroll, with a shorter eclipse on arrival.
		 */
		mode?: 'home' | 'detail';
		/** The home page's scroll container. */
		container?: HTMLElement;
	}

	let { mode = 'home', container }: Props = $props();

	let canvas = $state<HTMLCanvasElement>();
	let shade = $state<HTMLDivElement>();
	let live = $state(false);
	let failed = $state(false);

	// An effect rather than onMount: the parent binds `container` after this component mounts.
	$effect(() => {
		const home = mode === 'home';
		const scroller = home ? container : document.documentElement;
		if (!scroller || !canvas || prefersReducedMotion()) return;
		const canvasEl = canvas;
		const build = home ? buildKeyframes : buildDetailKeyframes;

		let frames = build(scroller);
		const intro = introStart();
		const shadeEl = shade;
		const getState = () => {
			const scroll = scroller.scrollTop;
			// Fade the bottom shade in over the last screen and a bit of the page.
			if (shadeEl) {
				const left = scroller.scrollHeight - scroller.clientHeight - scroll;
				const t = 1 - left / (scroller.clientHeight * 1.2);
				shadeEl.style.opacity = String(Math.min(Math.max(t, 0), 1));
			}
			return introState(poseAt(frames, scroll), intro);
		};

		let disposed = false;
		let dispose = () => {};
		let resizeScene = () => {};

		const relayout = () => {
			frames = build(scroller);
			resizeScene();
		};
		const observer = new ResizeObserver(relayout);
		observer.observe(home ? (scroller.firstElementChild ?? scroller) : document.body);
		window.addEventListener('resize', relayout);

		import('$lib/moon/scene')
			.then(({ createMoonScene }) => createMoonScene(canvasEl, getState))
			.then((scene) => {
				if (disposed) return scene.dispose();
				dispose = scene.dispose;
				resizeScene = scene.resize;
				live = true;
				// Light reveals the moon. Out of the dark a sliver catches on its right limb, the sun
				// swings once round the front (crescent, half, full, waning) while the moon slowly turns,
				// and as it slips behind the upper-left limb the rim flashes and the corona blooms.
				// Project pages get a quicker cut of the same thing.
				const k = home ? 1 : 0.5;
				const sweep = 4.4 * k;
				const settle = 0.4 + sweep;
				const timeline = gsap
					.timeline()
					.to(intro, { starAlpha: 1, duration: 1.6 * k, ease: 'power1.out' }, 0)
					.to(intro, { light: 1, duration: 1 * k, ease: 'power1.in' }, 0.3)
					.to(intro, { azimuth: 0, duration: sweep, ease: 'power2.inOut' }, 0.4)
					.to(intro, { spin: 0, duration: sweep + 0.6, ease: 'power2.out' }, 0.4)
					.to(intro, { scale: 1, duration: sweep + 0.6, ease: 'power3.out' }, 0.4)
					.to(intro, { idle: 1, duration: 1.5, ease: 'power1.in' }, settle - 1)
					.to(intro, { corona: 1, duration: 2.4, ease: 'expo.out' }, settle - 0.1)
					.call(() => window.dispatchEvent(new Event('moon:settled')), [], settle - 1.2 * k);

				// Baily's beads only belong to a total eclipse, which is where the home page comes to
				// rest; project pages settle on a lit crescent, so they skip the flash.
				if (home) {
					timeline
						.to(intro, { flare: 1, duration: 0.35, ease: 'power2.out' }, settle - 0.45)
						.to(intro, { flare: 0, duration: 1.2, ease: 'power2.in' }, settle - 0.1);
				}

				// The home page plays it once per page load; coming back from a project page (a
				// client-side navigation) lands straight on the finished scene.
				if (home && introPlayed) {
					timeline.progress(1);
					window.dispatchEvent(new Event('moon:settled'));
				}
				if (home) introPlayed = true;
			})
			.catch(() => {
				// No WebGL or textures failed: fall back to the still photo.
				failed = true;
				window.dispatchEvent(new Event('moon:settled'));
			});

		return () => {
			disposed = true;
			observer.disconnect();
			window.removeEventListener('resize', relayout);
			gsap.killTweensOf(intro);
			dispose();
		};
	});
</script>

<div class="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
	<canvas
		bind:this={canvas}
		class={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-out ${live ? 'opacity-100' : 'opacity-0'}`}
	></canvas>
	<!-- Sinks the foot of the viewport into shadow, where the full moon rises at the page's end. -->
	<div
		class:hidden={mode !== 'home'}
		bind:this={shade}
		class="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent opacity-0"
	></div>
	<!-- Only shown when the live moon can't run: reduced motion, no WebGL. -->
	<img
		class:hidden={mode !== 'home'}
		src="/moon/eclipse.webp"
		alt=""
		class={`absolute inset-0 h-full w-full object-cover motion-reduce:opacity-100 motion-reduce:lg:translate-x-1/5 motion-reduce:lg:[mask-image:linear-gradient(to_right,transparent,black_30%)] ${failed ? 'opacity-100' : 'opacity-0'}`}
	/>
</div>
