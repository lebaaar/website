import * as THREE from 'three';

/** Everything the scene draws, in viewport pixels. Read once per frame. */
export interface MoonState {
	/** Moon centre, px from the viewport's left / top edge. */
	x: number;
	y: number;
	/** Moon radius in px. */
	r: number;
	/** 0 = total eclipse (lit from behind), 1 = full moon (lit from the front). */
	phase: number;
	/** Corona strength, 0..1. */
	corona: number;
	/** Overall brightness multiplier for the moon, 0..1. */
	light: number;
	/** Extra y-rotation in radians, added on top of the idle spin. */
	spin: number;
	/** Idle spin speed multiplier, 0..1. */
	idle: number;
	/** Vertical star drift in px. */
	stars: number;
	/** Raises the sun above the moon, so the lower half falls into shadow. 0 = level. */
	elev: number;
	/** Rotation in the screen plane, radians. Used while the moon rolls in. */
	roll: number;
	/** "Diamond ring" flash on the lit limb, 0..1. */
	flare: number;
	/** Opacity of the resting starfield, 0..1. */
	starAlpha: number;
	/** How far round the moon the corona reaches, from the sun's side: 0 = none, 1 = all the way. */
	wrap: number;
	/** Sunlight bleeding round the limb while the sun is just behind the edge, 0..1. */
	bleed: number;
	/** Extra swing of the sun around the moon, radians, on top of `phase`. A full turn is a full cycle. */
	azimuth: number;
}

export interface MoonScene {
	resize(): void;
	dispose(): void;
}

const IDLE_SPEED = 0.06; // rad/s

const coronaVertex = /* glsl */ `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;

const coronaFragment = /* glsl */ `
	uniform float uIntensity;
	uniform float uSpan;
	uniform float uTime;
	uniform vec2 uLight;
	uniform float uFlare;
	uniform float uWrap;
	uniform float uBleed;
	varying vec2 vUv;

	void main() {
		vec2 p = (vUv - 0.5) * uSpan;
		float d = max(length(p), 1e-4);
		float e = max(d - 1.0, 0.0);
		vec2 dir = p / d;
		float angle = atan(p.y, p.x);

		float facing = dot(dir, uLight);
		// The corona grows out of the sun's side and wraps round the limb as the sun lines up behind.
		float reach = 1.0 - uWrap * 2.6;
		float wrapMask = smoothstep(reach, reach + 0.6, facing);
		float tight = exp(-e * (2.6 + (1.0 - uWrap) * 4.0)) * 0.52;
		float broad = exp(-e * 0.9) * 0.2;
		float streaks = 1.0 + 0.1 * sin(angle * 11.0 + uTime * 0.15) * sin(angle * 5.0 - uTime * 0.1);
		float bias = 1.0 + 0.35 * facing;

		float glow = (tight * streaks + broad) * bias * uIntensity * wrapMask;
		// The sun just behind the edge: light spilling round the limb on its side.
		glow += uBleed * pow(max(facing, 0.0), 3.0) * (exp(-e * 16.0) * 0.35 + exp(-e * 4.0) * 0.08);
		// Baily's beads: points of sunlight through the limb's valleys. The outer ones wink out
		// first, leaving the diamond ring.
		for (int i = -2; i <= 2; i++) {
			float k = float(i);
			float o = k * 0.16;
			vec2 at = vec2(uLight.x * cos(o) - uLight.y * sin(o), uLight.x * sin(o) + uLight.y * cos(o));
			vec2 b = p - at * 1.015;
			float w = pow(uFlare, 1.0 + abs(k) * 2.5) * (0.75 + 0.25 * sin(uTime * 23.0 + k * 7.0));
			glow += w * exp(-dot(b, b) * 220.0) * 1.6;
		}
		// A thin bright ring hugging the limb as it ignites.
		glow += uFlare * exp(-e * 22.0) * 0.35;
		// Fade out before the quad's edge so it never shows as a square.
		glow *= 1.0 - smoothstep(uSpan * 0.36, uSpan * 0.5, d);
		// Soft knee instead of a hard clip: untouched below 0.7, then rolling smoothly towards 1, so
		// stacked glows never flatten into a hard-edged white shape.
		if (glow > 0.7) glow = 0.7 + 0.3 * (1.0 - exp(-(glow - 0.7) / 0.3));
		gl_FragColor = vec4(vec3(1.0, 0.965, 0.92) * glow, 1.0);
	}
