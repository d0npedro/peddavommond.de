/**
 * One desktop app per build_examples_* deployment.
 * Live apps on apps.peddavommond.de use that public URL (embed=1 hides hub chrome).
 * Examples not yet live there keep their Vercel URL.
 */

const APPS_BASE = 'https://apps.peddavommond.de';

/** Listed on the hub but without a working embed (no GitHub homepage / Vercel). */
const APPS_HUB_NOT_LIVE = new Set([
  'build_examples_color_palette',
  'build_examples_space_shooter',
]);

function exampleUrl(repo, vercelUrl) {
  if (APPS_HUB_NOT_LIVE.has(repo)) return vercelUrl;
  return `${APPS_BASE}/${repo}?embed=1`;
}

const EXAMPLE_DEFS = [
  { slug: '3d-globe', name: 'Meridian', icon: '🌍', description: 'Cinematic 3D globe with glowing markers, drag-to-spin, and click-to-focus.', repo: 'build_examples_3d_globe', url: 'https://build-examples-3d-globe.vercel.app', category: 'lab' },
  { slug: '3d-maze', name: 'Clay Maze', icon: '🧱', description: 'First-person low-poly maze with WASD, mouse look, collectibles, and minimap.', repo: 'build_examples_3d_maze', url: 'https://build-examples-3d-maze.vercel.app', category: 'games' },
  { slug: 'audio-visualizer', name: 'Aether', icon: '🎧', description: 'Music visualizer for microphone or uploaded tracks — bars, circular modes, color themes.', repo: 'build_examples_audio_visualizer', url: 'https://build-examples-audio-visualizer.vercel.app', category: 'lab' },
  { slug: 'color-palette', name: 'Spectra', icon: '🎨', description: 'Five-color palette generator with lock, shuffle, contrast checks, and CSS export.', repo: 'build_examples_color_palette', url: 'https://build-examples-color-palette.vercel.app', category: 'lab' },
  { slug: 'drum-machine', name: 'PULSE', icon: '🥁', description: '16-step drum machine with kick, snare, hats, percussion, swing, and live playhead.', repo: 'build_examples_drum_machine', url: 'https://build-examples-drum-machine.vercel.app', category: 'lab' },
  { slug: 'fotostand', name: 'Fotostand', icon: '📸', description: 'Webcam-Fotostand mit Live-Vorschau, Filtern, Countdown und Galerie.', repo: 'build_examples_fotostand', url: 'https://build-examples-fotostand.vercel.app', category: 'lab' },
  { slug: 'fourier-drawing', name: 'Fourier', icon: '🌀', description: 'Fourier-series drawing toy with spinning epicycles.', repo: 'build_examples_fourier_drawing', url: 'https://build-examples-fourier-drawing.vercel.app', category: 'lab' },
  { slug: 'fractal-tree', name: 'Living Arbor', icon: '🌳', description: 'Generative fractal tree with wind, palettes, and growth animation.', repo: 'build_examples_fractal_tree', url: 'https://build-examples-fractal-tree.vercel.app', category: 'lab' },
  { slug: 'game-of-life', name: 'LIFE', icon: '🟩', description: "Conway's Game of Life — paintable grid, pattern presets, zoom and pan.", repo: 'build_examples_game_of_life', url: 'https://build-examples-game-of-life.vercel.app', category: 'games' },
  { slug: 'landing-page', name: 'Lumen', icon: '✨', description: 'Conversion-oriented SaaS landing page example.', repo: 'build_examples_landing_page', url: 'https://build-examples-landing-page.vercel.app', category: 'lab' },
  { slug: 'meme-generator', name: 'STAMP', icon: '😂', description: 'Bild hochladen oder Vorlage wählen, Text stempeln, PNG exportieren.', repo: 'build_examples_meme_generator', url: 'https://build-examples-meme-generator.vercel.app', category: 'lab' },
  { slug: 'network-graph', name: 'Network', icon: '🕸️', description: 'Force-directed graph: draggable nodes, zoom/pan, search, inspect, reheat/freeze.', repo: 'build_examples_network_graph', url: 'https://build-examples-network-graph.vercel.app', category: 'lab' },
  { slug: 'physics-sandbox', name: 'Drop Lab', icon: '📦', description: '3D physics playground for stacking, bouncing, and toppling shapes.', repo: 'build_examples_physics_sandbox', url: 'https://build-examples-physics-sandbox.vercel.app', category: 'lab' },
  { slug: 'poll-app', name: 'Poll', icon: '📊', description: 'Frage erstellen, einmal abstimmen, Ergebnisbalken live beobachten.', repo: 'build_examples_poll_app', url: 'https://build-examples-poll-app.vercel.app', category: 'lab' },
  { slug: 'polyrhythm', name: 'POLY', icon: '⏱️', description: 'Polyrhythmus visuell und hörbar — überlagerte Pulse im Kreis.', repo: 'build_examples_polyrhythm_visualizer', url: 'https://build-examples-polyrhythm.vercel.app', category: 'lab' },
  { slug: 'pomodoro-timer', name: 'Stille', icon: '🍅', description: 'Ruhiger Pomodoro-Timer mit Fortschrittsring, Aufgabenliste und Sitzungszählung.', repo: 'build_examples_pomodoro_timer', url: 'https://build-examples-pomodoro-timer.vercel.app', category: 'lab' },
  { slug: 'portfolio', name: 'Isla Kern', icon: '👤', description: 'Editorial personal portfolio — selected work, about, skills, and contact.', repo: 'build_examples_portfolio', url: 'https://build-examples-portfolio.vercel.app', category: 'lab' },
  { slug: 'produktbetrachter', name: 'Auris Studio', icon: '💎', description: '3D-Produktbetrachter mit Beleuchtung, Auto-Rotation und Materialvarianten.', repo: 'build_examples_produktbetrachter', url: 'https://build-examples-produktbetrachter.vercel.app', category: 'lab' },
  { slug: 'qr-generator', name: 'QR', icon: '⬛', description: 'QR-Code mit Live-Vorschau, Farben, Größe, Fehlerkorrektur und PNG-Download.', repo: 'build_examples_qr_generator', url: 'https://build-examples-qr-generator.vercel.app', category: 'lab' },
  { slug: 'solar-system', name: 'Helios', icon: '☀️', description: '3D-Orrery mit Planeten, Click-to-Focus, Geschwindigkeit und Orbitalspuren.', repo: 'build_examples_solar_system', url: 'https://build-examples-solar-system.vercel.app', category: 'lab' },
  { slug: 'space-shooter', name: 'ION WAKE', icon: '👾', description: 'Top-down space shooter with waves, power-ups, and a high-score board.', repo: 'build_examples_space_shooter', url: 'https://build-examples-space-shooter.vercel.app', category: 'games' },
  { slug: 'terrain-flyover', name: 'Ridge', icon: '⛰️', description: 'Low-poly 3D-Terrain mit Mouse-Look, Tastatur-Schub und höhengefärbten Graten.', repo: 'build_examples_terrain_flyover', url: 'https://build-examples-terrain-flyover.vercel.app', category: 'lab' },
];

export const EXAMPLE_APPS = EXAMPLE_DEFS.map((item) => ({
  id: `ex-${item.slug}`,
  name: item.name,
  icon: item.icon,
  description: item.description,
  category: item.category,
  launch: 'iframe',
  url: exampleUrl(item.repo, item.url),
  repo: `https://github.com/d0npedro/${item.repo}`,
  featured: false,
  defaultWidth: 1100,
  defaultHeight: 760,
}));

export const EXAMPLE_APP_IDS = EXAMPLE_APPS.map((app) => app.id);
