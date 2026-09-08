<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/kavarna.webp';
</script>

<ProjectDetail
	title="Kavarna & Cukrarija"
	type={m.project_type_website()}
	tagline={m.project_kavarna_cukrarija_desc()}
	{icon}
	iconRadius="rounded-full"
	media={[{ src: '/videos/kavarna.mp4', poster: '/videos/kavarna-poster.webp' }]}
	mediaFit="contain"
	mediaAspect="aspect-[1280/646]"
	link="https://torta-bo.si"
	overview={[m.kavarna_overview_p1()]}
	features={[
		{ title: m.kavarna_feature1_title(), description: m.kavarna_feature1_desc() },
		{ title: m.kavarna_feature2_title(), description: m.kavarna_feature2_desc() },
		{ title: m.kavarna_feature3_title(), description: m.kavarna_feature3_desc() }
	]}
/>