`;

const starVertex = /* glsl */ `
	attribute float aSize;
	attribute float aDepth;
	attribute float aSeed;
	uniform vec2 uView;
	uniform float uOffset;
	uniform float uTime;
	uniform float uPixelRatio;
	varying float vAlpha;

	void main() {
		vec3 pos = position;
		pos.x *= uView.x;
		pos.y = mod(position.y * uView.y + uOffset * aDepth + uView.y * 0.5, uView.y) - uView.y * 0.5;
		vAlpha = (0.45 + 0.55 * sin(uTime * (0.6 + aSeed * 1.6) + aSeed * 40.0)) * (0.35 + aDepth * 0.65);
		gl_PointSize = aSize * uPixelRatio;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.xy, -500.0, 1.0);
	}
`;

const starFragment = /* glsl */ `
	uniform float uAlpha;
	varying float vAlpha;
	void main() {
		float d = length(gl_PointCoord - 0.5);
		float a = smoothstep(0.5, 0.0, d) * vAlpha * uAlpha;
		gl_FragColor = vec4(vec3(0.92, 0.94, 1.0) * a, 1.0);
	}
`;

function loadTexture(loader: THREE.TextureLoader, url: string) {
	return new Promise<THREE.Texture>((resolve, reject) =>
		loader.load(url, resolve, undefined, reject)
	);
}

/**
 * Builds the moon, its corona and a starfield on `canvas`. `getState` is read every frame, so the
 * caller owns all choreography; this module only draws. Resolves once the textures are on the GPU
 * and the first frame has rendered.
 */
export async function createMoonScene(
	canvas: HTMLCanvasElement,
	getState: () => MoonState
): Promise<MoonScene> {
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
	renderer.setClearColor(0x09090b, 1);
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.05;

	const scene = new THREE.Scene();
	const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -2000, 2000);
	camera.position.z = 1000;

	const loader = new THREE.TextureLoader();
	const [colorMap, normalMap] = await Promise.all([
		loadTexture(loader, '/moon/moon-color.webp'),
		loadTexture(loader, '/moon/moon-normal.webp')
	]);
	colorMap.colorSpace = THREE.SRGBColorSpace;
	colorMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

	// Moon
	const moonMaterial = new THREE.MeshStandardMaterial({
		map: colorMap,
		normalMap,
		normalScale: new THREE.Vector2(1, 1),
		roughness: 1,
		metalness: 0
	});
	const moon = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 64), moonMaterial);
	const pivot = new THREE.Group();
	pivot.rotation.x = 0.12;
	pivot.rotation.z = -0.08;
	const roller = new THREE.Group();
	roller.add(moon);
	pivot.add(roller);
	scene.add(pivot);

	const sun = new THREE.DirectionalLight(0xfff4e6, 3.2);
	scene.add(sun, sun.target);
	// Earthshine: just enough to read craters on the dark side, as in the photo.
	const earthshine = new THREE.AmbientLight(0x9fb4d6, 0.22);
	scene.add(earthshine);

	// Corona, drawn first, behind the moon
	const CORONA_SPAN = 14;
	const coronaUniforms = {
		uIntensity: { value: 1 },
		uSpan: { value: CORONA_SPAN },
		uTime: { value: 0 },
		uLight: { value: new THREE.Vector2(-1, 0.3) },
		uFlare: { value: 0 },
		uWrap: { value: 1 },
		uBleed: { value: 0 }
	};
	const corona = new THREE.Mesh(
		new THREE.PlaneGeometry(1, 1),
		new THREE.ShaderMaterial({
			uniforms: coronaUniforms,
			vertexShader: coronaVertex,
			fragmentShader: coronaFragment,
			blending: THREE.AdditiveBlending,
			transparent: true,
			depthWrite: false,
			toneMapped: false
		})
	);
	corona.renderOrder = -1;
	scene.add(corona);

	// Stars, normalised to [-0.5, 0.5] and scaled to the viewport in the shader
	const STAR_COUNT = 1400;
	const positions = new Float32Array(STAR_COUNT * 3);
	const sizes = new Float32Array(STAR_COUNT);
	const depths = new Float32Array(STAR_COUNT);
	const seeds = new Float32Array(STAR_COUNT);
	for (let i = 0; i < STAR_COUNT; i++) {
		positions[i * 3] = Math.random() - 0.5;
		positions[i * 3 + 1] = Math.random() - 0.5;
		const depth = Math.random() ** 2.2;
		depths[i] = depth;
		sizes[i] = 0.8 + depth * 2.2 + (Math.random() < 0.02 ? 1.5 : 0);
		seeds[i] = Math.random();
	}
	const starGeometry = new THREE.BufferGeometry();
	starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	starGeometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
	starGeometry.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1));
	starGeometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
	const starUniforms = {
		uView: { value: new THREE.Vector2(1, 1) },
		uOffset: { value: 0 },
		uTime: { value: 0 },
		uPixelRatio: { value: 1 },
		uAlpha: { value: 1 }
	};
	const stars = new THREE.Points(
		starGeometry,
		new THREE.ShaderMaterial({
			uniforms: starUniforms,
			vertexShader: starVertex,
			fragmentShader: starFragment,
			blending: THREE.AdditiveBlending,
			transparent: true,
			depthWrite: false,
			toneMapped: false
		})
	);
	stars.renderOrder = -2;
	stars.frustumCulled = false;
	scene.add(stars);

	let width = 0;
	let height = 0;

	function resize() {
		width = canvas.clientWidth;
		height = canvas.clientHeight;
		const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
		renderer.setPixelRatio(dpr);
		renderer.setSize(width, height, false);
		camera.left = -width / 2;
		camera.right = width / 2;
		camera.top = height / 2;
		camera.bottom = -height / 2;
		camera.updateProjectionMatrix();
		starUniforms.uView.value.set(width, height);
		starUniforms.uPixelRatio.value = dpr;
	}

	const timer = new THREE.Timer();
	let idleAngle = 0;
	let frame = 0;
	let running = false;

	function render(now?: number) {
		timer.update(now);
		const dt = Math.min(timer.getDelta(), 0.1);
		const time = timer.getElapsed();
		const s = getState();

		const cx = s.x - width / 2;
		const cy = height / 2 - s.y;
		pivot.position.set(cx, cy, 0);
		pivot.scale.setScalar(Math.max(s.r, 0.01));
		pivot.visible = s.r > 0.5;
		idleAngle += dt * IDLE_SPEED * s.idle;
		moon.rotation.y = -Math.PI / 2 + idleAngle + s.spin;
		roller.rotation.z = s.roll;

		// Phase: the sun swings from behind the moon (upper-left rim) round to the camera. Azimuth
		// keeps it going: negative swings it the other way, over the right side first.
		const a =
			THREE.MathUtils.lerp(0.42, Math.PI * 0.97, THREE.MathUtils.clamp(s.phase, 0, 1)) + s.azimuth;
		const lx = -Math.sin(a);
		const ly = 0.32 * Math.abs(Math.sin(a)) + s.elev;
		const lz = -Math.cos(a);
		sun.position.set(cx + lx * 100, cy + ly * 100, lz * 100);
		sun.target.position.set(cx, cy, 0);
		sun.intensity = 3.2 * s.light;
		earthshine.intensity = (0.1 + 0.12 * (1 - s.phase)) * Math.min(s.light, 1);

		corona.position.set(cx, cy, -s.r - 10);
		corona.scale.setScalar(Math.max(s.r, 0.01) * CORONA_SPAN);
		corona.visible = s.r > 0.5;
		coronaUniforms.uIntensity.value = s.corona;
		coronaUniforms.uTime.value = time;
		coronaUniforms.uFlare.value = s.flare;
		coronaUniforms.uWrap.value = s.wrap;
		coronaUniforms.uBleed.value = s.bleed;
		coronaUniforms.uLight.value.set(lx, ly).normalize();

		starUniforms.uOffset.value = s.stars;
		starUniforms.uAlpha.value = s.starAlpha;
		starUniforms.uTime.value = time;

		renderer.render(scene, camera);
		if (running) frame = requestAnimationFrame(render);
	}

	function start() {
		if (running) return;
		running = true;
		timer.reset();
		frame = requestAnimationFrame(render);
	}

	function stop() {
		running = false;
		cancelAnimationFrame(frame);
	}

	const onVisibility = () => (document.hidden ? stop() : start());
	document.addEventListener('visibilitychange', onVisibility);

	resize();
	// Upload textures now so the first visible frame doesn't hitch.
	renderer.initTexture(colorMap);
	renderer.initTexture(normalMap);
	render();
	if (!document.hidden) start();

	return {
		resize,
		dispose() {
			stop();
			document.removeEventListener('visibilitychange', onVisibility);
			scene.traverse((obj) => {
				if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
					obj.geometry.dispose();
					(obj.material as THREE.Material).dispose();
				}
			});
			colorMap.dispose();
			normalMap.dispose();
			timer.dispose();
			renderer.dispose();
		}
	};
}
