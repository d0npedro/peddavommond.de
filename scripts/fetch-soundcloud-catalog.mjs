/**
 * Export Pedda vom Mond SoundCloud library → public/win11/assets/soundcloud/catalog.json
 * Usage: node scripts/fetch-soundcloud-catalog.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'public/win11/assets/soundcloud/catalog.json');
const USER_PERMALINK = 'dj-peet-sounds';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function getClientId() {
  const res = await fetch(`https://soundcloud.com/${USER_PERMALINK}`, {
    headers: { 'User-Agent': UA, Accept: 'text/html' },
  });
  if (!res.ok) throw new Error(`Profile HTML ${res.status}`);
  const html = await res.text();
  const m = html.match(/window\.__sc_hydration\s*=\s*(\[[\s\S]*?\]);\s*<\/script>/);
  if (!m) throw new Error('No __sc_hydration on profile page');
  const hydration = JSON.parse(m[1]);
  const api = hydration.find((x) => x.hydratable === 'apiClient');
  const user = hydration.find((x) => x.hydratable === 'user')?.data;
  const clientId = api?.data?.id;
  if (!clientId) throw new Error('No client_id in hydration');
  if (!user?.id) throw new Error('No user in hydration');
  return { clientId, user };
}

async function fetchAll(url, clientId, mapItem) {
  const items = [];
  let next = url.includes('client_id=')
    ? url
    : `${url}${url.includes('?') ? '&' : '?'}client_id=${clientId}&limit=200&linked_partitioning=1`;

  while (next) {
    const res = await fetch(next, {
      headers: { 'User-Agent': UA, Accept: 'application/json' },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`API ${res.status} ${next.slice(0, 120)} ${text.slice(0, 200)}`);
    }
    const data = await res.json();
    const batch = data.collection || data;
    if (!Array.isArray(batch)) break;
    for (const raw of batch) {
      const mapped = mapItem(raw);
      if (mapped) items.push(mapped);
    }
    next = data.next_href || null;
    if (next && !next.includes('client_id=')) {
      next += (next.includes('?') ? '&' : '?') + `client_id=${clientId}`;
    }
    process.stdout.write(`  … ${items.length}\r`);
  }
  process.stdout.write('\n');
  return items;
}

function slimTrack(t) {
  if (!t || t.kind === 'playlist') return null;
  // likes/reposts wrappers
  const track = t.track || t;
  if (!track?.id || track.kind === 'playlist') return null;
  return {
    id: track.id,
    title: track.title || 'Untitled',
    permalink: track.permalink || String(track.id),
    permalink_url: track.permalink_url || `https://soundcloud.com/${USER_PERMALINK}/${track.permalink || track.id}`,
    artwork_url: track.artwork_url || track.user?.avatar_url || null,
    duration: track.duration || 0,
    genre: track.genre || '',
    created_at: track.created_at || null,
    playback_count: track.playback_count ?? 0,
    likes_count: track.likes_count ?? 0,
    streamable: track.streamable !== false,
  };
}

function slimPlaylist(p) {
  if (!p?.id) return null;
  const tracks = Array.isArray(p.tracks)
    ? p.tracks.map((t) => slimTrack(t)).filter(Boolean)
    : [];
  return {
    id: p.id,
    title: p.title || 'Playlist',
    permalink: p.permalink || String(p.id),
    permalink_url: p.permalink_url || null,
    artwork_url: p.artwork_url || p.calculated_artwork_url || null,
    track_count: p.track_count ?? tracks.length,
    duration: p.duration || 0,
    created_at: p.created_at || null,
    // store ids only to keep catalog smaller; full playlist tracks when present
    track_ids: tracks.map((t) => t.id),
    tracks: tracks.length ? tracks : undefined,
  };
}

function slimUser(u) {
  return {
    id: u.id,
    username: u.username,
    full_name: u.full_name || '',
    permalink: u.permalink,
    permalink_url: u.permalink_url,
    avatar_url: u.avatar_url,
    description: u.description || '',
    followers_count: u.followers_count ?? 0,
    followings_count: u.followings_count ?? 0,
    track_count: u.track_count ?? 0,
    playlist_count: u.playlist_count ?? 0,
    city: u.city || null,
    country_code: u.country_code || null,
  };
}

async function main() {
  console.log('Resolving client_id + user…');
  const { clientId, user } = await getClientId();
  console.log(`User ${user.username} (${user.id}) tracks≈${user.track_count} client=${clientId.slice(0, 8)}…`);

  const base = `https://api-v2.soundcloud.com/users/${user.id}`;

  console.log('Fetching tracks…');
  const tracks = await fetchAll(`${base}/tracks`, clientId, slimTrack);
  // de-dupe by id
  const trackMap = new Map();
  for (const t of tracks) trackMap.set(t.id, t);

  console.log('Fetching playlists…');
  let playlists = [];
  try {
    playlists = await fetchAll(`${base}/playlists`, clientId, slimPlaylist);
  } catch (e) {
    console.warn('playlists failed, trying playlists_without_albums', e.message);
    playlists = await fetchAll(`${base}/playlists_without_albums`, clientId, slimPlaylist);
  }

  console.log('Fetching likes…');
  let likes = [];
  try {
    likes = await fetchAll(`${base}/likes`, clientId, (item) => slimTrack(item.track || item));
  } catch (e) {
    console.warn('likes failed', e.message);
  }

  console.log('Fetching reposts…');
  let reposts = [];
  try {
    reposts = await fetchAll(`${base}/reposts`, clientId, (item) => {
      if (item.track) return slimTrack(item.track);
      if (item.playlist) {
        return {
          id: item.playlist.id,
          title: item.playlist.title,
          permalink: item.playlist.permalink,
          permalink_url: item.playlist.permalink_url,
          artwork_url: item.playlist.artwork_url,
          duration: item.playlist.duration || 0,
          kind: 'playlist',
        };
      }
      return slimTrack(item);
    });
  } catch (e) {
    console.warn('reposts failed', e.message);
  }

  const catalog = {
    version: 1,
    source: 'soundcloud',
    profile: USER_PERMALINK,
    fetchedAt: new Date().toISOString(),
    clientIdHint: null, // never store client id long-term in public catalog
    user: slimUser(user),
    tracks: [...trackMap.values()],
    playlists,
    likes: likes.filter(Boolean),
    reposts: reposts.filter(Boolean),
  };

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(catalog), 'utf8');
  console.log(
    `Wrote ${OUT}\n  tracks=${catalog.tracks.length} playlists=${catalog.playlists.length} likes=${catalog.likes.length} reposts=${catalog.reposts.length}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
