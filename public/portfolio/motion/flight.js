/**
 * Scroll-scrubbed camera flight for the portfolio landing.
 * Vendored pins (not npm dependencies):
 *   three@0.170.0  /portfolio/vendor/three/three.module.min.js
 *   gsap@3.12.7    /portfolio/vendor/gsap/gsap.min.js
 *   ScrollTrigger  /portfolio/vendor/gsap/ScrollTrigger.min.js
 *   lenis@1.1.20   /portfolio/vendor/lenis/lenis.min.js
 *
 * Stages, driven by real section positions and reversible scroll:
 *   hero prompt → embedding cloud → transformer layers → agent network → output beam
 */
(() => {
  const root = document.documentElement;
  const canvas = document.getElementById("pf-flight-canvas");
  if (!canvas) return;

  const reduce =
    root.classList.contains("pf-static") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    root.classList.add("pf-static");
    return;
  }

  const progressEl = document.querySelector(".pf-flight-progress");

  function hasWebGL() {
    try {
      const probe = document.createElement("canvas");
      return !!(probe.getContext("webgl2") || probe.getContext("webgl"));
    } catch {
      return false;
    }
  }

  if (!hasWebGL() || !window.gsap || !window.ScrollTrigger || !window.Lenis) {
    root.classList.add("pf-static", "pf-fallback");
    return;
  }

  function tierFor() {
    const narrow = window.matchMedia("(max-width: 760px)").matches;
    const save = navigator.connection && navigator.connection.saveData;
    const cores = navigator.hardwareConcurrency || 8;
    const mem = navigator.deviceMemory || 8;
    if (narrow || save) return "low";
    if (window.innerWidth < 1100 && (cores <= 4 || mem <= 4)) return "low";
    if (cores <= 2 || mem <= 2) return "mid";
    return "high";
  }

  const QUALITY = {
    high: { points: 2600, stars: 800, layers: 6, arcs: 12, pulses: 2, dpr: 1.5, bloom: true, size: 12.5 },
    mid: { points: 1400, stars: 420, layers: 5, arcs: 8, pulses: 1, dpr: 1.2, bloom: true, size: 14 },
    low: { points: 560, stars: 180, layers: 4, arcs: 4, pulses: 1, dpr: 1, bloom: false, size: 18 },
  };

  const BANDS = [
    ["hero", 0, 0.34],
    ["offer", 0.34, 0.56],
    ["cases", 0.56, 0.68],
    ["sample-collective", 0.68, 0.78],
    ["record", 0.78, 0.82],
    ["contact", 0.82, 0.96],
    ["craft-credit", 0.96, 1],
  ];

  const CAM = [
    { t: 0, p: [0, 0.42, 7.5], l: [0, 0.12, 0.15] },
    { t: 0.1, p: [0.28, 0.26, 5.5], l: [0.12, 0.04, -0.9] },
    { t: 0.22, p: [1.9, 1.15, 1.35], l: [-0.35, 0.4, -4.4] },
    { t: 0.34, p: [-1.55, 0.45, -2.4], l: [1.05, 0.35, -6.8] },
    { t: 0.44, p: [0.3, 4.35, 6.1], l: [0, 0.35, -0.4] },
    { t: 0.56, p: [0.12, -2.55, 3.5], l: [0, -3.15, -0.15] },
    { t: 0.68, p: [3.35, 1.4, 4.15], l: [0.05, 0.1, 0] },
    { t: 0.8, p: [-2.45, 0.5, 3.35], l: [0.25, -0.65, 0.2] },
    { t: 0.9, p: [0.1, 0.55, 6.5], l: [0, 0.05, -11] },
    { t: 1, p: [0, 0.22, 4.4], l: [0, 0, -16] },
  ];

  const NODES = [
    { p: [0, 0.9, 0], color: 0x8af3ff, s: 0.16 },
    { p: [-1.85, 0.28, -0.45], color: 0x67d4ff, s: 0.11 },
    { p: [1.75, 0.48, -0.25], color: 0xb79bff, s: 0.11 },
    { p: [-1.2, -0.9, 0.4], color: 0x8eb6ff, s: 0.1 },
    { p: [1.4, -0.72, 0.18], color: 0x5ce1e6, s: 0.1 },
    { p: [0.12, 0.12, -1.4], color: 0xa894ff, s: 0.1 },
    { p: [0.04, -1.38, 1.08], color: 0xf2b56a, s: 0.2, hitl: true },
  ];

  const EDGES = [
    [0, 1],
    [0, 2],
    [0, 5],
    [1, 3],
    [2, 4],
    [5, 6],
    [3, 6],
    [4, 6],
    [1, 5],
    [2, 5],
  ];

  const CLUSTERS = [
    [-2.7, 0.9, -1.4],
    [2.9, 1.25, -4.6],
    [-1.5, -1.25, -7.1],
    [2.15, 2.05, -2.6],
  ];

  function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function smooth(t) {
    const x = Math.min(1, Math.max(0, t));
    return x * x * (3 - 2 * x);
  }

  function ramp(a, b, x) {
    if (x <= a) return 0;
    if (x >= b) return 1;
    return smooth((x - a) / (b - a));
  }

  function weights(p) {
    return {
      type: ramp(0, 0.09, p),
      burst: ramp(0.07, 0.18, p),
      embed: ramp(0.15, 0.33, p),
      layer: ramp(0.3, 0.5, p),
      agent: ramp(0.5, 0.7, p),
      out: ramp(0.76, 0.95, p),
    };
  }

  function samplePath(t, outP, outL) {
    const clamped = Math.min(1, Math.max(0, t));
    let i = 0;
    while (i < CAM.length - 2 && CAM[i + 1].t < clamped) i += 1;
    const a = CAM[i];
    const b = CAM[Math.min(CAM.length - 1, i + 1)];
    const u = smooth((clamped - a.t) / Math.max(0.0001, b.t - a.t));
    for (let k = 0; k < 3; k += 1) {
      outP[k] = a.p[k] + (b.p[k] - a.p[k]) * u;
      outL[k] = a.l[k] + (b.l[k] - a.l[k]) * u;
    }
  }

  function sectionProgress() {
    const probe = window.scrollY + window.innerHeight * 0.42;
    let value = 0;
    for (const [id, from, to] of BANDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = el.offsetHeight || 1;
      if (probe < top) break;
      if (probe >= top + height) {
        value = to;
        continue;
      }
      value = from + (to - from) * ((probe - top) / height);
      break;
    }
    return Math.min(1, Math.max(0, value));
  }

  let started = false;
  function schedule() {
    if (started) return;
    started = true;
    boot().catch(() => {
      root.classList.add("pf-static", "pf-fallback");
    });
  }

  const idle = window.requestIdleCallback
    ? (fn) => window.requestIdleCallback(fn, { timeout: 480 })
    : (fn) => window.setTimeout(fn, 48);
  idle(schedule);
  window.addEventListener("pointerdown", schedule, { once: true, passive: true });
  window.addEventListener("scroll", schedule, { once: true, passive: true });

  async function boot() {
    const THREE = await import("/portfolio/vendor/three/three.module.min.js");
    const q = QUALITY[tierFor()];
    const rng = mulberry32(0x0c0ffee);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    });
    renderer.setClearColor(0x070910, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.autoClear = true;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070910);
    scene.fog = new THREE.FogExp2(0x070910, 0.032);
    const camera = new THREE.PerspectiveCamera(48, 1, 0.08, 90);

    const glowTex = makeGlowTexture(THREE);

    const layerYs = [];
    for (let i = 0; i < q.layers; i += 1) {
      layerYs.push((i - (q.layers - 1) / 2) * 1.18);
    }

    const pointUniforms = {
      uTime: { value: 0 },
      uType: { value: 0 },
      uBurst: { value: 0 },
      uEmbed: { value: 0 },
      uLayer: { value: 0 },
      uAgent: { value: 0 },
      uOut: { value: 0 },
      uSize: { value: q.size },
      uPixelRatio: { value: 1 },
    };

    const points = buildPoints(THREE, q, rng, layerYs, pointUniforms);
    scene.add(points);

    const stars = buildStars(THREE, q.stars, rng);
    scene.add(stars);

    const nebulas = [
      sprite(THREE, glowTex, 0x3a8cff, 18, 0.42, [-4.2, 1.1, -10]),
      sprite(THREE, glowTex, 0x7a4cff, 20, 0.36, [5.2, -0.2, -12]),
      sprite(THREE, glowTex, 0xc4844a, 12, 0.22, [0.4, 2.2, -8]),
    ];
    nebulas.forEach((item) => scene.add(item));

    const layerMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0 },
        uTint: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uOpacity;
        uniform float uTint;
        void main() {
          vec2 g = abs(fract(vUv * vec2(26.0, 14.0)) - 0.5);
          float line = 1.0 - smoothstep(0.0, 0.028, min(g.x, g.y));
          float edge = smoothstep(0.36, 0.5, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
          float scan = 0.7 + 0.3 * sin(vUv.y * 42.0 - uTime * 1.3);
          float alpha = (line * 0.5 + edge * 0.95 + 0.045) * uOpacity * scan;
          vec3 col = mix(vec3(0.42, 0.86, 1.0), vec3(0.66, 0.5, 1.0), uTint);
          gl_FragColor = vec4(col * (0.55 + edge), alpha);
        }
      `,
    });

    const layers = new THREE.Group();
    layerYs.forEach((y, index) => {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(10.5, 6.4), layerMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = y;
      mesh.userData.tint = index / Math.max(1, q.layers - 1);
      layers.add(mesh);
    });
    const arcs = buildArcs(THREE, q, layerYs, rng);
    arcs.forEach((arc) => layers.add(arc));
    scene.add(layers);

    const network = new THREE.Group();
    const nodeMeshes = [];
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x9ad7ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    NODES.forEach((node) => {
      const color = new THREE.Color(node.color);
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(node.s, 20, 14),
        new THREE.MeshBasicMaterial({ color, toneMapped: false }),
      );
      core.position.set(node.p[0], node.p[1], node.p[2]);
      const halo = sprite(THREE, glowTex, node.color, node.hitl ? 1.7 : 0.85, 0.95, node.p);
      const ring = node.hitl
        ? new THREE.Mesh(
            new THREE.TorusGeometry(node.s * 2.15, 0.012, 8, 36),
            new THREE.MeshBasicMaterial({
              color: 0xf2b56a,
              transparent: true,
              opacity: 0.95,
              blending: THREE.AdditiveBlending,
              toneMapped: false,
            }),
          )
        : null;
      if (ring) {
        ring.position.copy(core.position);
        ring.rotation.x = Math.PI / 2.3;
        network.add(ring);
      }
      network.add(core, halo);
      nodeMeshes.push({ core, halo, ring, hitl: !!node.hitl });
    });
    EDGES.forEach(([a, b]) => {
      const geom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...NODES[a].p),
        new THREE.Vector3(...NODES[b].p),
      ]);
      network.add(new THREE.Line(geom, edgeMat));
    });
    const pulses = [];
    for (let i = 0; i < EDGES.length * q.pulses; i += 1) {
      const edge = EDGES[i % EDGES.length];
      const warm = edge[0] === 6 || edge[1] === 6;
      const pulse = sprite(THREE, glowTex, warm ? 0xf2b56a : 0xb7f6ff, 0.22, 1, [0, 0, 0]);
      pulse.userData.edge = edge;
      pulse.userData.phase = (i * 0.17) % 1;
      network.add(pulse);
      pulses.push(pulse);
    }
    scene.add(network);

    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.018, 18, 20, 1, true),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
        uniforms: { uOut: { value: 0 }, uTime: { value: 0 } },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float uOut;
          uniform float uTime;
          void main() {
            float along = vUv.y;
            float pulse = 0.72 + 0.28 * sin(uTime * 3.2 - along * 22.0);
            float alpha = uOut * pulse * smoothstep(0.0, 0.05, along) * (1.0 - along * 0.35);
            vec3 col = mix(vec3(0.55, 0.95, 1.0), vec3(0.98, 0.74, 0.42), along);
            gl_FragColor = vec4(col, alpha);
          }
        `,
      }),
    );
    beam.rotation.x = Math.PI / 2;
    beam.position.z = -8;
    scene.add(beam);

    const prompt = new THREE.Mesh(
      new THREE.PlaneGeometry(7.2, 0.045),
      new THREE.MeshBasicMaterial({
        color: 0xb8f6ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    prompt.position.set(0, 0.16, 0);
    scene.add(prompt);

    const grade = buildGrade(THREE, q.bloom);
    let targetProgress = sectionProgress();
    let shown = targetProgress;
    const camP = [0, 0, 0];
    const camL = [0, 0, 0];
    const pointer = { x: 0, y: 0 };
    const parallax = window.matchMedia("(pointer: fine)").matches && q !== QUALITY.low;

    const { gsap, ScrollTrigger, Lenis } = window;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
      autoRaf: false,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      if (document.hidden) return;
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.45,
      onUpdate: () => {
        targetProgress = sectionProgress();
      },
    });
    window.addEventListener(
      "scroll",
      () => {
        targetProgress = sectionProgress();
      },
      { passive: true },
    );
    if (parallax) {
      window.addEventListener(
        "pointermove",
        (event) => {
          pointer.x = event.clientX / window.innerWidth - 0.5;
          pointer.y = event.clientY / window.innerHeight - 0.5;
        },
        { passive: true },
      );
    }

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(q.dpr, window.devicePixelRatio || 1);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(1, height);
      camera.updateProjectionMatrix();
      pointUniforms.uPixelRatio.value = dpr;
      grade.resize(Math.max(2, Math.floor(width * dpr)), Math.max(2, Math.floor(height * dpr)));
    }
    resize();
    window.addEventListener("resize", () => {
      resize();
      ScrollTrigger.refresh();
    });

    let raf = 0;
    function frame(now) {
      if (document.hidden) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
      const time = now * 0.001;
      shown += (targetProgress - shown) * 0.12;
      if (Math.abs(targetProgress - shown) < 0.0004) shown = targetProgress;
      const w = weights(shown);
      pointUniforms.uTime.value = time;
      pointUniforms.uType.value = w.type;
      pointUniforms.uBurst.value = w.burst;
      pointUniforms.uEmbed.value = w.embed;
      pointUniforms.uLayer.value = w.layer;
      pointUniforms.uAgent.value = w.agent;
      pointUniforms.uOut.value = w.out;
      layerMat.uniforms.uTime.value = time;
      layerMat.uniforms.uOpacity.value = w.layer * (1 - w.agent * 0.82) * (1 - w.out);
      beam.material.uniforms.uTime.value = time;
      beam.material.uniforms.uOut.value = w.out;
      prompt.material.opacity = w.type * (1 - w.burst);
      prompt.scale.x = Math.max(0.001, w.type);
      prompt.position.x = -3.6 + 3.6 * prompt.scale.x;

      layers.visible = w.layer > 0.015 && w.out < 0.92;
      const layerOpacity = layerMat.uniforms.uOpacity.value;
      arcs.forEach((arc) => {
        arc.material.opacity = layerOpacity;
      });
      network.visible = w.agent > 0.02;
      beam.visible = w.out > 0.02;
      const nodeOpacity = w.agent * (1 - w.out * 0.65);
      edgeMat.opacity = nodeOpacity * 0.85;
      nodeMeshes.forEach((node) => {
        node.core.visible = nodeOpacity > 0.02;
        node.halo.material.opacity = nodeOpacity * (node.hitl ? 0.95 : 0.7);
        if (node.ring) {
          node.ring.material.opacity = nodeOpacity;
          node.ring.rotation.z = time * 0.35;
        }
      });
      pulses.forEach((pulse) => {
        const [a, b] = pulse.userData.edge;
        const u = (time * 0.28 + pulse.userData.phase) % 1;
        const from = NODES[a].p;
        const to = NODES[b].p;
        pulse.position.set(
          from[0] + (to[0] - from[0]) * u,
          from[1] + (to[1] - from[1]) * u,
          from[2] + (to[2] - from[2]) * u,
        );
        pulse.material.opacity = nodeOpacity;
      });

      samplePath(shown, camP, camL);
      const fov = 46 + Math.sin(shown * Math.PI) * 7;
      if (Math.abs(camera.fov - fov) > 0.05) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
      camera.position.set(
        camP[0] + pointer.x * 0.28,
        camP[1] - pointer.y * 0.18,
        camP[2],
      );
      camera.lookAt(camL[0] + pointer.x * 0.2, camL[1] - pointer.y * 0.12, camL[2]);

      grade.render(renderer, scene, camera, time);
      if (progressEl) progressEl.style.width = `${(shown * 100).toFixed(2)}%`;
    }

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && !raf) raf = requestAnimationFrame(frame);
    });

    canvas.dataset.flightReady = "1";
    root.classList.add("is-live");
    window.__pfFlight = {
      ready: true,
      tier: tierFor(),
      lenis,
      get progress() {
        return shown;
      },
      get target() {
        return targetProgress;
      },
    };
    raf = requestAnimationFrame(frame);
    ScrollTrigger.refresh();
  }

  function sprite(THREE, map, color, scale, opacity, position) {
    const material = new THREE.SpriteMaterial({
      map,
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
      fog: false,
    });
    const mesh = new THREE.Sprite(material);
    mesh.scale.set(scale, scale, 1);
    mesh.position.set(position[0], position[1], position[2]);
    return mesh;
  }

  function makeGlowTexture(THREE) {
    const size = 128;
    const el = document.createElement("canvas");
    el.width = size;
    el.height = size;
    const ctx = el.getContext("2d");
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.22, "rgba(255,255,255,0.55)");
    grad.addColorStop(0.55, "rgba(255,255,255,0.12)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(el);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  function buildPoints(THREE, q, rng, layerYs, uniforms) {
    const n = q.points;
    const position = new Float32Array(n * 3);
    const cloud = new Float32Array(n * 3);
    const sheet = new Float32Array(n * 3);
    const node = new Float32Array(n * 3);
    const beam = new Float32Array(n * 3);
    const color = new Float32Array(n * 3);
    const index = new Float32Array(n);
    const seed = new Float32Array(n);
    const hitl = new Float32Array(n);
    const palette = [
      new THREE.Color(0x7ee7ff),
      new THREE.Color(0xb48cff),
      new THREE.Color(0xf0b46a),
      new THREE.Color(0x9af0ff),
    ];
    const cols = Math.ceil(n / 3);
    for (let i = 0; i < n; i += 1) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const along = col / Math.max(1, cols - 1);
      position[i * 3] = -3.55 + along * 7.1 + (rng() - 0.5) * 0.04;
      position[i * 3 + 1] = 0.16 + (row - 1) * 0.085 + (rng() - 0.5) * 0.02;
      position[i * 3 + 2] = (rng() - 0.5) * 0.12;
      const cluster = Math.floor(rng() * CLUSTERS.length);
      const c = CLUSTERS[cluster];
      cloud[i * 3] = c[0] + (rng() - 0.5) * 2.5;
      cloud[i * 3 + 1] = c[1] + (rng() - 0.5) * 1.7;
      cloud[i * 3 + 2] = c[2] + (rng() - 0.5) * 2.6;
      const layer = Math.floor(rng() * layerYs.length);
      sheet[i * 3] = (rng() - 0.5) * 8.6;
      sheet[i * 3 + 1] = layerYs[layer] + (rng() - 0.5) * 0.08;
      sheet[i * 3 + 2] = (rng() - 0.5) * 4.8;
      let ni = Math.floor(rng() * NODES.length);
      if (rng() < 0.2) ni = NODES.length - 1;
      const np = NODES[ni].p;
      node[i * 3] = np[0] + (rng() - 0.5) * 0.55;
      node[i * 3 + 1] = np[1] + (rng() - 0.5) * 0.55;
      node[i * 3 + 2] = np[2] + (rng() - 0.5) * 0.55;
      const depth = rng();
      const radius = (1 - depth) * 0.55 * Math.sqrt(rng());
      const ang = rng() * Math.PI * 2;
      beam[i * 3] = Math.cos(ang) * radius * 0.35;
      beam[i * 3 + 1] = Math.sin(ang) * radius * 0.35;
      beam[i * 3 + 2] = -depth * 16;
      const tint = palette[cluster];
      color[i * 3] = tint.r;
      color[i * 3 + 1] = tint.g;
      color[i * 3 + 2] = tint.b;
      index[i] = along;
      seed[i] = rng();
      hitl[i] = ni === NODES.length - 1 ? 1 : 0;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(position, 3));
    geom.setAttribute("aCloud", new THREE.BufferAttribute(cloud, 3));
    geom.setAttribute("aSheet", new THREE.BufferAttribute(sheet, 3));
    geom.setAttribute("aNode", new THREE.BufferAttribute(node, 3));
    geom.setAttribute("aBeam", new THREE.BufferAttribute(beam, 3));
    geom.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    geom.setAttribute("aIndex", new THREE.BufferAttribute(index, 1));
    geom.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    geom.setAttribute("aHitl", new THREE.BufferAttribute(hitl, 1));
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
      fog: false,
      uniforms: {},
      vertexShader: `
        attribute vec3 aCloud;
        attribute vec3 aSheet;
        attribute vec3 aNode;
        attribute vec3 aBeam;
        attribute vec3 aColor;
        attribute float aIndex;
        attribute float aSeed;
        attribute float aHitl;
        uniform float uTime;
        uniform float uType;
        uniform float uBurst;
        uniform float uEmbed;
        uniform float uLayer;
        uniform float uAgent;
        uniform float uOut;
        uniform float uSize;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec3 mess = mix(position, aCloud, 0.42);
          vec3 p = mix(position, mess, uBurst);
          p = mix(p, aCloud, uEmbed);
          p = mix(p, aSheet, uLayer);
          p = mix(p, aNode, uAgent);
          p = mix(p, aBeam, uOut);
          float wobble = 0.04 + uEmbed * 0.07;
          p.x += sin(uTime * 0.55 + aSeed * 18.0) * wobble;
          p.y += cos(uTime * 0.47 + aSeed * 13.0) * wobble;
          p.z += sin(uTime * 0.38 + aSeed * 9.0) * wobble * 1.5;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float dist = max(0.45, -mv.z);
          float reveal = smoothstep(aIndex - 0.02, aIndex + 0.05, uType);
          float scale = 0.55 + aSeed * 1.15;
          gl_PointSize = clamp(uSize * scale * uPixelRatio * reveal * (8.0 / dist), 0.0, 64.0);
          vColor = mix(aColor, vec3(0.99, 0.73, 0.4), aHitl * uAgent * 0.92);
          vColor = mix(vColor, vec3(0.9, 0.97, 1.0), uOut * 0.5);
          vAlpha = reveal * clamp(1.0 - dist / 42.0, 0.35, 1.0) * (0.72 + 0.28 * aSeed);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 q = gl_PointCoord - vec2(0.5);
          float d = length(q);
          float glow = smoothstep(0.5, 0.05, d);
          float core = smoothstep(0.2, 0.0, d);
          float alpha = glow * vAlpha;
          if (alpha < 0.02) discard;
          vec3 col = vColor * (1.15 + core * 2.6);
          gl_FragColor = vec4(col * alpha, alpha);
        }
      `,
    });
    material.uniforms = uniforms;
    const mesh = new THREE.Points(geom, material);
    mesh.frustumCulled = false;
    return mesh;
  }

  function buildStars(THREE, count, rng) {
    const position = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 18 + rng() * 28;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      position[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      position[i * 3 + 1] = r * Math.cos(phi);
      position[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(position, 3));
    const material = new THREE.PointsMaterial({
      color: 0xd5e6ff,
      size: 0.14,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
      fog: false,
    });
    const mesh = new THREE.Points(geom, material);
    mesh.frustumCulled = false;
    return mesh;
  }

  function buildArcs(THREE, q, layerYs, rng) {
    const arcs = [];
    const colors = [0x8ae9ff, 0xb48cff, 0xf0b46a];
    for (let i = 0; i < q.arcs; i += 1) {
      const aLayer = Math.floor(rng() * (layerYs.length - 1));
      const a = new THREE.Vector3((rng() - 0.5) * 7.2, layerYs[aLayer], (rng() - 0.5) * 3.6);
      const b = new THREE.Vector3((rng() - 0.5) * 7.2, layerYs[aLayer + 1], (rng() - 0.5) * 3.6);
      const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
      mid.x += (rng() - 0.5) * 1.6;
      mid.z += 0.7 + rng();
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const low = q.arcs <= 4;
      const geom = low
        ? new THREE.BufferGeometry().setFromPoints(curve.getPoints(20))
        : new THREE.TubeGeometry(curve, 24, 0.016, 5, false);
      const material = low
        ? new THREE.LineBasicMaterial({
            color: colors[i % colors.length],
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            toneMapped: false,
          })
        : new THREE.MeshBasicMaterial({
            color: colors[i % colors.length],
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
            toneMapped: false,
          });
      arcs.push(low ? new THREE.Line(geom, material) : new THREE.Mesh(geom, material));
    }
    return arcs;
  }

  function buildGrade(THREE, bloom) {
    const fsScene = new THREE.Scene();
    const fsCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    quad.frustumCulled = false;
    fsScene.add(quad);
    const targets = { base: null, a: null, b: null };

    function makeTarget(w, h, depth) {
      return new THREE.WebGLRenderTarget(w, h, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: depth,
      });
    }

    const bright = new THREE.ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tDiffuse: { value: null },
        uThreshold: { value: 0.28 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        uniform float uThreshold;
        void main() {
          vec3 c = texture2D(tDiffuse, vUv).rgb;
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.4, l), 1.0);
        }
      `,
    });
    const blur = new THREE.ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tDiffuse: { value: null },
        uTexel: { value: new THREE.Vector2(1 / 256, 1 / 256) },
        uOffset: { value: 1 },
      },
      vertexShader: bright.vertexShader,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        uniform vec2 uTexel;
        uniform float uOffset;
        void main() {
          vec2 o = uTexel * uOffset;
          vec3 c = texture2D(tDiffuse, vUv).rgb * 0.25;
          c += texture2D(tDiffuse, vUv + vec2(o.x, o.y)).rgb * 0.125;
          c += texture2D(tDiffuse, vUv + vec2(-o.x, o.y)).rgb * 0.125;
          c += texture2D(tDiffuse, vUv + vec2(o.x, -o.y)).rgb * 0.125;
          c += texture2D(tDiffuse, vUv + vec2(-o.x, -o.y)).rgb * 0.125;
          c += texture2D(tDiffuse, vUv + vec2(o.x, 0.0)).rgb * 0.0625;
          c += texture2D(tDiffuse, vUv + vec2(-o.x, 0.0)).rgb * 0.0625;
          c += texture2D(tDiffuse, vUv + vec2(0.0, o.y)).rgb * 0.0625;
          c += texture2D(tDiffuse, vUv + vec2(0.0, -o.y)).rgb * 0.0625;
          gl_FragColor = vec4(c, 1.0);
        }
      `,
    });
    const composite = new THREE.ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tBase: { value: null },
        tBloom: { value: null },
        uBloom: { value: bloom ? 1.15 : 0 },
        uTime: { value: 0 },
      },
      vertexShader: bright.vertexShader,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D tBase;
        uniform sampler2D tBloom;
        uniform float uBloom;
        uniform float uTime;
        vec3 aces(vec3 x) {
          return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
        }
        void main() {
          vec3 base = texture2D(tBase, vUv).rgb;
          vec3 glow = texture2D(tBloom, vUv).rgb;
          vec3 col = aces((base + glow * uBloom) * 1.2);
          float vig = smoothstep(1.15, 0.28, length(vUv - 0.5));
          col *= mix(0.62, 1.0, vig);
          float grain = fract(sin(dot(vUv * vec2(180.0, 90.0) + uTime, vec2(12.9898, 78.233))) * 43758.5453);
          col += (grain - 0.5) * 0.018;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    function pass(material, target) {
      quad.material = material;
      rendererSet(target);
    }

    let rendererRef = null;
    function rendererSet(target) {
      rendererRef.setRenderTarget(target);
      rendererRef.render(fsScene, fsCam);
    }

    return {
      resize(w, h) {
        const bw = Math.max(2, Math.floor(w * (bloom ? 0.5 : 1)));
        const bh = Math.max(2, Math.floor(h * (bloom ? 0.5 : 1)));
        if (!targets.base || targets.base.width !== w || targets.base.height !== h) {
          if (targets.base) targets.base.dispose();
          targets.base = makeTarget(w, h, true);
        }
        if (!targets.black) targets.black = makeTarget(1, 1, false);
        if (bloom && (!targets.a || targets.a.width !== bw || targets.a.height !== bh)) {
          if (targets.a) targets.a.dispose();
          if (targets.b) targets.b.dispose();
          targets.a = makeTarget(bw, bh, false);
          targets.b = makeTarget(bw, bh, false);
          blur.uniforms.uTexel.value.set(1 / bw, 1 / bh);
        }
        if (!bloom) composite.uniforms.tBloom.value = targets.black.texture;
      },
      render(renderer, scene, camera, time) {
        rendererRef = renderer;
        if (!targets.base) return;
        renderer.setRenderTarget(targets.base);
        renderer.render(scene, camera);
        if (bloom && targets.a) {
          bright.uniforms.tDiffuse.value = targets.base.texture;
          pass(bright, targets.a);
          const offsets = [1.2, 2.4, 4.2];
          let read = targets.a;
          let write = targets.b;
          for (const offset of offsets) {
            blur.uniforms.uOffset.value = offset;
            blur.uniforms.tDiffuse.value = read.texture;
            pass(blur, write);
            const swap = read;
            read = write;
            write = swap;
          }
          composite.uniforms.tBloom.value = read.texture;
        }
        composite.uniforms.tBase.value = targets.base.texture;
        composite.uniforms.uTime.value = time;
        pass(composite, null);
      },
    };
  }
})();
