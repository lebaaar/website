<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$paraglide/messages';
	import { shine } from '$lib/actions/shine';
	import { isValidEmail, MAX_EMAIL, MAX_MESSAGE } from '$lib/validation';

	type Status = 'idle' | 'sending' | 'sent';
	// 'server' renders with an inline mailto fallback, so errors are held as a
	// code and turned into markup at render time rather than a flat string.
	type ErrorCode = 'missing' | 'email' | 'long' | 'rate' | 'server';

	let seen = false;
	let visible = $state(seen);
	let sectionEl = $state<HTMLElement | null>(null);

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let company = $state(''); // Honeypot; hidden from real users.
	let emailEl = $state<HTMLInputElement | null>(null);
	let status = $state<Status>('idle');
	let error = $state<ErrorCode | ''>('');

	// The inline email error only appears once the field has been left or the
	// form submitted, so it doesn't fire while the address is still half-typed.
	let emailTouched = $state(false);
	const emailValid = $derived(isValidEmail(email.trim()));
	const showEmailError = $derived(emailTouched && email.trim() !== '' && !emailValid);

	// The counter stays out of the way until the message is near the cap.
	const showCounter = $derived(message.length > MAX_MESSAGE * 0.9);

	const errorMessages: Record<Exclude<ErrorCode, 'server'>, () => string> = {
		missing: m.contact_error_missing,
		email: m.contact_error_email,
		long: m.contact_error_long,
		rate: m.contact_error_rate
	};

	function isKnownError(code: unknown): code is Exclude<ErrorCode, 'server'> {
		return typeof code === 'string' && code in errorMessages;
	}

	onMount(() => {
		if (seen) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					seen = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		if (sectionEl) observer.observe(sectionEl);
		return () => observer.disconnect();
	});

	// Typing anywhere clears the form-level error, so a stale one can't linger
	// next to a field the visitor has already fixed.
	function clearError() {
		error = '';
	}

	// Enter already submits from the single-line inputs; the textarea needs the
	// modifier so a plain Enter can still start a new line.
	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Enter' || !(event.ctrlKey || event.metaKey)) return;
		event.preventDefault();
		(event.currentTarget as HTMLTextAreaElement).form?.requestSubmit();
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		if (status === 'sending') return;

		error = '';
		emailTouched = true;

		if (!name.trim() || !email.trim() || !message.trim()) {
			error = 'missing';
			return;
		}

		if (!emailValid) {
			emailEl?.focus();
			return;
		}

		status = 'sending';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ name, email, message, company })
			});
			const body = await response.json().catch(() => ({}));

			if (!response.ok) {
				error = isKnownError(body?.error) ? body.error : 'server';
				status = 'idle';
				return;
			}

			name = '';
			email = '';
			message = '';
			emailTouched = false;
			status = 'sent';
		} catch {
			error = 'server';
			status = 'idle';
		}
	}

	const services = [
		{ title: m.contact_service1_title(), desc: m.contact_service1_desc() },
		{ title: m.contact_service2_title(), desc: m.contact_service2_desc() },
		{ title: m.contact_service3_title(), desc: m.contact_service3_desc() },
		{ title: m.contact_service4_title(), desc: m.contact_service4_desc() }
	];

	const fieldClass =
		'w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-base text-zinc-100 placeholder:text-zinc-600 transition-colors hover:border-zinc-600 focus:border-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 disabled:opacity-60';
	const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-400';
</script>

