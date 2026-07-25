<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/globalshapers.png';
	import screenshot from '$lib/assets/shapers-screenshot.webp';
</script>

<ProjectDetail
	title="Shapers Academy"
	type={m.project_type_website()}
	tagline={m.project_globalshapers_desc()}
	{icon}
	iconBg="bg-white"
	iconRadius="rounded-xl"
	{screenshot}
	link="https://academy.globalshapers.si"
	overview={[m.shapers_overview_p1()]}
	features={[
		{ title: m.shapers_feature1_title(), description: m.shapers_feature1_desc() },
		{ title: m.shapers_feature2_title(), description: m.shapers_feature2_desc() }
	]}
	technologies={['SvelteKit', 'Tailwind CSS', 'Cloudflare Pages']}
/>
