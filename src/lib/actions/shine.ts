interface ShineOptions {
	within?: string;
	hitTest?: boolean;
}

export function shine(node: HTMLElement, options: ShineOptions = {}) {
	let detach = () => {};

	function write(event: PointerEvent, hitTest: boolean) {
		const rect = node.getBoundingClientRect();
		if (!rect.width) return;
		const x = ((event.clientX - rect.left) / rect.width) * 100;
		const y = ((event.clientY - rect.top) / rect.height) * 100;
		node.style.setProperty('--shine-x', `${Math.max(-25, Math.min(125, x))}%`);
		node.style.setProperty('--shine-y', `${Math.max(-25, Math.min(125, y))}%`);

		if (hitTest) {
			const over = x >= 0 && x <= 100 && y >= 14 && y <= 86;
			node.style.setProperty('--shine', over ? '1' : '0');
		}
	}

	function attach(opts: ShineOptions) {
		detach();
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const ancestor = opts.within
			? node.closest<HTMLElement>(opts.within)
			: opts.hitTest
				? node.parentElement
				: null;
		const target = ancestor ?? node;
		const hitTest = opts.hitTest === true;

		let frame = 0;
		let latest: PointerEvent | null = null;

		const onMove = (event: PointerEvent) => {
			if (event.pointerType !== 'mouse') return;
			latest = event;
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				if (latest) write(latest, hitTest);
			});
		};

		const onEnter = (event: PointerEvent) => {
			if (event.pointerType !== 'mouse') return;
			node.setAttribute('data-shine-jump', '');
			node.style.transition = 'none';
			write(event, hitTest);
			void node.offsetWidth;
			node.style.transition = '';
			node.removeAttribute('data-shine-jump');
		};

		const onLeave = () => node.style.setProperty('--shine', '0');

		target.addEventListener('pointerenter', onEnter);
		target.addEventListener('pointermove', onMove);
		if (hitTest) target.addEventListener('pointerleave', onLeave);

		detach = () => {
			if (frame) cancelAnimationFrame(frame);
			target.removeEventListener('pointerenter', onEnter);
			target.removeEventListener('pointermove', onMove);
			target.removeEventListener('pointerleave', onLeave);
		};
	}

	attach(options);

	return {
		update(next: ShineOptions = {}) {
			attach(next);
		},
		destroy() {
			detach();
		}
	};
}