<section
	id="contact"
	bind:this={sectionEl}
	class={`mx-auto w-full max-w-7xl px-4 py-12 transition-all duration-700 sm:px-8 lg:py-16 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
>
	<div class="grid items-start gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
		<div class="lg:sticky lg:top-8 lg:py-4">
			<h2 use:shine={{ hitTest: true }} class="title-shimmer mb-3 pb-2 text-4xl font-bold text-white sm:text-5xl">
				{m.contact_title()}
			</h2>
			<p class="text-base leading-8 text-zinc-400 sm:text-lg">
				{m.contact_subtitle()}
				<br>
				{m.contact_lead()}
			</p>

			<!-- Below lg the items flow into a wrapping row and the descriptions drop
			     away, so four stacked blocks become two compact lines. -->
			<ul class="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 lg:mt-6 lg:block lg:space-y-4">
				{#each services as service (service.title)}
					<li class="flex items-center gap-1.5 lg:items-start lg:gap-3">
						<span aria-hidden="true" class="shrink-0 text-zinc-500 lg:mt-1">
							<svg class="h-3.5 w-3.5 lg:h-[18px] lg:w-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
						</span>
						<div>
							<h3 use:shine={{ hitTest: true }} class="title-shimmer text-sm font-medium text-white lg:text-base lg:font-semibold">{service.title}</h3>
							<p class="mt-0.5 hidden text-sm leading-6 text-zinc-500 lg:block">{service.desc}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		<div use:shine class="box-shine relative rounded-2xl border border-zinc-700 bg-zinc-900/80 p-5 shadow-xl shadow-black/20 backdrop-blur transition-colors hover:border-zinc-500 sm:p-6">
			{#if status === 'sent'}
				<div class="flex flex-col items-center gap-4 py-6 text-center">
					<div class="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 text-zinc-100">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
					</div>
					<p class="text-lg text-zinc-200">{m.contact_success()}</p>
					<button
						use:shine
						type="button"
						onclick={() => (status = 'idle')}
						class="btn-shine cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
					>
						<span use:shine={{ within: '.btn-shine' }} class="btn-shine-label">{m.contact_send_another()}</span>
					</button>
				</div>
			{:else}
				<form onsubmit={submit} novalidate class="space-y-4">
					<!-- Honeypot: off-screen and skipped by tab order, so only bots reach it. -->
					<div class="absolute -left-[9999px]" aria-hidden="true">
						<label for="contact-company">Company</label>
						<input id="contact-company" name="company" type="text" tabindex="-1" autocomplete="off" bind:value={company} />
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						<div>
							<label class={labelClass} for="contact-name">{m.contact_name_label()}</label>
							<input
								id="contact-name"
								type="text"
								required
								maxlength="100"
								autocomplete="name"
								placeholder={m.contact_name_placeholder()}
								disabled={status === 'sending'}
								bind:value={name}
								oninput={clearError}
								class={fieldClass}
							/>
						</div>
						<div>
							<label class={labelClass} for="contact-email">{m.contact_email_label()}</label>
							<input
								id="contact-email"
								type="email"
								required
								maxlength={MAX_EMAIL}
								autocomplete="email"
								placeholder={m.contact_email_placeholder()}
								disabled={status === 'sending'}
								aria-invalid={showEmailError}
								aria-describedby={showEmailError ? 'contact-email-error' : undefined}
								bind:this={emailEl}
								bind:value={email}
								oninput={() => {
								emailTouched = false;
								clearError();
							}}
								onblur={() => (emailTouched = true)}
								class={`${fieldClass} ${showEmailError ? 'border-red-500/70 hover:border-red-500/70 focus:border-red-500' : ''}`}
							/>
							{#if showEmailError}
								<p id="contact-email-error" class="mt-1 text-sm text-red-400">{m.contact_error_email()}</p>
							{/if}
						</div>
					</div>

					<div>
						<div class="flex items-baseline justify-between">
							<label class={labelClass} for="contact-message">{m.contact_message_label()}</label>
							{#if showCounter}
								<span aria-hidden="true" class="mb-1.5 text-xs tabular-nums text-zinc-500">
									{message.length} / {MAX_MESSAGE}
								</span>
							{/if}
						</div>
						<textarea
							id="contact-message"
							required
							rows="5"
							maxlength={MAX_MESSAGE}
							placeholder={m.contact_message_placeholder()}
							disabled={status === 'sending'}
							bind:value={message}
							oninput={clearError}
							onkeydown={handleKeydown}
							class={`${fieldClass} resize-y`}
						></textarea>
					</div>

					{#if error === 'server'}
						<p role="alert" class="text-sm font-medium text-red-400">
							{m.contact_error_server_prefix()}<a
								use:shine
								href="mailto:hello@lan.si"
								class="link-shine underline decoration-red-400/60 underline-offset-4 transition hover:text-red-300"
							>hello@lan.si</a>{m.contact_error_server_suffix()}
						</p>
					{:else if error}
						<p role="alert" class="text-sm font-medium text-red-400">{errorMessages[error]()}</p>
					{/if}

					<button
						use:shine
						type="submit"
						disabled={status === 'sending' || showEmailError}
						class="btn-shine shine-dark flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-400 bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
					>
						{#if status === 'sending'}
							<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
							{m.contact_sending()}
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
							{m.contact_submit()}
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	/* The shared sweep is white, which is invisible on a light button, so this
	   one sweeps dark instead. */
	.shine-dark::before {
		background: linear-gradient(
			100deg,
			rgb(0 0 0 / 0) calc(50% - var(--sweep-width)),
			rgb(0 0 0 / var(--sweep-alpha)) 50%,
			rgb(0 0 0 / 0) calc(50% + var(--sweep-width))
		);
	}

	.shine-dark {
		--sweep-alpha: 0.14;
		--sweep-width: 4.5rem;
	}
</style>
