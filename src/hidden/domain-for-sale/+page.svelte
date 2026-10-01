<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/domain-for-sale.svg';
</script>

<ProjectDetail
	title="Domain for Sale"
	type={m.project_type_website()}
	tagline={m.project_domainforsale_desc()}
	{icon}
	media={[{ src: '/videos/domain-for-sale.mp4', poster: '/videos/domain-for-sale-poster.webp' }]}
	link="https://ll.si"
	github="https://github.com/lebaaar/domain-for-sale"
	overview={[m.domainforsale_overview_p1(), m.domainforsale_overview_p2()]}
	features={[
		{ title: m.domainforsale_feature1_title(), description: m.domainforsale_feature1_desc() },
		{ title: m.domainforsale_feature2_title(), description: m.domainforsale_feature2_desc() },
		{ title: m.domainforsale_feature3_title(), description: m.domainforsale_feature3_desc() },
		{ title: m.domainforsale_feature4_title(), description: m.domainforsale_feature4_desc() }
	]}
	cta="similar"
/>
