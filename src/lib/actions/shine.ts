interface ShineOptions {
	within?: string;
	hitTest?: boolean;
}

const HIT_TOP = 14;
const HIT_BOTTOM = 86;

export function shine(node: HTMLElement, options: ShineOptions = {}) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const { within, hitTest = false } = options;
	const target =
		(within ? node.closest<HTMLElement>(within) : hitTest ? node.parentElement : null) ?? node;

	let frame = 0;
	let latest: PointerEvent | null = null;

	function write(event: PointerEvent) {
		const rect = node.getBoundingClientRect();
		if (!rect.width) return;

		const x = ((event.clientX - rect.left) / rect.width) * 100;
		node.style.setProperty('--shine-x', `${Math.max(-25, Math.min(125, x))}%`);

		if (!hitTest) return;
		const y = ((event.clientY - rect.top) / rect.height) * 100;
		const over = x >= 0 && x <= 100 && y >= HIT_TOP && y <= HIT_BOTTOM;
		node.style.setProperty('--shine', over ? '1' : '0');
	}

	const onMove = (event: PointerEvent) => {
		if (event.pointerType !== 'mouse') return;
		latest = event;
		if (frame) return;
		frame = requestAnimationFrame(() => {
			frame = 0;
			if (latest) write(latest);
		});
	};

	const onEnter = (event: PointerEvent) => {
		if (event.pointerType !== 'mouse') return;
		node.setAttribute('data-shine-jump', '');
		write(event);
		void node.offsetWidth;
		node.removeAttribute('data-shine-jump');
	};

	const onLeave = () => node.style.setProperty('--shine', '0');

	target.addEventListener('pointerenter', onEnter);
	target.addEventListener('pointermove', onMove);
	if (hitTest) target.addEventListener('pointerleave', onLeave);

	return {
		destroy() {
			if (frame) cancelAnimationFrame(frame);
			target.removeEventListener('pointerenter', onEnter);
			target.removeEventListener('pointermove', onMove);
			target.removeEventListener('pointerleave', onLeave);
		}
	};
}
