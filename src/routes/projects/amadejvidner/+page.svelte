<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/amadejvidner.webp';
</script>

<ProjectDetail
	title="Amadej Vidner"
	type={m.project_type_website()}
	tagline={m.project_amadejvidner_desc()}
	{icon}
	iconRadius="rounded-sm"
	media={[
		{
			src: '/videos/amadejvidner.mp4',
			poster: '/videos/amadejvidner-poster.webp',
			label: m.media_label_website()
		},
		{
			src: '/videos/amadejvidner-portal.mp4',
			poster: '/videos/amadejvidner-portal-poster.webp',
			label: m.media_label_admin()
		}
	]}
	mediaFit="contain"
	mediaAspect="aspect-[1280/642]"
	link="https://amadejvidner.com"
	overview={[m.amadejvidner_overview_p1()]}
	features={[
		{ title: m.amadejvidner_feature1_title(), description: m.amadejvidner_feature1_desc() },
		{ title: m.amadejvidner_feature2_title(), description: m.amadejvidner_feature2_desc() },
		{ title: m.amadejvidner_feature3_title(), description: m.amadejvidner_feature3_desc() },
		{ title: m.amadejvidner_feature4_title(), description: m.amadejvidner_feature4_desc() },
		{ title: m.amadejvidner_feature5_title(), description: m.amadejvidner_feature5_desc() }
	]}
/>
