<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/librelock.svg';
	import screenshot from '$lib/assets/librelock-screenshot.webp';
</script>

<ProjectDetail
	title="LibreLock"
	type={m.project_type_webapp()}
	tagline={m.project_librelock_desc()}
	{icon}
	{screenshot}
	screenshotScale={1}
	github="https://github.com/LibreLock"
	overview={[m.librelock_overview_p1(), m.librelock_overview_p2()]}
	features={[
		{ title: m.librelock_feature1_title(), description: m.librelock_feature1_desc() },
		{ title: m.librelock_feature2_title(), description: m.librelock_feature2_desc() },
		{ title: m.librelock_feature3_title(), description: m.librelock_feature3_desc() },
		{ title: m.librelock_feature4_title(), description: m.librelock_feature4_desc() }
	]}
/>
