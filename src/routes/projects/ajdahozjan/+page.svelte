<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/ajdahozjan.webp';
</script>

<ProjectDetail
	title="Ajda Hozjan"
	type={m.project_type_website()}
	tagline={m.project_ajdahozjan_desc()}
	{icon}
	iconRadius="rounded-sm"
	media={[{ src: '/videos/ajdahozjan.mp4', poster: '/videos/ajdahozjan-poster.webp' }]}
	mediaFit="contain"
	mediaAspect="aspect-[1280/720]"
	link="https://ajdahozjan.eu"
	overview={[m.ajdahozjan_overview_p1()]}
	features={[
		{ title: m.ajdahozjan_feature1_title(), description: m.ajdahozjan_feature1_desc() },
		{ title: m.ajdahozjan_feature2_title(), description: m.ajdahozjan_feature2_desc() },
		{ title: m.ajdahozjan_feature3_title(), description: m.ajdahozjan_feature3_desc() }
	]}
	cta="business"
/>
