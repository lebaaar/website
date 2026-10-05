<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { shine } from '$lib/actions/shine';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/doomwalk.webp';
	import shot1 from '$lib/assets/doomwalk-screenshot.webp';
	import shot2 from '$lib/assets/doomwalk-screenshot-2.webp';
	import shot3 from '$lib/assets/doomwalk-screenshot-3.webp';
	import shot4 from '$lib/assets/doomwalk-screenshot-4.webp';
	import shot5 from '$lib/assets/doomwalk-screenshot-5.webp';
</script>

{#snippet overview()}
	{m.doomwalk_overview_prefix()}<a
		use:shine
		href="https://hackchalmers.se"
		target="_blank"
		rel="noopener noreferrer"
		class="link-shine underline decoration-zinc-500/60 underline-offset-4 transition hover:text-zinc-200"
		>Hack Chalmers</a
	>{m.doomwalk_overview_suffix()}
{/snippet}

<ProjectDetail
	title="DoomWalk"
	type={m.project_type_mobile()}
	tagline={m.project_doomwalk_desc()}
	{icon}
	media={[shot1, shot2, shot3, shot4, shot5]}
	mediaFit="contain"
	mediaAspect="aspect-[900/1600]"
	mediaWidth="mx-auto max-w-sm lg:mx-0"
	mediaAside
	github="https://github.com/lebaaar/doomwalk"
	overview={[overview]}
	features={[
		{ title: m.doomwalk_feature1_title(), description: m.doomwalk_feature1_desc() },
		{ title: m.doomwalk_feature2_title(), description: m.doomwalk_feature2_desc() },
		{ title: m.doomwalk_feature3_title(), description: m.doomwalk_feature3_desc() },
		{ title: m.doomwalk_feature4_title(), description: m.doomwalk_feature4_desc() }
	]}
	cta="app"
/>
