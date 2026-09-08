<script lang="ts">
	import * as m from '$paraglide/messages';

	type MediaInput =
		| string
		| { src: string; poster?: string; type?: 'image' | 'video'; label?: string };
	type MediaItem = { src: string; poster?: string; type: 'image' | 'video'; label?: string };

	let {
		media,
		title,
		mediaFit = 'cover',
		mediaAspect = 'aspect-video',
		mediaWidth = '',
		arrowsOutside = false
	}: {
		media: MediaInput[];
		title: string;
		mediaFit?: 'cover' | 'contain';
		mediaAspect?: string;
		mediaWidth?: string;
		arrowsOutside?: boolean;
	} = $props();

	function normalize(item: MediaInput): MediaItem {
		const value = typeof item === 'string' ? { src: item } : item;
		const type = value.type ?? (/\.(mp4|webm|mov)$/i.test(value.src) ? 'video' : 'image');
		return { ...value, type };
	}

	const items = $derived(media.map(normalize));

	let openIndex = $state<number | null>(null);
	let index = $state(0);
	let track = $state<HTMLDivElement | null>(null);
	let resumeAt = 0;
	let slideFrom = $state(0);
	let slideVideos: HTMLVideoElement[] = [];
	// While an arrow-driven scroll is animating, the scroll handler would flip the
	// counter back and forth as the snap settles, so it is pinned to the target.
	let settling = 0;

	function open(i: number) {
		resumeAt = slideVideos[i]?.currentTime ?? 0;
		slideFrom = 0;
		openIndex = i;
	}

	function close() {
		openIndex = null;
	}

	function step(delta: number) {
		if (openIndex === null || items.length < 2) return;
		resumeAt = 0;
		slideFrom = delta;
		openIndex = (openIndex + delta + items.length) % items.length;
	}

	function goTo(next: number) {
		if (!track) return;
		index = (next + items.length) % items.length;
		clearTimeout(settling);
		settling = setTimeout(() => (settling = 0), 700) as unknown as number;
		track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
	}

	// Native scrolling cannot go past the first or last slide, so a swipe that runs
	// into either edge is turned into a wrap, matching what the arrows do.
	let touchX = 0;
	let touchY = 0;

	function onTouchStart(event: TouchEvent) {
		const touch = event.changedTouches[0];
		touchX = touch.clientX;
		touchY = touch.clientY;
	}

	function onTouchEnd(event: TouchEvent) {
		if (!track || items.length < 2) return;
		const touch = event.changedTouches[0];
		const dx = touch.clientX - touchX;
		const dy = touch.clientY - touchY;
		if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;

		const max = track.scrollWidth - track.clientWidth;
		if (dx < 0 && track.scrollLeft >= max - 2) goTo(0);
		else if (dx > 0 && track.scrollLeft <= 2) goTo(items.length - 1);
	}

	let lightboxX = 0;
	let lightboxY = 0;
	// A swipe can be followed by a click, which would close the lightbox right after
	// it navigated, so that click is swallowed once.
	let swallowClick = false;

	function onLightboxTouchStart(event: TouchEvent) {
		const touch = event.changedTouches[0];
		lightboxX = touch.clientX;
		lightboxY = touch.clientY;
	}

	function onLightboxTouchEnd(event: TouchEvent) {
		if (items.length < 2) return;
		const touch = event.changedTouches[0];
		const dx = touch.clientX - lightboxX;
		const dy = touch.clientY - lightboxY;
		if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
		swallowClick = true;
		step(dx < 0 ? 1 : -1);
	}

	function onBackdropClick() {
		if (swallowClick) {
			swallowClick = false;
			return;
		}
		close();
	}

	function onScroll() {
		if (!track || !track.clientWidth || settling) return;
		index = Math.round(track.scrollLeft / track.clientWidth);
	}

	// The gallery sits inside an element that keeps a transform from its entry
	// animation, which would make `position: fixed` resolve against that box.
	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			}
		};
	}

	$effect(() => {
		if (openIndex === null) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previous;
		};
	});

	// Keep the visible slide pinned when the viewport width changes.
	$effect(() => {
		const node = track;
		if (!node) return;
		const observer = new ResizeObserver(() => {
			node.scrollTo({ left: index * node.clientWidth, behavior: 'instant' });
		});
		observer.observe(node);
		return () => observer.disconnect();
	});

	function onKeydown(event: KeyboardEvent) {
		if (openIndex === null) return;
		if (event.key === 'Escape') {
			event.preventDefault();
			close();
		} else if (event.key === 'ArrowRight' && items.length > 1) {
			event.preventDefault();
			step(1);
		} else if (event.key === 'ArrowLeft' && items.length > 1) {
			event.preventDefault();
			step(-1);
		}
	}

	function onTrackKeydown(event: KeyboardEvent) {
		if (items.length < 2) return;
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			goTo(index + 1);
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			goTo(index - 1);
		}
	}

	const arrowClass =
		'pointer-events-auto cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950/80 p-2 text-zinc-300 backdrop-blur-sm transition hover:border-zinc-500 hover:text-white';
	const mediaClass = $derived(
		`${mediaAspect} w-full ${mediaFit === 'contain' ? 'object-contain' : 'object-cover object-top'}`
	);
</script>

<svelte:window onkeydown={onKeydown} />

