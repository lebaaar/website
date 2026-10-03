import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

/** The active Lenis instance, if smooth scrolling is on. */
export const getLenis = () => lenis;

/**
 * Smooth inertial scrolling, driven from GSAP's ticker so ScrollTrigger and Lenis agree on every
 * frame. The home page scrolls its own `.scroll-container` (pass it and its content); project
 * pages scroll the window (pass nothing). Off under reduced motion. Returns a cleanup.
 */
export function initScroll(wrapper?: HTMLElement, content?: HTMLElement) {
	ScrollTrigger.defaults({ scroller: wrapper ?? window });
	if (prefersReducedMotion()) return () => ScrollTrigger.defaults({ scroller: window });

	const instance = new Lenis(
		wrapper && content
			? { wrapper, content, lerp: 0.09, smoothWheel: true }
			: { lerp: 0.09, smoothWheel: true }
	);
	lenis = instance;
	instance.on('scroll', ScrollTrigger.update);
	const tick = (time: number) => instance.raf(time * 1000);
	gsap.ticker.add(tick);
	gsap.ticker.lagSmoothing(0);

	return () => {
		gsap.ticker.remove(tick);
		instance.destroy();
		if (lenis === instance) lenis = null;
		ScrollTrigger.defaults({ scroller: window });
	};
}

/** Scroll the container to `target`, through Lenis when it is running. */
export function scrollToTarget(target: HTMLElement, instant = false) {
	if (lenis) {
		lenis.scrollTo(target, { immediate: instant, duration: 1.4 });
		return;
	}
	target.scrollIntoView({ behavior: instant ? 'instant' : 'smooth', block: 'start' });
}

export { gsap, ScrollTrigger };
