/**
 * SoundCloud Light — Pedda vom Mond library (snapshot + optional live refresh)
 * Playback via official SoundCloud Widget embed.
 * Share: ?app=soundcloud&track=<id|permalink>
 */
import { el, clear } from '../utils/dom.js';
import { bus } from '../core/EventBus.js';

const CATALOG_URL = new URL('../../assets/soundcloud/catalog.json', import.meta.url).href;
const SC_ORANGE = '#ff5500';
const PAGE_SIZE = 80;

/** @type {object|null} */
let sharedCatalog = null;

function formatDuration(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return '—';
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    return `${h}:${String(m % 60).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatCount(n) {
  if (n == null) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function artworkUrl(url, size = 't67x67') {
  if (!url) return null;
  return url.replace('-large', `-${size}`).replace('-t500x500', `-${size}`);
}

function widgetSrc(trackOrUrl, autoplay = true) {
  const url =
    typeof trackOrUrl === 'string'
      ? trackOrUrl
      : trackOrUrl.permalink_url ||
        `https://api.soundcloud.com/tracks/${trackOrUrl.id}`;
  const params = new URLSearchParams({
    url,
    color: SC_ORANGE,
    auto_play: autoplay ? 'true' : 'false',
    hide_related: 'true',
    show_comments: 'false',
    show_user: 'true',
    show_reposts: 'false',
    show_teaser: 'false',
    visual: 'false',
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

export function buildShareUrl(track) {
  const u = new URL(window.location.href);
  // Normalize to /win11/ path if we are under it
  if (!u.pathname.includes('/win11')) {
    // keep current path (lab root)
  }
  u.searchParams.set('app', 'soundcloud');
  u.searchParams.set('track', String(track.permalink || track.id));
  u.searchParams.delete('playlist');
  u.hash = '';
  return u.toString();
}

export function parseSoundCloudDeepLink(search = window.location.search) {
  const params = new URLSearchParams(search);
  const app = params.get('app');
  if (app && app !== 'soundcloud') return null;
  const track = params.get('track') || params.get('t');
  if (!track && app !== 'soundcloud') return null;
  return {
    app: 'soundcloud',
    track: track || null,
    autoplay: params.get('autoplay') !== '0',
  };
}

function findTrack(catalog, key) {
  if (!catalog || key == null || key === '') return null;
  const k = String(key);
  const lists = [
    catalog.tracks || [],
    catalog.likes || [],
    ...(catalog.playlists || []).flatMap((p) => p.tracks || []),
  ];
  for (const list of lists) {
    for (const t of list) {
      if (!t || t.kind === 'playlist') continue;
      if (String(t.id) === k || t.permalink === k) return t;
    }
  }
  // reposts may be tracks
  for (const t of catalog.reposts || []) {
    if (t && t.kind !== 'playlist' && (String(t.id) === k || t.permalink === k)) return t;
  }
  return null;
}

async function loadCatalog() {
  if (sharedCatalog) return sharedCatalog;
  const res = await fetch(CATALOG_URL, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Katalog nicht ladbar (${res.status})`);
  sharedCatalog = await res.json();
  return sharedCatalog;
}

/** Try live refresh via public API (often blocked by CORS in browser). */
async function tryLiveRefresh(userId) {
  // Obtain client id from SC page is not CORS-friendly; skip unless we have one cached in session
  const clientId = sessionStorage.getItem('sc_client_id');
  if (!clientId || !userId) return null;

  async function page(path) {
    const items = [];
    let next = `https://api-v2.soundcloud.com/users/${userId}/${path}?client_id=${clientId}&limit=200&linked_partitioning=1`;
    let guard = 0;
    while (next && guard++ < 40) {
      const res = await fetch(next);
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      items.push(...(data.collection || []));
      next = data.next_href
        ? data.next_href.includes('client_id=')
          ? data.next_href
          : `${data.next_href}&client_id=${clientId}`
        : null;
    }
    return items;
  }

  const rawTracks = await page('tracks');
  const tracks = rawTracks
    .map((t) => ({
      id: t.id,
      title: t.title,
      permalink: t.permalink,
      permalink_url: t.permalink_url,
      artwork_url: t.artwork_url || t.user?.avatar_url,
      duration: t.duration,
      genre: t.genre || '',
      created_at: t.created_at,
      playback_count: t.playback_count ?? 0,
      likes_count: t.likes_count ?? 0,
      streamable: t.streamable !== false,
    }))
    .filter((t) => t.id);

  return { tracks, fetchedAt: new Date().toISOString() };
}

export function mountSoundCloud(host, meta, opts = {}) {
  const root = el('div', { className: 'sc-app' });
  host.append(root);

  /** @type {object|null} */
  let catalog = null;
  let tab = 'tracks'; // tracks | playlists | likes | reposts | about
  let query = '';
  let page = 0;
  let currentTrack = null;
  let playlistDetail = null; // when viewing a playlist
  let statusText = 'Lade Bibliothek…';

  const header = el('div', { className: 'sc-header' });
  const body = el('div', { className: 'sc-body' });
  const playerBar = el('div', { className: 'sc-player-bar' });
  const playerFrame = el('iframe', {
    className: 'sc-widget',
    title: 'SoundCloud Player',
    allow: 'autoplay',
    loading: 'lazy',
  });
  playerBar.append(
    el('div', { className: 'sc-player-label', text: 'Player' }),
    playerFrame
  );
  root.append(header, body, playerBar);

  function setStatus(msg) {
    statusText = msg;
    const elStatus = header.querySelector('.sc-status');
    if (elStatus) elStatus.textContent = msg;
  }

  function playTrack(track, autoplay = true) {
    if (!track || track.kind === 'playlist') return;
    currentTrack = track;
    playerFrame.src = widgetSrc(track, autoplay);
    meta?.setTitle?.(`${track.title} — SoundCloud`);
    setStatus(`Spielt: ${track.title}`);
    paintList();
  }

  async function copyShare(track) {
    const url = buildShareUrl(track);
    try {
      await navigator.clipboard.writeText(url);
      bus.emit('ui:toast', { title: 'Link kopiert', body: track.title });
    } catch {
      // fallback
      window.prompt('Link kopieren:', url);
    }
  }

  function filteredList() {
    if (!catalog) return [];
    let list;
    if (playlistDetail) {
      list = playlistDetail.tracks?.length
        ? playlistDetail.tracks
        : (catalog.tracks || []).filter((t) => (playlistDetail.track_ids || []).includes(t.id));
    } else if (tab === 'tracks') list = catalog.tracks || [];
    else if (tab === 'likes') list = catalog.likes || [];
    else if (tab === 'reposts') list = (catalog.reposts || []).filter((x) => x && x.kind !== 'playlist');
    else if (tab === 'playlists') list = catalog.playlists || [];
    else list = [];

    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((item) => {
      const hay = `${item.title || ''} ${item.genre || ''} ${item.permalink || ''}`.toLowerCase();
      return hay.includes(q);
    });
  }

  function paintHeader() {
    clear(header);
    const u = catalog?.user;
    const avatar = u?.avatar_url
      ? el('img', {
          className: 'sc-avatar',
          src: artworkUrl(u.avatar_url, 't200x200') || u.avatar_url,
          alt: '',
        })
      : el('div', { className: 'sc-avatar sc-avatar-fallback', text: '☁️' });

    const stats = el('div', { className: 'sc-stats' },
      el('span', { text: `${formatCount(u?.track_count ?? catalog?.tracks?.length ?? 0)} Tracks` }),
      el('span', { text: `${formatCount(u?.followers_count)} Follower` }),
      el('span', { text: `${formatCount(catalog?.playlists?.length)} Playlists` }),
    );

    const refreshBtn = el('button', {
      type: 'button',
      className: 'sc-btn',
      text: '↻ Aktualisieren',
      title: 'Live-Refresh (falls API erreichbar)',
      onClick: async () => {
        refreshBtn.disabled = true;
        setStatus('Aktualisiere…');
        try {
          const live = await tryLiveRefresh(catalog?.user?.id);
          if (live?.tracks?.length) {
            catalog = { ...catalog, tracks: live.tracks, fetchedAt: live.fetchedAt };
            sharedCatalog = catalog;
            setStatus(`Live: ${live.tracks.length} Tracks · ${new Date(live.fetchedAt).toLocaleString()}`);
            bus.emit('ui:toast', { title: 'SoundCloud', body: 'Bibliothek aktualisiert' });
            page = 0;
            paintList();
          } else {
            bus.emit('ui:toast', {
              title: 'Snapshot aktiv',
              body: 'Live-API blockiert (CORS). Katalog-Script auf dem Server ausführen.',
            });
            setStatus(
              catalog?.fetchedAt
                ? `Snapshot · ${new Date(catalog.fetchedAt).toLocaleString()}`
                : 'Snapshot'
            );
          }
        } catch (e) {
          bus.emit('ui:toast', {
            title: 'Refresh fehlgeschlagen',
            body: e.message || 'Netzwerk/CORS',
          });
          setStatus('Snapshot (Refresh fehlgeschlagen)');
        } finally {
          refreshBtn.disabled = false;
        }
      },
    });

    const openSc = el('a', {
      className: 'sc-btn sc-btn-ghost',
      href: u?.permalink_url || 'https://soundcloud.com/dj-peet-sounds',
      target: '_blank',
      rel: 'noopener',
      text: 'Auf SoundCloud ↗',
    });

    header.append(
      el('div', { className: 'sc-profile' },
        avatar,
        el('div', { className: 'sc-profile-meta' },
          el('div', { className: 'sc-name', text: u?.username || 'SoundCloud' }),
          el('div', { className: 'sc-handle', text: u?.permalink ? `@${u.permalink}` : '' }),
          stats,
          el('div', { className: 'sc-status', text: statusText }),
        ),
      ),
      el('div', { className: 'sc-header-actions' }, refreshBtn, openSc),
    );
  }

  function paintTabs() {
    const tabs = el('div', { className: 'sc-tabs' });
    const defs = [
      ['tracks', 'Tracks', catalog?.tracks?.length],
      ['playlists', 'Playlists', catalog?.playlists?.length],
      ['likes', 'Likes', catalog?.likes?.length],
      ['reposts', 'Reposts', catalog?.reposts?.length],
      ['about', 'About', null],
    ];
    for (const [id, label, count] of defs) {
      const btn = el('button', {
        type: 'button',
        className: 'sc-tab' + (tab === id && !playlistDetail ? ' active' : ''),
        text: count != null ? `${label} (${count})` : label,
        onClick: () => {
          tab = id;
          playlistDetail = null;
          page = 0;
          query = '';
          paintBody();
        },
      });
      tabs.append(btn);
    }
    return tabs;
  }

  function trackRow(track, i) {
    const art = artworkUrl(track.artwork_url);
    const isActive = currentTrack && String(currentTrack.id) === String(track.id);
    const row = el('div', {
      className: 'sc-row' + (isActive ? ' active' : ''),
      role: 'button',
      tabindex: '0',
    });

    const left = el('div', {
      className: 'sc-row-main',
      onClick: () => playTrack(track, true),
      onKeydown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playTrack(track, true);
        }
      },
    },
      el('span', { className: 'sc-row-idx', text: String(i + 1) }),
      art
        ? el('img', { className: 'sc-row-art', src: art, alt: '', loading: 'lazy' })
        : el('div', { className: 'sc-row-art sc-row-art-fallback', text: '🎵' }),
      el('div', { className: 'sc-row-meta' },
        el('div', { className: 'sc-row-title', text: track.title || '—' }),
        el('div', { className: 'sc-row-sub', text: [track.genre, formatCount(track.playback_count) + ' plays'].filter(Boolean).join(' · ') }),
      ),
      el('span', { className: 'sc-row-dur', text: formatDuration(track.duration) }),
    );

    const shareBtn = el('button', {
      type: 'button',
      className: 'sc-share',
      title: 'Link teilen (öffnet App mit diesem Track)',
      text: 'Teilen',
      onClick: (e) => {
        e.stopPropagation();
        copyShare(track);
      },
    });

    const playBtn = el('button', {
      type: 'button',
      className: 'sc-play-mini',
      title: 'Abspielen',
      text: '▶',
      onClick: (e) => {
        e.stopPropagation();
        playTrack(track, true);
      },
    });

    row.append(left, playBtn, shareBtn);
    return row;
  }

  function playlistRow(pl) {
    const art = artworkUrl(pl.artwork_url);
    const row = el('div', {
      className: 'sc-row',
      role: 'button',
      tabindex: '0',
      onClick: () => {
        playlistDetail = pl;
        page = 0;
        paintBody();
      },
    },
      el('div', { className: 'sc-row-main' },
        el('span', { className: 'sc-row-idx', text: '📁' }),
        art
          ? el('img', { className: 'sc-row-art', src: art, alt: '', loading: 'lazy' })
          : el('div', { className: 'sc-row-art sc-row-art-fallback', text: '📂' }),
        el('div', { className: 'sc-row-meta' },
          el('div', { className: 'sc-row-title', text: pl.title || 'Playlist' }),
          el('div', { className: 'sc-row-sub', text: `${pl.track_count ?? pl.track_ids?.length ?? 0} Tracks` }),
        ),
        el('span', { className: 'sc-row-dur', text: formatDuration(pl.duration) }),
      ),
    );
    return row;
  }

  function paintList() {
    const listHost = body.querySelector('.sc-list');
    if (!listHost) return;
    clear(listHost);

    if (tab === 'about') return;

    const items = filteredList();
    if (!items.length) {
      listHost.append(
        el('div', {
          className: 'sc-empty',
          text: query ? 'Keine Treffer.' : 'Keine Einträge in diesem Tab.',
        })
      );
      return;
    }

    const start = page * PAGE_SIZE;
    const slice = items.slice(start, start + PAGE_SIZE);
    const isPl = tab === 'playlists' && !playlistDetail;

    slice.forEach((item, i) => {
      if (isPl) listHost.append(playlistRow(item));
      else listHost.append(trackRow(item, start + i));
    });

    const pager = el('div', { className: 'sc-pager' });
    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    pager.append(
      el('button', {
        type: 'button',
        className: 'sc-btn sc-btn-ghost',
        text: '← Zurück',
        disabled: page <= 0,
        onClick: () => {
          page = Math.max(0, page - 1);
          paintList();
          body.querySelector('.sc-list')?.scrollTo?.(0, 0);
        },
      }),
      el('span', {
        className: 'sc-page-info',
        text: `${start + 1}–${Math.min(start + PAGE_SIZE, items.length)} / ${items.length} · Seite ${page + 1}/${totalPages}`,
      }),
      el('button', {
        type: 'button',
        className: 'sc-btn sc-btn-ghost',
        text: 'Weiter →',
        disabled: start + PAGE_SIZE >= items.length,
        onClick: () => {
          page++;
          paintList();
          body.querySelector('.sc-list')?.scrollTo?.(0, 0);
        },
      }),
    );
    listHost.append(pager);
  }

  function paintBody() {
    clear(body);
    if (!catalog) {
      body.append(el('div', { className: 'sc-empty', text: statusText || 'Laden…' }));
      return;
    }

    body.append(paintTabs());

    if (playlistDetail) {
      body.append(
        el('div', { className: 'sc-breadcrumb' },
          el('button', {
            type: 'button',
            className: 'sc-btn sc-btn-ghost',
            text: '← Playlists',
            onClick: () => {
              playlistDetail = null;
              page = 0;
              paintBody();
            },
          }),
          el('span', { text: playlistDetail.title || 'Playlist' }),
        )
      );
    }

    if (tab === 'about') {
      const u = catalog.user || {};
      body.append(
        el('div', { className: 'sc-about' },
          el('p', { text: u.description || 'Keine Beschreibung.' }),
          el('p', {
            className: 'sc-muted',
            text: `Snapshot: ${catalog.fetchedAt ? new Date(catalog.fetchedAt).toLocaleString() : '—'} · ${catalog.tracks?.length || 0} Tracks im Katalog`,
          }),
          el('a', {
            href: u.permalink_url || 'https://soundcloud.com/dj-peet-sounds',
            target: '_blank',
            rel: 'noopener',
            className: 'sc-btn',
            text: 'Profil auf SoundCloud öffnen',
          }),
        )
      );
      return;
    }

    const search = el('input', {
      type: 'search',
      className: 'sc-search',
      placeholder: playlistDetail
        ? 'In Playlist suchen…'
        : tab === 'playlists'
          ? 'Playlists suchen…'
          : 'Tracks suchen…',
      value: query,
      onInput: (e) => {
        query = e.target.value;
        page = 0;
        paintList();
      },
    });
    body.append(search, el('div', { className: 'sc-list' }));
    paintList();
  }

  function applyDeepLink(trackKey, autoplay = true) {
    if (!catalog || !trackKey) return false;
    const t = findTrack(catalog, trackKey);
    if (!t) {
      bus.emit('ui:toast', {
        title: 'Track nicht im Katalog',
        body: String(trackKey),
      });
      return false;
    }
    tab = 'tracks';
    playlistDetail = null;
    playTrack(t, autoplay);
    paintBody();
    return true;
  }

  const onBusPlay = (payload) => {
    if (!payload) return;
    if (payload.track) applyDeepLink(payload.track, payload.autoplay !== false);
  };
  bus.on('soundcloud:play', onBusPlay);

  const onClose = (m) => {
    if (m?.id === meta?.id) {
      bus.off('soundcloud:play', onBusPlay);
      bus.off('window:close', onClose);
      playerFrame.removeAttribute('src');
    }
  };
  bus.on('window:close', onClose);

  (async () => {
    try {
      catalog = await loadCatalog();
      setStatus(
        catalog.fetchedAt
          ? `Snapshot · ${new Date(catalog.fetchedAt).toLocaleString()} · ${catalog.tracks?.length || 0} Tracks`
          : `${catalog.tracks?.length || 0} Tracks`
      );
      paintHeader();
      paintBody();

      const trackKey = opts.track || opts.trackId || opts.permalink;
      if (trackKey) {
        applyDeepLink(trackKey, opts.autoplay !== false);
      }
    } catch (e) {
      statusText = e.message || 'Fehler';
      paintHeader();
      body.append(
        el('div', {
          className: 'sc-empty',
          text: `Katalog konnte nicht geladen werden: ${e.message}`,
        })
      );
    }
  })();
}
