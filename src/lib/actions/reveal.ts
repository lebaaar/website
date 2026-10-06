import { gsap, prefersReducedMotion } from '$lib/motion/scroll';

export interface RevealOptions {
	/** Stagger the children instead of animating the element itself. */
	stagger?: number;
	y?: number;
	delay?: number;
	/** How far above the viewport's bottom edge the element must reach, as a CSS margin. */
	offset?: string;
	/** Wipe up from the bottom, for media. */
	clip?: boolean;
}

// An IntersectionObserver rather than a ScrollTrigger: ScrollTrigger caches trigger positions and
// only recomputes them on window resize, so content shifting inside the scroll container (lazy
// images, mobile URL bar) left the last sections waiting on a start they could never reach,
// stuck at opacity 0. The observer measures live geometry every time.
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { stagger, y = 48, delay = 0, offset = '12%', clip = false } = options;
	const targets = stagger ? Array.from(node.children) : node;
	const reduced = prefersReducedMotion();

	const tween =
		clip && !reduced
			? gsap.from(targets, {
					clipPath: 'inset(100% 0% 0% 0% round 1.5rem)',
					scale: 1.02,
					duration: 1.1,
					ease: 'power3.out',
					delay,
					clearProps: 'clipPath,transform',
					paused: true
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
					paused: true
				});

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				// Also reveal anything already scrolled past, e.g. after a restored scroll position.
				if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) continue;
				tween.play();
				observer.disconnect();
				return;
			}
		},
		{ rootMargin: `0px 0px -${offset} 0px` }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
			tween.kill();
		}
	};
}
