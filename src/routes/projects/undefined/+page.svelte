<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { shine } from '$lib/actions/shine';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/undefined.webp';

	const linkClass =
		'link-shine underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200';
</script>

{#snippet overviewP2()}
	{m.undefined_overview_p2_prefix()}<a
		use:shine
		href="https://builderbase.com/event/gothenburg-tech-week-x-chalmers-hackathon"
		target="_blank"
		rel="noopener noreferrer"
		class={linkClass}>{m.undefined_overview_p2_hackathon()}</a
	>{m.undefined_overview_p2_middle()}<a
		use:shine
		href="https://www.saab.com/"
		target="_blank"
		rel="noopener noreferrer"
		class={linkClass}>Saab</a
	>{m.undefined_overview_p2_suffix()}
{/snippet}

<ProjectDetail
	title="undefined"
	type={m.project_type_webapp()}
	tagline={m.project_undefined_desc()}
	{icon}
	media={[{ src: '/videos/undefined.mp4', poster: '/videos/undefined-poster.webp' }]}
	mediaFit="contain"
	github="https://github.com/undefined-application/"
	overview={[m.undefined_overview_p1(), overviewP2]}
	features={[
		{ title: m.undefined_feature1_title(), description: m.undefined_feature1_desc() },
		{ title: m.undefined_feature2_title(), description: m.undefined_feature2_desc() },
		{ title: m.undefined_feature3_title(), description: m.undefined_feature3_desc() },
		{ title: m.undefined_feature4_title(), description: m.undefined_feature4_desc() }
	]}
	cta="idea"
/>
