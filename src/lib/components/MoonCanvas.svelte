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
		/** `detail` follows the window scroll and plays a shorter intro. */
		mode?: 'home' | 'detail';
		container?: HTMLElement;
	}

	let { mode = 'home', container }: Props = $props();

	// Extra spin per px/s of scroll velocity.
	const SCROLL_SPIN = 0.0007;

	let canvas = $state<HTMLCanvasElement>();
	let shade = $state<HTMLDivElement>();
	let live = $state(false);
	let failed = $state(false);

	// An effect, not onMount, because the parent binds `container` after this mounts.
	$effect(() => {
		const home = mode === 'home';
		const scroller = home ? container : document.documentElement;
		if (!scroller || !canvas || prefersReducedMotion()) return;
		const canvasEl = canvas;
		const build = home ? buildKeyframes : buildDetailKeyframes;

		let frames = build(scroller);
		const intro = introStart();
		const shadeEl = shade;
		let lastScroll = scroller.scrollTop;
		let lastTime = performance.now();
		let scrollVelocity = 0;
		const getState = () => {
			const scroll = scroller.scrollTop;
			if (shadeEl) {
				const left = scroller.scrollHeight - scroller.clientHeight - scroll;
				const t = 1 - left / (scroller.clientHeight * 1.2);
				shadeEl.style.opacity = String(Math.min(Math.max(t, 0), 1));
			}
			const now = performance.now();
			const dt = Math.max((now - lastTime) / 1000, 1 / 240);
			const velocity = Math.max(Math.min((scroll - lastScroll) / dt, 6000), -6000);
			scrollVelocity += (velocity - scrollVelocity) * Math.min(dt * 6, 1);
			lastScroll = scroll;
			lastTime = now;
			return {
				...introState(poseAt(frames, scroll), intro),
				spinRate: scrollVelocity * SCROLL_SPIN
			};
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

				// Returning from a project page skips straight to the finished scene.
				if (home && introPlayed) {
					timeline.progress(1);
					window.dispatchEvent(new Event('moon:settled'));
				}
				if (home) introPlayed = true;
			})
			.catch(() => {
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
	<div
		class:hidden={mode !== 'home'}
		bind:this={shade}
		class="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent opacity-0"
	></div>
	<!-- Fallback for reduced motion or no WebGL. -->
	<img
		class:hidden={mode !== 'home'}
		src="/moon/eclipse.webp"
		alt=""
		class={`absolute inset-0 h-full w-full object-cover motion-reduce:opacity-100 motion-reduce:lg:translate-x-1/5 motion-reduce:lg:[mask-image:linear-gradient(to_right,transparent,black_30%)] ${failed ? 'opacity-100' : 'opacity-0'}`}
	/>
</div>
