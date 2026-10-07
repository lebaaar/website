<script lang="ts">
	import {
		buildDetailKeyframes,
		buildKeyframes,
		introStart,
		introState,
		mixPose,
		pose,
		poseAt,
		type Pose
	} from '$lib/moon/choreo';
	import { moonStage } from '$lib/moon/stage.svelte';
	import { gsap, prefersReducedMotion } from '$lib/motion/scroll';

	interface Props {
		/** `home` follows the home scroll container, `detail` the window. */
		mode: 'home' | 'detail';
	}

	let { mode }: Props = $props();

	// Extra spin per px/s of scroll velocity.
	const SCROLL_SPIN = 0.0007;
	// Seconds the moon takes to glide to its new pose after a navigation.
	const HANDOFF = 1.4;

	let canvas = $state<HTMLCanvasElement>();
	let shade = $state<HTMLDivElement>();
	let live = $state(false);
	let failed = $state(false);

	type Frames = ReturnType<typeof buildKeyframes>;

	// Mounted once in the layout, so the scene survives navigation. Only `track` is swapped
	// between pages; the moon blends from wherever it was to the new page's pose.
	let track: { scroller: HTMLElement; frames: Frames; home: boolean } | null = null;
	let lastPose: Pose | null = null;
	const blend: { from: Pose | null; t: number } = { from: null, t: 1 };
	const intro = introStart();

	let lastScroll = 0;
	let lastTime = 0;
	let scrollVelocity = 0;

	function getState() {
		const now = performance.now();
		const dt = Math.max((now - lastTime) / 1000, 1 / 240);
		lastTime = now;

		let target = lastPose ?? pose({ x: 0, y: 0, r: 0 });
		let velocity = 0;
		if (track) {
			const { scroller, frames, home } = track;
			const scroll = scroller.scrollTop;
			if (home && shade) {
				const left = scroller.scrollHeight - scroller.clientHeight - scroll;
				const t = 1 - left / (scroller.clientHeight * 1.2);
				shade.style.opacity = String(Math.min(Math.max(t, 0), 1));
			}
			velocity = Math.max(Math.min((scroll - lastScroll) / dt, 6000), -6000);
			lastScroll = scroll;
			target = poseAt(frames, scroll);
		}
		scrollVelocity += (velocity - scrollVelocity) * Math.min(dt * 6, 1);

		const current = blend.from && blend.t < 1 ? mixPose(blend.from, target, blend.t) : target;
		// Only a pose taken from a page is worth blending from, never the hidden placeholder.
		if (track) lastPose = current;
		return { ...introState(current, intro), spinRate: scrollVelocity * SCROLL_SPIN };
	}

	function settle() {
		moonStage.settled = true;
		window.dispatchEvent(new Event('moon:settled'));
	}

	// What the moon follows. Reruns on navigation, and when the home page hands over its container.
	$effect(() => {
		const home = mode === 'home';
		const scroller = home ? moonStage.container : document.documentElement;
		if (!scroller || prefersReducedMotion()) {
			track = null;
			return;
		}
		const build = home ? buildKeyframes : buildDetailKeyframes;
		const next = { scroller, frames: build(scroller), home };

		if (lastPose) {
			blend.from = lastPose;
			blend.t = 0;
			gsap.to(blend, { t: 1, duration: HANDOFF, ease: 'power2.inOut', overwrite: true });
		}
		track = next;
		lastScroll = scroller.scrollTop;

		const relayout = () => (next.frames = build(scroller));
		const observer = new ResizeObserver(relayout);
		observer.observe(home ? (scroller.firstElementChild ?? scroller) : document.body);
		window.addEventListener('resize', relayout);

		return () => {
			observer.disconnect();
			window.removeEventListener('resize', relayout);
		};
	});

	// The scene itself, created once. The intro only plays on the first page load.
	$effect(() => {
		if (!canvas || prefersReducedMotion()) return;
		const canvasEl = canvas;
		lastTime = performance.now();

		let disposed = false;
		let dispose = () => {};
		let resizeScene = () => {};
		const onResize = () => resizeScene();
		window.addEventListener('resize', onResize);

		import('$lib/moon/scene')
			.then(({ createMoonScene }) => createMoonScene(canvasEl, getState))
			.then((scene) => {
				if (disposed) return scene.dispose();
				dispose = scene.dispose;
				resizeScene = scene.resize;
				live = true;
				const k = mode === 'home' ? 1 : 0.5;
				const sweep = 4.4 * k;
				const settleAt = 0.4 + sweep;
				gsap
					.timeline()
					.to(intro, { starAlpha: 1, duration: 1.6 * k, ease: 'power1.out' }, 0)
					.to(intro, { light: 1, duration: 1 * k, ease: 'power1.in' }, 0.3)
					.to(intro, { azimuth: 0, duration: sweep, ease: 'power2.inOut' }, 0.4)
					.to(intro, { spin: 0, duration: sweep + 0.6, ease: 'power2.out' }, 0.4)
					.to(intro, { scale: 1, duration: sweep + 0.6, ease: 'power3.out' }, 0.4)
					.to(intro, { idle: 1, duration: 1.5, ease: 'power1.in' }, settleAt - 1)
					.to(intro, { corona: 1, duration: 2.4, ease: 'expo.out' }, settleAt - 0.1)
					.call(settle, [], settleAt - 1.2 * k);
			})
			.catch(() => {
				failed = true;
				settle();
			});

		return () => {
			disposed = true;
			window.removeEventListener('resize', onResize);
			gsap.killTweensOf(intro);
			gsap.killTweensOf(blend);
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
		class={`absolute inset-0 h-full w-full object-cover motion-reduce:opacity-100 motion-reduce:lg:translate-x-1/5 motion-reduce:lg:mask-[linear-gradient(to_right,transparent,black_30%)] ${failed ? 'opacity-100' : 'opacity-0'}`}
	/>
</div>
