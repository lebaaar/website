<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/amadejvidner.webp';
	import screenshot from '$lib/assets/amadejvidner-screenshot.webp';
</script>

<ProjectDetail
	title="Amadej Vidner"
	type={m.project_type_website()}
	tagline={m.project_amadejvidner_desc()}
	{icon}
	iconRadius="rounded-sm"
	{screenshot}
	screenshotPosition="50% 30%"
	screenshotOpacity={0.8}
	screenshotSaturate={1.4}
	link="https://amadejvidner.com"
	overview={[m.amadejvidner_overview_p1()]}
	features={[
		{ title: m.amadejvidner_feature1_title(), description: m.amadejvidner_feature1_desc() },
		{ title: m.amadejvidner_feature2_title(), description: m.amadejvidner_feature2_desc() },
		{ title: m.amadejvidner_feature3_title(), description: m.amadejvidner_feature3_desc() }
	]}
	technologies={['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Cloudflare Workers']}
/>
