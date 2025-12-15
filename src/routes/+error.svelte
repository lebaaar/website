<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	const messages: Record<number, string> = {
		404: "This page doesn't exist",
		500: 'Something went wrong',
		403: 'Access denied'
	};

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<main>
	<div class="error" class:visible>
		<h1>{page.status}</h1>
		<p class="message">{messages[page.status] || page.error?.message || 'An error occurred'}</p>
		<a href="/" class="btn">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
			Back to home
		</a>
	</div>
</main>

<style>
	.error {
		text-align: center;
		opacity: 0;
		transform: translateY(20px);
	}

	.error.visible {
		animation: fadeInUp 0.8s ease forwards;
	}

	.error.visible h1 {
		animation: fadeInUp 0.6s ease 0.2s forwards;
		opacity: 0;
	}

	.error.visible .message {
		animation: fadeInUp 0.6s ease 0.3s forwards;
		opacity: 0;
	}

	.error.visible .btn {
		animation: fadeInUp 0.5s ease 0.4s forwards;
		opacity: 0;
	}

	h1 {
		font-size: 6rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
	}

	.message {
		color: #888;
		font-size: 1.1rem;
		margin: 0 0 2rem;
	}

	@media (max-width: 480px) {
		h1 {
			font-size: 4rem;
		}
	}
</style>