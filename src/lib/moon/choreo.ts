import type { MoonState } from './scene';

/**
 * Scroll choreography for the moon. Keyframes are pinned to section offsets inside the scroll
 * container and re-measured on resize, so layout (not magic scroll numbers) decides where each
 * beat lands. Between keyframes the state is eased with smoothstep; Lenis already smooths the
 * scroll position itself.
 */

export type Pose = Omit<
	MoonState,
	'idle' | 'roll' | 'flare' | 'starAlpha' | 'azimuth' | 'wrap' | 'bleed'
>;
interface Keyframe {
	at: number;
	pose: Pose;
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const pose = (p: Partial<Pose> & Pick<Pose, 'x' | 'y' | 'r'>): Pose => ({
	phase: 0,
	corona: 1,
	light: 1,
	spin: 0,
	stars: 0,
	elev: 0,
	...p
});

function offsetIn(container: HTMLElement, id: string) {
	const el = document.getElementById(id);
	if (!el) return 0;
	return (
		el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
	);
}

/**
 * Where the moon sits in the hero. Desktop: centred on the `[data-moon-slot]` element beside the
 * copy. Below that: big and cropped off the top-right corner, with the copy low on the left.
 */
function heroPose(container: HTMLElement): Pose {
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	if (vw < 1024) {
		const r = Math.min(vw * 0.43, vh * 0.27);
		return pose({ x: vw - r * 0.55, y: r * 0.85, r });
	}
	const slot = document.querySelector<HTMLElement>('[data-moon-slot]');
	if (!slot || !slot.offsetWidth)
		return pose({ x: vw * 0.72, y: vh * 0.5, r: Math.min(vw, vh) * 0.26 });
	const rect = slot.getBoundingClientRect();
	// Measure as if scrolled to the top, whatever the current scroll is.
	return pose({
		x: rect.left + rect.width / 2,
		y: rect.top + container.scrollTop + rect.height / 2,
		r: Math.min(rect.width, rect.height) * 0.36
	});
}

export function buildKeyframes(container: HTMLElement): Keyframe[] {
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	const min = Math.min(vw, vh);
	const wide = vw >= 1024;
	const max = container.scrollHeight - container.clientHeight;

	const about = offsetIn(container, 'about');
	const projects = offsetIn(container, 'projects');
	const projectsEnd = projects + (document.getElementById('projects')?.offsetHeight ?? vh) - vh;
	const contact = Math.min(offsetIn(container, 'contact'), max);

	const hero = heroPose(container);

	const aboutPose = pose({
		x: vw * (wide ? 0.84 : 0.82),
		y: vh * (wide ? 0.24 : 0.14),
		r: min * (wide ? 0.13 : 0.16),
		phase: 0.28,
		corona: 0.55,
		spin: 1.2
	});

	// Behind the project grid: big, but kept dim so the cards stay the subject.
	const projectsPose = pose({
		x: vw * 0.5,
		y: vh * 0.52,
		r: min * (wide ? 0.4 : 0.5),
		phase: 0.5,
		corona: 0.12,
		light: 0.2,
		spin: 2.4
	});

	// Full moon rising at the foot of the page, lit from above so its lower half sinks into shadow.
	const contactPose = pose({
		x: vw * 0.5,
		y: vh * (wide ? 0.98 : 0.95),
		r: min * (wide ? 0.42 : 0.5),
		phase: 0.9,
		corona: 0.1,
		light: 0.5,
		spin: 4,
		elev: 2.2
	});

	const frames: Keyframe[] = [
		{ at: 0, pose: hero },
		{ at: Math.max(about - vh * 0.15, 1), pose: aboutPose },
		{ at: Math.max(projects - vh * 0.1, 2), pose: aboutPose },
		{ at: Math.max(projects + vh * 0.4, 3), pose: projectsPose },
		{ at: Math.max(projectsEnd, projects + vh * 0.4 + 1), pose: projectsPose },
		{
			at: Math.max(contact, projectsEnd + 2),
			pose: { ...contactPose, phase: 0.75, corona: 0.15, light: 0.5 }
		},
		{ at: Math.max(max, contact + 3), pose: contactPose }
	];

	// Stars drift with scroll at a fraction of the content's speed.
	for (const f of frames) f.pose = { ...f.pose, stars: -f.at * 0.12 };
	return frames;
}

export function mixPose(a: Pose, b: Pose, t: number): Pose {
	return {
		x: lerp(a.x, b.x, t),
		y: lerp(a.y, b.y, t),
		r: lerp(a.r, b.r, t),
		phase: lerp(a.phase, b.phase, t),
		corona: lerp(a.corona, b.corona, t),
		light: lerp(a.light, b.light, t),
		spin: lerp(a.spin, b.spin, t),
		stars: lerp(a.stars, b.stars, t),
		elev: lerp(a.elev, b.elev, t)
	};
}

export function poseAt(frames: Keyframe[], scroll: number): Pose {
	if (scroll <= frames[0].at) return frames[0].pose;
	for (let i = 1; i < frames.length; i++) {
		const b = frames[i];
		if (scroll > b.at) continue;
		const a = frames[i - 1];
		const linear = (scroll - a.at) / (b.at - a.at || 1);
		// Stars move linearly, so the starfield never stalls between beats.
		return {
			...mixPose(a.pose, b.pose, smooth(linear)),
			stars: lerp(a.pose.stars, b.pose.stars, linear)
		};
	}
	return frames[frames.length - 1].pose;
}

/**
 * The project pages: a crescent parked top-right that swings toward full and sinks as you read.
 */
export function buildDetailKeyframes(scroller: HTMLElement): Keyframe[] {
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	const min = Math.min(vw, vh);
	const wide = vw >= 1024;
	const max = Math.max(scroller.scrollHeight - scroller.clientHeight, 1);
	const top = pose({
		x: vw * (wide ? 0.86 : 0.82),
		y: vh * (wide ? 0.26 : 0.12),
		r: min * (wide ? 0.17 : 0.15),
		phase: 0.22,
		corona: 0.7,
		light: wide ? 1 : 0.6
	});
	// Sinks to the lower right edge, half off-screen, so it never sits behind the text.
	const bottomR = min * (wide ? 0.24 : 0.2);
	const bottom = pose({
		x: vw - bottomR * 0.25,
		y: vh * 0.78,
		r: bottomR,
		phase: 0.72,
		corona: 0.2,
		light: wide ? 0.4 : 0.3,
		spin: 3,
		elev: 0.6,
		stars: -max * 0.12
	});
	return [
		{ at: 0, pose: top },
		{ at: max, pose: bottom }
	];
}

/** Intro progress, tweened by the caller. Every field ends at its resting value. */
export interface Intro {
	/** Brightness of the sun, 0 = the moon is invisible. */
	light: number;
	/**
	 * How far the sun still has to travel round the moon, radians. Starts most of a turn back, just
	 * behind its right limb, so the light first shows as a sliver on the right edge, swings across
	 * the front (a full moon) and settles behind the upper-left limb: one whole lunar cycle.
	 */
	azimuth: number;
	/** Extra rotation, unwinding to 0, so the craters drift past the terminator. */
	spin: number;
	/** Size, for a slow push-in. */
	scale: number;
	starAlpha: number;
	corona: number;
	flare: number;
	idle: number;
}

// The sun starts just behind the right limb (0.42 + this ≡ -0.25) and unwinds to 0, the long way round.
export const INTRO_AZIMUTH = 2 * Math.PI - 0.67;

export const introStart = (): Intro => ({
	light: 0,
	azimuth: INTRO_AZIMUTH,
	spin: -1.6,
	scale: 0.9,
	starAlpha: 0,
	corona: 0,
	flare: 0,
	idle: 0
});

const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);

/**
 * Light reveals the moon: it never moves; the sun circles it once and leaves it in eclipse.
 * The eclipse itself follows the sun's actual angle, not the clock: as it swings behind the limb,
 * light bleeds round the edge on its side and the corona grows from there round the whole moon.
 */
export function introState(target: Pose, intro: Intro): MoonState {
	// Same angle the scene lights from: 0.42 at rest, behind the upper-left limb.
	const angle = lerp(0.42, Math.PI * 0.97, clamp01(target.phase)) + intro.azimuth;
	const behind = smooth(clamp01((1.1 - angle) / (1.1 - 0.45)));
	const settled = intro.corona;
	return {
		...target,
		wrap: Math.max(smooth(clamp01((1.2 - angle) / (1.2 - 0.42))), settled),
		bleed: behind * (1 - settled) * intro.light,
		r: target.r * intro.scale,
		light: target.light * intro.light,
		azimuth: intro.azimuth,
		spin: target.spin + intro.spin,
		corona: target.corona * Math.max(settled, behind * 0.55),
		roll: 0,
		flare: intro.flare,
		starAlpha: intro.starAlpha,
		idle: intro.idle
	};
}