<div class={`relative ${mediaWidth}`}>
	<div class="relative">
		<div
			class="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-lg shadow-black/40 transition hover:border-zinc-600"
		>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<div
				bind:this={track}
				onscroll={onScroll}
				onkeydown={onTrackKeydown}
				ontouchstart={onTouchStart}
				ontouchend={onTouchEnd}
				class="gallery-track flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
				role="group"
				aria-roledescription="carousel"
				aria-label={title}
				tabindex={items.length > 1 ? 0 : -1}
			>
				{#each items as item, i (i)}
					<button
						type="button"
						class="w-full shrink-0 cursor-pointer snap-center snap-always"
						aria-label={`${title} — ${item.label ?? `${i + 1} / ${items.length}`}`}
						onclick={() => open(i)}
					>
						{#if item.type === 'video'}
							<video
								bind:this={slideVideos[i]}
								src={item.src}
								poster={item.poster}
								class={mediaClass}
								autoplay
								muted
								loop
								playsinline
								preload="metadata"
							></video>
						{:else}
							<img
								src={item.src}
								alt={`${title} — ${item.label ?? i + 1}`}
								class={mediaClass}
								loading={i === 0 ? 'eager' : 'lazy'}
							/>
						{/if}
					</button>
				{/each}
			</div>
		</div>

		{#if items.length > 1}
			<div
				class={`pointer-events-none absolute inset-y-0 z-10 hidden items-center justify-between sm:flex ${
					arrowsOutside ? '-right-16 -left-16' : 'right-0 left-0 px-3'
				}`}
			>
				<button
					type="button"
					class={arrowClass}
					aria-label={m.project_page_image_prev()}
					onclick={() => goTo(index - 1)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
				</button>
				<button
					type="button"
					class={arrowClass}
					aria-label={m.project_page_image_next()}
					onclick={() => goTo(index + 1)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
				</button>
			</div>
		{/if}
	</div>

	{#if items[index]?.label || items.length > 1}
		<div class="mt-3 flex items-center justify-between gap-4 text-sm text-zinc-400">
			<span>{items[index]?.label ?? ''}</span>
			{#if items.length > 1}
				<span class="tabular-nums">{index + 1} / {items.length}</span>
			{/if}
		</div>
	{/if}
</div>

{#if openIndex !== null}
	{@const item = items[openIndex]}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		use:portal
		class="lightbox fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-zinc-950/90 p-4 backdrop-blur-sm sm:p-8"
		role="dialog"
		aria-modal="true"
		aria-label={title}
		tabindex="-1"
		onclick={onBackdropClick}
		ontouchstart={onLightboxTouchStart}
		ontouchend={onLightboxTouchEnd}
	>
		<button
			type="button"
			class="absolute top-4 right-4 z-10 cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950/80 p-2 text-zinc-300 transition hover:border-zinc-500 hover:text-white"
			aria-label={m.project_page_image_close()}
			onclick={(e) => {
				e.stopPropagation();
				close();
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
		</button>

		{#if items.length > 1}
			<button
				type="button"
				class="absolute left-2 z-10 cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950/80 p-2 text-zinc-300 transition hover:border-zinc-500 hover:text-white sm:left-6"
				aria-label={m.project_page_image_prev()}
				onclick={(e) => {
					e.stopPropagation();
					step(-1);
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
			</button>
			<button
				type="button"
				class="absolute right-2 z-10 cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950/80 p-2 text-zinc-300 transition hover:border-zinc-500 hover:text-white sm:right-6"
				aria-label={m.project_page_image_next()}
				onclick={(e) => {
					e.stopPropagation();
					step(1);
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
			</button>
		{/if}

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="flex min-h-0 max-w-full flex-1 items-center justify-center"
			onclick={(e) => e.stopPropagation()}
		>
			{#key openIndex}
				<div
					class="lightbox-slide flex min-h-0 max-w-full items-center"
					style={`--slide-from: ${slideFrom}`}
				>
					{#if item.type === 'video'}
						<!-- svelte-ignore a11y_media_has_caption -->
						<video
							src={item.src}
							poster={item.poster}
							class="max-h-full max-w-full rounded-xl object-contain shadow-2xl shadow-black/60"
							autoplay
							loop
							controls
							playsinline
							onloadedmetadata={(e) => (e.currentTarget.currentTime = resumeAt)}
						></video>
					{:else}
						<img
							src={item.src}
							alt={`${title} — ${item.label ?? openIndex + 1}`}
							class="max-h-full max-w-full rounded-xl object-contain shadow-2xl shadow-black/60"
						/>
					{/if}
				</div>
			{/key}
		</div>

		{#if item.label || items.length > 1}
			<p class="shrink-0 text-sm text-zinc-400">
				{#if item.label}{item.label}{/if}
				{#if item.label && items.length > 1}
					<span class="px-1 text-zinc-600">·</span>
				{/if}
				{#if items.length > 1}
					<span class="tabular-nums">{openIndex + 1} / {items.length}</span>
				{/if}
			</p>
		{/if}
	</div>
{/if}

<style>
	.gallery-track {
	scrollbar-width: none;
	}

	.gallery-track::-webkit-scrollbar {
	display: none;
	}

	.lightbox {
	animation: lightbox-in 200ms ease-out both;
	}

	@keyframes lightbox-in {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
	}

	@media (prefers-reduced-motion: reduce) {
	.lightbox {
		animation: none;
	}
	}
</style>
