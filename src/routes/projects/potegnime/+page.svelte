<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/potegnime.webp';
	import screenshot from '$lib/assets/potegnime-screenshot.webp';
</script>

<ProjectDetail
	title="potegni.me"
	type={m.project_type_webapp()}
	tagline={m.project_potegnime_desc()}
	{icon}
	iconRadius="rounded-full"
	{screenshot}
	link="https://potegni.me"
	github="https://github.com/potegnime"
	overview={[m.potegnime_overview_p1(), m.potegnime_overview_p2()]}
	features={[
		{ title: m.potegnime_feature1_title(), description: m.potegnime_feature1_desc() },
		{ title: m.potegnime_feature2_title(), description: m.potegnime_feature2_desc() },
		{ title: m.potegnime_feature3_title(), description: m.potegnime_feature3_desc() }
	]}
/>
