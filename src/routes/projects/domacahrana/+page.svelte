<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/domacahrana.png';
	import screenshot from '$lib/assets/domacahrana-screenshot.webp';
</script>

<ProjectDetail
	title="Domača Hrana"
	type={m.project_type_webapp()}
	tagline={m.project_domacahrana_desc()}
	{icon}
	iconShadow=""
	{screenshot}
	link="https://domacahrana.si"
	overview={[m.domacahrana_overview_p1(), m.domacahrana_overview_p2()]}
	features={[
		{ title: m.domacahrana_feature1_title(), description: m.domacahrana_feature1_desc() },
		{ title: m.domacahrana_feature2_title(), description: m.domacahrana_feature2_desc() },
		{ title: m.domacahrana_feature3_title(), description: m.domacahrana_feature3_desc() },
	]}
/>
