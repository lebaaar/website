<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/kavarna.webp';
	import screenshot from '$lib/assets/kavarna-screenshot.webp';
</script>

<ProjectDetail
	title="Kavarna & Cukrarija"
	type={m.project_type_website()}
	tagline={m.project_kavarna_cukrarija_desc()}
	{icon}
	iconRadius="rounded-full"
	{screenshot}
	link="https://torta-bo.si"
	overview={[m.kavarna_overview_p1()]}
	features={[
		{ title: m.kavarna_feature1_title(), description: m.kavarna_feature1_desc() },
		{ title: m.kavarna_feature2_title(), description: m.kavarna_feature2_desc() },
		{ title: m.kavarna_feature3_title(), description: m.kavarna_feature3_desc() }
	]}
	technologies={['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages']}
/>
