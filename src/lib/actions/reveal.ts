import { gsap, ScrollTrigger, prefersReducedMotion } from '$lib/motion/scroll';

export interface RevealOptions {
	/** Stagger the children instead of animating the element itself. */
	stagger?: number;
	y?: number;
	delay?: number;
	start?: string;
	/** Wipe up from the bottom, for media. */
	clip?: boolean;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { stagger, y = 48, delay = 0, start = 'top 88%', clip = false } = options;
	const targets = stagger ? Array.from(node.children) : node;
	const reduced = prefersReducedMotion();
	const scrollTrigger = {
		trigger: node,
		// The home page scrolls its own container, project pages scroll the window.
		scroller: node.closest('.scroll-container') ?? window,
		start,
		once: true
	};

	const tween =
		clip && !reduced
			? gsap.from(targets, {
					clipPath: 'inset(100% 0% 0% 0% round 1.5rem)',
					scale: 1.02,
					duration: 1.1,
					ease: 'power3.out',
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
