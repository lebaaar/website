<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/librelock.svg';
</script>

<ProjectDetail
	title="LibreLock"
	type={m.project_type_webapp()}
	tagline={m.project_librelock_desc()}
	{icon}
	media={[{ src: '/videos/librelock.mp4', poster: '/videos/librelock-poster.webp' }]}
	github="https://github.com/LibreLock"
	overview={[m.librelock_overview_p1(), m.librelock_overview_p2()]}
	features={[
		{ title: m.librelock_feature1_title(), description: m.librelock_feature1_desc() },
		{ title: m.librelock_feature2_title(), description: m.librelock_feature2_desc() },
		{ title: m.librelock_feature3_title(), description: m.librelock_feature3_desc() },
		{ title: m.librelock_feature4_title(), description: m.librelock_feature4_desc() }
	]}
/>
