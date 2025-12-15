<script lang="ts">
	import profileImg from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<main>
	<div class="profile" class:visible>
		<img src={profileImg} alt="Lan Lebar" class="avatar" />
		<h1>Lan Lebar</h1>
		<p class="title">Software Developer @ <a href="https://loftware.com" id="loftware">Loftware</a></p>
		<div class="links">
			<a href="https://linkedin.com/in/lan-lebar" target="_blank" rel="noopener">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
				LinkedIn
			</a>
			<a href="https://github.com/lebaaar" target="_blank" rel="noopener">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
				GitHub
			</a>
			<a href="mailto:lanlebar6@gmail.com">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
				Email
			</a>
		</div>
	</div>
</main>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	main {
		height: 85vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #0a0a0b;
		font-family: 'Segoe UI', sans-serif;
		padding-bottom: 15vh;
	}

	.profile {
		text-align: center;
		opacity: 0;
		transform: translateY(20px);
	}

	.profile.visible {
		animation: fadeInUp 0.8s ease forwards;
	}

	.profile.visible .avatar {
		animation: scaleIn 0.6s ease forwards;
	}

	.profile.visible h1 {
		animation: fadeInUp 0.6s ease 0.2s forwards;
		opacity: 0;
	}

	.profile.visible .title {
		animation: fadeInUp 0.6s ease 0.3s forwards;
		opacity: 0;
	}

	.profile.visible .links {
		animation: fadeInUp 0.6s ease 0.4s forwards;
		opacity: 0;
	}

	.profile.visible .links a:nth-child(1) {
		animation: fadeInUp 0.5s ease 0.5s forwards;
		opacity: 0;
	}

	.profile.visible .links a:nth-child(2) {
		animation: fadeInUp 0.5s ease 0.6s forwards;
		opacity: 0;
	}

	.profile.visible .links a:nth-child(3) {
		animation: fadeInUp 0.5s ease 0.7s forwards;
		opacity: 0;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
	}

	.avatar {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		object-fit: cover;
		margin-bottom: 1.5rem;
		opacity: 0;
	}

	h1 {
		color: #fff;
		font-size: 2.5rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
	}

	.title {
		color: #888;
		font-size: 1.1rem;
		margin: 0 0 2rem;
	}

	#loftware {
		color: #888;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	#loftware:hover {
		color: #fff;
		text-decoration: underline;
	}

	.links {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.links a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: #1a1a1b;
		color: #ccc;
		text-decoration: none;
		border-radius: 8px;
		transition: all 0.2s ease;
	}

	.links a:hover {
		background: #222;
		color: #fff;
		transform: translateY(-2px);
	}

	.links svg {
		width: 20px;
		height: 20px;
	}

	@media (max-width: 480px) {
		h1 {
			font-size: 2rem;
		}

		.links {
			flex-direction: column;
			align-items: stretch;
		}

		.links a {
			justify-content: center;
		}
	}
</style>
