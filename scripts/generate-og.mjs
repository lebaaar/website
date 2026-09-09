/**
 * Renders the Open Graph images into static/.
 *
 *   node scripts/generate-og.mjs
 *
 * One card per route: static/og-image.png for the site itself and
 * static/og/<slug>.png for every project page. Layout is plain HTML, screenshotted
 * with headless Chrome, so the cards stay in the same visual language as the site
 * (zinc-950 ground, Inter, hairline rings) without pulling a renderer into the build.
 *
 * Requires Chrome/Chromium on PATH and network access on first run (Inter is
 * downloaded once and cached in .cache/og-fonts).
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const messages = JSON.parse(readFileSync(join(root, 'messages/en.json'), 'utf8'));

const projects = [
	{
		slug: 'domacahrana',
		title: 'Domača Hrana',
		desc: 'project_domacahrana_desc',
		icon: 'domacahrana.png',
		bare: true
	},
	{ slug: 'cenko', title: 'Cenko', desc: 'project_cenko_desc', icon: 'cenko.png', radius: '22%' },
	{
		slug: 'potegnime',
		title: 'potegni.me',
		desc: 'project_potegnime_desc',
		icon: 'potegnime.webp',
		radius: '50%'
	},
	{
		slug: 'librelock',
		title: 'LibreLock',
		desc: 'project_librelock_desc',
		icon: 'librelock.svg',
		radius: '22%'
	},
	{
		slug: 'periodtracker',
		title: 'Period Tracker',
		desc: 'project_period_tracker_desc',
		icon: 'period_tracker.webp',
		radius: '50%'
	},
	{
		slug: 'companies',
		title: 'companies.si',
		desc: 'project_companies_desc',
		icon: 'companies.webp',
		radius: '50%'
	},
	{
		slug: 'amadejvidner',
		title: 'Amadej Vidner',
		desc: 'project_amadejvidner_desc',
		icon: 'amadejvidner.webp',
		bare: true
	},
	{
		slug: 'kavarna',
		title: 'Kavarna & Cukrarija',
		desc: 'project_kavarna_cukrarija_desc',
		icon: 'kavarna.webp',
		radius: '50%'
	},
	{
		slug: 'shapers',
		title: 'Shapers Academy',
		desc: 'project_globalshapers_desc',
		icon: 'globalshapers.png',
		radius: '18%',
		iconBg: '#ffffff'
	}
];

const MIME = {
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.jpeg': 'image/jpeg',
	'.jpg': 'image/jpeg'
};

const dataUri = (path) =>
	`data:${MIME[extname(path)]};base64,${readFileSync(path).toString('base64')}`;

/** Inter, inlined so the render never races a webfont request. */
async function interCss() {
	const cacheDir = join(root, '.cache/og-fonts');
	const cached = join(cacheDir, 'inter.css');
	if (existsSync(cached)) return readFileSync(cached, 'utf8');

	const ua =
		'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0 Safari/537.36';
	const css = await (
		await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700', {
			headers: { 'User-Agent': ua }
		})
	).text();

	// Latin + latin-ext only; the Slovenian č/ž live in latin-ext.
	const blocks = css.split('/*').filter((b) => /^\s*(latin|latin-ext)\s*\*\//.test(b));
	const inlined = [];
	for (const block of blocks) {
		const url = block.match(/url\((https:[^)]+)\)/)?.[1];
		if (!url) continue;
		const woff2 = Buffer.from(await (await fetch(url)).arrayBuffer()).toString('base64');
		inlined.push(
			block
				.slice(block.indexOf('*/') + 2)
				.replace(/url\(https:[^)]+\)/, `url(data:font/woff2;base64,${woff2})`)
		);
	}

	const out = inlined.join('\n');
	mkdirSync(cacheDir, { recursive: true });
	writeFileSync(cached, out);
	return out;
}

