Pages not currenltly shown on the site are parked here. This is a temporary measure to keep them unpublished while they're in development.

Pages parked here are not in the `routes` directory, so they 404. To restore one:
- Move it back to `src/routes/projects/<slug>/`
- Uncomment its card in `Projects.svelte`
- Add the slug to `PROJECT_SLUGS` in `src/lib/seo.ts` if it needs OG/sitemap.
