import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

// Pass the wrapper and content on the home page; pass nothing to scroll the window.
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

export function scrollToTarget(target: HTMLElement, instant = false) {
	if (lenis) {
		lenis.scrollTo(target, { immediate: instant, duration: 1.4 });
		return;
	}
	target.scrollIntoView({ behavior: instant ? 'instant' : 'smooth', block: 'start' });
}

export { gsap, ScrollTrigger };
