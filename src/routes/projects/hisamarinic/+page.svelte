<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/hisamarinic.png';
</script>

<ProjectDetail
	title="Hiša Marinič"
	type={m.project_type_webapp()}
	tagline={m.project_hisamarinic_desc()}
	{icon}
	iconShadow=""
	media={[{ src: '/videos/hisamarinic.mp4', poster: '/videos/hisamarinic-poster.webp' }]}
	mediaFit="contain"
	mediaAspect="aspect-[1280/638]"
	link="https://hisamarinic.si"
	overview={[m.hisamarinic_overview_p1(), m.hisamarinic_overview_p2()]}
	features={[
		{ title: m.hisamarinic_feature1_title(), description: m.hisamarinic_feature1_desc() },
		{ title: m.hisamarinic_feature2_title(), description: m.hisamarinic_feature2_desc() },
		{ title: m.hisamarinic_feature3_title(), description: m.hisamarinic_feature3_desc() },
		{ title: m.hisamarinic_feature4_title(), description: m.hisamarinic_feature4_desc() }
	]}
	cta="business"
/>
