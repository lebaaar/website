<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/period_tracker.webp';
	import shot1 from '$lib/assets/periodtracker-screenshot.webp';
	import shot2 from '$lib/assets/periodtracker-screenshot-2.webp';
	import shot3 from '$lib/assets/periodtracker-screenshot-3.webp';
	import shot4 from '$lib/assets/periodtracker-screenshot-4.webp';
	import shot5 from '$lib/assets/periodtracker-screenshot-5.webp';
	import playBadge from '$lib/assets/google-play-badge.webp';
</script>

<ProjectDetail
	title="Period Tracker"
	type={m.project_type_mobile()}
	tagline={m.project_period_tracker_desc()}
	{icon}
	iconRadius="rounded-full"
	media={[shot1, shot2, shot3, shot4, shot5]}
	mediaFit="contain"
	mediaAspect="aspect-[900/1600]"
	mediaWidth="mx-auto max-w-sm lg:mx-0"
	mediaAside
	link="https://play.google.com/store/apps/details?id=com.lebaaar.period_tracker"
	linkLabel={m.project_page_playstore()}
	linkBadge={playBadge}
	github="https://github.com/lebaaar/period_tracker"
	overview={[m.periodtracker_overview_p1(), m.periodtracker_overview_p2()]}
	features={[
		{ title: m.periodtracker_feature1_title(), description: m.periodtracker_feature1_desc() },
		{ title: m.periodtracker_feature2_title(), description: m.periodtracker_feature2_desc() },
		{ title: m.periodtracker_feature3_title(), description: m.periodtracker_feature3_desc() },
		{ title: m.periodtracker_feature4_title(), description: m.periodtracker_feature4_desc() }
	]}
/>
