<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/cenko.png';
	import screenshot from '$lib/assets/cenko-screenshot.webp';
</script>

<ProjectDetail
	title="Cenko"
	type={m.project_type_mobile()}
	badge={m.in_development()}
	tagline={m.project_cenko_desc()}
	{icon}
	{screenshot}
	link="https://cenko.app"
	overview={[m.cenko_overview_p1(), m.cenko_overview_p2()]}
	features={[
		{ title: m.cenko_feature1_title(), description: m.cenko_feature1_desc() },
		{ title: m.cenko_feature2_title(), description: m.cenko_feature2_desc() },
		{ title: m.cenko_feature3_title(), description: m.cenko_feature3_desc() },
		{ title: m.cenko_feature4_title(), description: m.cenko_feature4_desc() }
	]}
/>
