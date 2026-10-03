import { gsap, ScrollTrigger, prefersReducedMotion } from '$lib/motion/scroll';

export interface RevealOptions {
	/** Animate the element's children one after another instead of the element itself. */
	stagger?: number;
	/** Start offset in px. */
	y?: number;
	delay?: number;
	/** ScrollTrigger start, e.g. 'top 85%'. */
	start?: string;
	/** Unmask from the bottom up with a slight zoom, for media. */
	clip?: boolean;
}

/**
 * Fades and lifts an element (or its children) into view once, when it scrolls into the
 * `.scroll-container`. Under reduced motion it only fades.
 */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { stagger, y = 48, delay = 0, start = 'top 88%', clip = false } = options;
	const targets = stagger ? Array.from(node.children) : node;
	const reduced = prefersReducedMotion();
	const scrollTrigger = {
		trigger: node,
		// The home page scrolls its own container; project pages scroll the window.
		scroller: node.closest('.scroll-container') ?? window,
		start,
		once: true
	};

	const tween =
		clip && !reduced
			? gsap.from(targets, {
					clipPath: 'inset(100% 0% 0% 0% round 1.5rem)',
					scale: 1.08,
					duration: 1.4,
					ease: 'expo.inOut',
					delay,
					clearProps: 'clipPath,transform',
					scrollTrigger
				})
			: gsap.from(targets, {
					opacity: 0,
					y: reduced ? 0 : y,
					filter: reduced ? 'none' : 'blur(10px)',
					duration: reduced ? 0.4 : 1.1,
					ease: 'expo.out',
					delay,
					stagger: stagger ?? 0,
					clearProps: 'transform,filter',
					scrollTrigger
				});

	return {
		destroy() {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}

export { ScrollTrigger };