const shell = (font, body) => `<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<style>
			${font}

			* { margin: 0; padding: 0; box-sizing: border-box; }

			body {
				width: 1200px;
				height: 630px;
				overflow: hidden;
				background: #09090b;
				color: #fafafa;
				font-family: Inter, sans-serif;
				-webkit-font-smoothing: antialiased;
			}

			.card {
				position: relative;
				width: 1200px;
				height: 630px;
				padding: 76px 88px;
				display: flex;
				overflow: hidden;
			}

			/* Same grid + top light as the site background. */
			.grid {
				position: absolute;
				inset: 0;
				background-image:
					linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
					linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
				background-size: 56px 56px;
				mask-image: radial-gradient(120% 100% at 8% 0%, #000 0%, transparent 72%);
			}

			.glow {
				position: absolute;
				inset: 0;
				background:
					radial-gradient(760px 420px at 10% -12%, rgba(255, 255, 255, 0.1), transparent 62%),
					radial-gradient(620px 420px at 96% 108%, rgba(255, 255, 255, 0.05), transparent 60%);
			}

			.content { position: relative; display: flex; width: 100%; }

			h1 {
				font-weight: 600;
				letter-spacing: -0.035em;
				line-height: 1;
				color: #ffffff;
			}

			.foot {
				position: absolute;
				left: 88px;
				bottom: 60px;
				display: flex;
				align-items: center;
				gap: 14px;
				font-size: 23px;
				color: #71717a;
				letter-spacing: -0.01em;
			}

			.foot b { color: #e4e4e7; font-weight: 600; }

			${body}
		</style>
	</head>
	<body>
		<div class="card">
			<div class="glow"></div>
			<div class="grid"></div>
			%CONTENT%
		</div>
	</body>
</html>`;

const homeHtml = (font, photo) =>
	shell(
		font,
		`
			.home { align-items: center; justify-content: space-between; gap: 64px; }
			.home h1 { font-size: 108px; margin: 0 0 22px; }
			.home .role { font-size: 34px; color: #a1a1aa; letter-spacing: -0.015em; }

			.photo {
				position: relative;
				flex: none;
				width: 372px;
				height: 372px;
				border-radius: 999px;
				padding: 3px;
				background: linear-gradient(150deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.06) 55%, rgba(255, 255, 255, 0.02));
				box-shadow: 0 40px 90px rgba(0, 0, 0, 0.55);
			}

			.photo img { width: 100%; height: 100%; border-radius: 999px; object-fit: cover; }
		`
	).replace(
		'%CONTENT%',
		`<div class="content home">
				<div>
					<h1>Lan&nbsp;Lebar</h1>
					<div class="role">Software Developer</div>
				</div>
				<div class="photo"><img src="${photo}" alt="" /></div>
			</div>
			<div class="foot"><b>lan.si</b></div>`
	);

const projectHtml = (font, project, icon) =>
	shell(
		font,
		`
			.project { flex-direction: column; justify-content: center; padding: 0 40px 96px 0; }
			.project > * { flex: none; }
			.project h1 { font-size: 84px; margin: 0 0 24px; }

			.project .tagline {
				font-size: 30px;
				line-height: 1.42;
				height: 86px;
				color: #a1a1aa;
				max-width: 860px;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.icon {
				width: 120px;
				height: 120px;
				margin-bottom: 40px;
				/* Logos that carry their own shape sit bare on the ground; the rest get
				   the same tile treatment the site uses. */
				${
					project.bare
						? 'object-fit: contain;'
						: `border-radius: ${project.radius};
				background: ${project.iconBg ?? 'rgba(255, 255, 255, 0.04)'};
				border: 1px solid rgba(255, 255, 255, 0.12);
				box-shadow: 0 26px 60px rgba(0, 0, 0, 0.6);
				object-fit: cover;`
				}
			}

		`
	).replace(
		'%CONTENT%',
		`<div class="content project">
				<img class="icon" src="${icon}" alt="" />
				<h1>${project.title}</h1>
				<p class="tagline">${messages[project.desc]}</p>
			</div>
			<div class="foot"><b>lan.si</b></div>`
	);

const CHROME =
	process.env.CHROME_BIN ??
	['chromium-browser', 'chromium', 'google-chrome', 'chrome'].find((bin) => {
		try {
			execFileSync('which', [bin], { stdio: 'ignore' });
			return true;
		} catch {
			return false;
		}
	});

function screenshot(html, out) {
	const tmp = join(root, '.cache/og-page.html');
	writeFileSync(tmp, html);
	execFileSync(
		CHROME,
		[
			'--headless',
			'--no-sandbox',
			'--disable-gpu',
			'--hide-scrollbars',
			'--force-device-scale-factor=1',
			'--window-size=1200,630',
			`--screenshot=${out}`,
			`file://${tmp}`
		],
		{ stdio: 'ignore' }
	);
	rmSync(tmp);
	console.log(`  ${out.replace(root + '/', '')}`);
}

if (!CHROME) {
	console.error('No Chrome/Chromium found. Set CHROME_BIN to the binary.');
	process.exit(1);
}

const font = await interCss();
mkdirSync(join(root, 'static/og'), { recursive: true });

console.log('Rendering Open Graph images:');
screenshot(
	homeHtml(font, dataUri(join(root, 'static/me.jpeg'))),
	join(root, 'static/og-image.png')
);

for (const project of projects) {
	const icon = dataUri(join(root, 'src/lib/assets', project.icon));
	screenshot(projectHtml(font, project, icon), join(root, `static/og/${project.slug}.png`));
}
