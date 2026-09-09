<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/globalshapers.png';
</script>

<ProjectDetail
	title="Shapers Academy"
	type={m.project_type_website()}
	tagline={m.project_globalshapers_desc()}
	{icon}
	iconBg="bg-white"
	iconRadius="rounded-xl"
	media={[{ src: '/videos/shapers.mp4', poster: '/videos/shapers-poster.webp' }]}
	mediaFit="contain"
	mediaAspect="aspect-[1280/624]"
	link="https://academy.globalshapers.si"
	overview={[m.shapers_overview_p1()]}
	features={[
		{ title: m.shapers_feature1_title(), description: m.shapers_feature1_desc() },
		{ title: m.shapers_feature2_title(), description: m.shapers_feature2_desc() }
	]}
/>
