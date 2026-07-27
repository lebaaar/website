<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/companies.webp';
	import screenshot from '$lib/assets/companies-screenshot.webp';
</script>

<ProjectDetail
	title="companies.si"
	type={m.project_type_webapp()}
	tagline={m.project_companies_desc()}
	{icon}
	iconRadius="rounded-full"
	{screenshot}
	link="https://companies.si"
	overview={[m.companies_overview_p1(), m.companies_overview_p2()]}
	features={[
		{ title: m.companies_feature1_title(), description: m.companies_feature1_desc() },
		{ title: m.companies_feature2_title(), description: m.companies_feature2_desc() },
		{ title: m.companies_feature3_title(), description: m.companies_feature3_desc() },
		{ title: m.companies_feature4_title(), description: m.companies_feature4_desc() }
	]}
/>
