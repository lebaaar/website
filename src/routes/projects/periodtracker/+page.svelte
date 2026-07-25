<script lang="ts">
	import * as m from '$paraglide/messages';
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';
	import icon from '$lib/assets/period_tracker.webp';
	import screenshot from '$lib/assets/periodtracker-screenshot.webp';
	import playBadge from '$lib/assets/google-play-badge.webp';
</script>

<ProjectDetail
	title="Period Tracker"
	type={m.project_type_mobile()}
	tagline={m.project_period_tracker_desc()}
	{icon}
	iconRadius="rounded-full"
	{screenshot}
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
	technologies={['Flutter', 'Dart', 'SQLite', 'Play Store']}
/>
