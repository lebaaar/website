<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { shine } from '$lib/actions/shine';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/cenko.png';
</script>

{#snippet overviewP2()}
	{m.cenko_overview_p2_prefix()}<a
		use:shine
		href="https://dragonhack.si/"
		target="_blank"
		rel="noopener noreferrer"
		class="link-shine underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200"
		>Dragonhack 2026</a
	>{m.cenko_overview_p2_suffix()}
{/snippet}

<ProjectDetail
	title="Cenko"
	type={m.project_type_mobile()}
	badge={m.in_development()}
	tagline={m.project_cenko_desc()}
	{icon}
	media={[{ src: '/videos/cenko.mp4', poster: '/videos/cenko-poster.webp' }]}
	mediaFit="contain"
	mediaAspect="aspect-[400/888]"
	mediaWidth="mx-auto max-w-sm lg:mx-0"
	mediaAside
	link="https://cenko.app"
	overview={[m.cenko_overview_p1(), overviewP2]}
	features={[
		{ title: m.cenko_feature1_title(), description: m.cenko_feature1_desc() },
		{ title: m.cenko_feature2_title(), description: m.cenko_feature2_desc() },
		{ title: m.cenko_feature3_title(), description: m.cenko_feature3_desc() },
		{ title: m.cenko_feature4_title(), description: m.cenko_feature4_desc() }
	]}
	cta="app"
/>
