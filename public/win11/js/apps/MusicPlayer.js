import { el, clear } from '../utils/dom.js';
import { FileSystem } from '../core/FileSystem.js';
import { State } from '../core/State.js';
import { bus } from '../core/EventBus.js';

/** Built-in offline demo tracks (served as static assets) */
export const DEMO_TRACKS = [
  {
    id: 'ambient-focus',
    title: 'Ambient Focus',
    artist: 'Win11 Sim',
    src: 'assets/music/ambient-focus.wav',
    mime: 'audio/wav',
  },
  {
    id: 'lofi-beats',
    title: 'Lo-Fi Beats',
    artist: 'Win11 Sim',
    src: 'assets/music/lofi-beats.wav',
    mime: 'audio/wav',
  },
  {
    id: 'coding-jazz',
    title: 'Coding Jazz',
    artist: 'Win11 Sim',
    src: 'assets/music/coding-jazz.wav',
    mime: 'audio/wav',
  },
  {
    id: 'sunrise-keys',
    title: 'Sunrise Keys',
    artist: 'Win11 Sim',
    src: 'assets/music/sunrise-keys.wav',
    mime: 'audio/wav',
  },
];

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function trackFromFsNode(node) {
  if (!node) return null;
  const isWav =
    node.mime === 'audio/wav' ||
    node.mime === 'audio/wave' ||
    node.mime === 'audio/x-wav' ||
    /\.wav$/i.test(node.name);
  if (!isWav && !String(node.mime || '').startsWith('audio/')) {
    // still allow if src points to audio
    if (!node.src && !/^assets\/.+\.wav$/i.test(node.content || '')) return null;
  }

  let src = node.src || '';
  if (!src && node.content) {
    if (/^assets\//i.test(node.content) || /^https?:\/\//i.test(node.content) || node.content.startsWith('blob:') || node.content.startsWith('data:')) {
      src = node.content;
    }
  }

  return {
    id: node.id || node.name,
    title: node.name.replace(/\.wav$/i, ''),
    artist: node.artist || 'Musikbibliothek',
    src,
    mime: node.mime || 'audio/wav',
    fileId: node.id,
  };
}

function libraryFromFs() {
  const music = FileSystem.special('music');
  if (!music) return [];
  const tracks = [];
  function walk(folder) {
    for (const child of folder.children || []) {
      if (child.type === 'folder') walk(child);
      else {
        const t = trackFromFsNode(child);
        if (t?.src) tracks.push(t);
      }
    }
  }
  walk(music);
  return tracks;
}

export function mountMusicPlayer(host, meta, opts = {}) {
  const audio = new Audio();
  audio.preload = 'metadata';
  audio.volume = Math.min(1, Math.max(0, (State.get().volume ?? 60) / 100));

  /** @type {Array<{id:string,title:string,artist:string,src:string}>} */
  let playlist = [];
  let index = 0;
  let shuffle = false;
  let repeat = 'off'; // off | one | all
  let objectUrls = [];

  // Seed playlist: demo + VFS
  const seen = new Set();
  for (const t of [...DEMO_TRACKS, ...libraryFromFs()]) {
    if (seen.has(t.src)) continue;
    seen.add(t.src);
    playlist.push({ ...t });
  }

  // Open specific file if requested
  if (opts.fileId) {
    const node = FileSystem.find(opts.fileId);
    const t = trackFromFsNode(node);
    if (t?.src) {
      const i = playlist.findIndex((p) => p.src === t.src || p.fileId === t.fileId);
      if (i >= 0) index = i;
      else {
        playlist.unshift(t);
        index = 0;
      }
    }
  }
  if (opts.trackSrc) {
    const i = playlist.findIndex((p) => p.src === opts.trackSrc);
    if (i >= 0) index = i;
    else {
      playlist.unshift({
        id: opts.trackSrc,
        title: opts.title || 'Track',
        artist: opts.artist || 'Lokal',
        src: opts.trackSrc,
      });
      index = 0;
    }
  }

  if (!playlist.length) {
    playlist = [...DEMO_TRACKS];
  }

  const root = el('div', { className: 'music-player' });
  const nowPlaying = el('div', { className: 'music-now' });
  const art = el('div', { className: 'music-art', text: '🎵' });
  const info = el('div', { className: 'music-info' });
  const titleEl = el('div', { className: 'music-title', text: '—' });
  const artistEl = el('div', { className: 'music-artist', text: '—' });
  info.append(titleEl, artistEl);
  nowPlaying.append(art, info);

  const progressRow = el('div', { className: 'music-progress-row' });
  const timeCur = el('span', { className: 'music-time', text: '0:00' });
  const seek = el('input', {
    type: 'range',
    className: 'music-seek',
    min: 0,
    max: 1000,
    value: 0,
    step: 1,
  });
  const timeDur = el('span', { className: 'music-time', text: '0:00' });
  progressRow.append(timeCur, seek, timeDur);

  const controls = el('div', { className: 'music-controls' });
  const btnShuffle = ctrlBtn('🔀', 'Zufall', () => {
    shuffle = !shuffle;
    btnShuffle.classList.toggle('active', shuffle);
  });
  const btnPrev = ctrlBtn('⏮', 'Zurück', () => prev());
  const btnPlay = ctrlBtn('▶', 'Play/Pause', () => togglePlay(), 'music-play');
  const btnNext = ctrlBtn('⏭', 'Weiter', () => next());
  const btnRepeat = ctrlBtn('🔁', 'Wiederholen', () => {
    repeat = repeat === 'off' ? 'all' : repeat === 'all' ? 'one' : 'off';
    btnRepeat.classList.toggle('active', repeat !== 'off');
    btnRepeat.title = repeat === 'off' ? 'Wiederholen aus' : repeat === 'all' ? 'Alle wiederholen' : 'Titel wiederholen';
    btnRepeat.textContent = repeat === 'one' ? '🔂' : '🔁';
  });
  controls.append(btnShuffle, btnPrev, btnPlay, btnNext, btnRepeat);

  const volRow = el('div', { className: 'music-vol-row' });
  const volIcon = el('span', { text: '🔊' });
  const vol = el('input', {
    type: 'range',
    className: 'music-vol',
    min: 0,
    max: 100,
    value: Math.round(audio.volume * 100),
  });
  vol.addEventListener('input', () => {
    audio.volume = Number(vol.value) / 100;
    volIcon.textContent = audio.volume === 0 ? '🔇' : '🔊';
  });
  volRow.append(volIcon, vol);

  const actions = el('div', { className: 'music-actions' });
  const fileInput = el('input', {
    type: 'file',
    accept: 'audio/wav,audio/wave,audio/x-wav,.wav,audio/*',
    multiple: true,
    hidden: true,
  });
  const importBtn = el('button', {
    className: 'btn btn-primary',
    type: 'button',
    text: '📁 WAV importieren',
    onClick: () => fileInput.click(),
  });
  const demoBtn = el('button', {
    className: 'btn',
    type: 'button',
    text: 'Demo-Tracks laden',
    onClick: () => {
      for (const t of DEMO_TRACKS) {
        if (!playlist.some((p) => p.src === t.src)) playlist.push({ ...t });
      }
      paintList();
      bus.emit('ui:toast', { title: 'Playlist', body: 'Demo-Tracks hinzugefügt' });
    },
  });
  actions.append(importBtn, demoBtn, fileInput);

  const listTitle = el('div', { className: 'music-list-title', text: 'Playlist' });
  const list = el('div', { className: 'music-list' });

  root.append(nowPlaying, progressRow, controls, volRow, actions, listTitle, list);
  host.append(root);

  fileInput.addEventListener('change', async () => {
    const files = [...(fileInput.files || [])];
    if (!files.length) return;
    let added = 0;
    for (const file of files) {
      if (!/\.wav$/i.test(file.name) && file.type && !file.type.includes('wav') && !file.type.startsWith('audio/')) {
        continue;
      }
      const url = URL.createObjectURL(file);
      objectUrls.push(url);
      playlist.push({
        id: 'local_' + url,
        title: file.name.replace(/\.wav$/i, ''),
        artist: 'Importiert',
        src: url,
        mime: file.type || 'audio/wav',
      });
      // Also copy reference into VFS Music folder (path note only — blob won't persist)
      try {
        const folder = FileSystem.special('music');
        if (folder) {
          FileSystem.createFile(
            folder.id,
            file.name.endsWith('.wav') ? file.name : file.name + '.wav',
            url,
            'audio/wav'
          );
        }
      } catch {
        /* ignore dup names etc */
      }
      added++;
    }
    fileInput.value = '';
    if (added) {
      paintList();
      // play last added if nothing playing
      if (audio.paused) {
        index = playlist.length - added;
        loadTrack(true);
      }
      bus.emit('ui:toast', { title: 'Import', body: `${added} Track(s) hinzugefügt` });
    } else {
      bus.emit('ui:toast', { title: 'Import', body: 'Keine passenden Audiodateien gefunden' });
    }
  });

  seek.addEventListener('input', () => {
    if (!audio.duration) return;
    audio.currentTime = (Number(seek.value) / 1000) * audio.duration;
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    seek.value = String(Math.floor((audio.currentTime / audio.duration) * 1000));
    timeCur.textContent = formatTime(audio.currentTime);
    timeDur.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('loadedmetadata', () => {
    timeDur.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('play', () => {
    btnPlay.textContent = '⏸';
    art.classList.add('playing');
  });

  audio.addEventListener('pause', () => {
    btnPlay.textContent = '▶';
    art.classList.remove('playing');
  });

  audio.addEventListener('ended', () => {
    if (repeat === 'one') {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      return;
    }
    if (index < playlist.length - 1 || repeat === 'all' || shuffle) {
      next(true);
    } else {
      btnPlay.textContent = '▶';
      art.classList.remove('playing');
    }
  });

  audio.addEventListener('error', () => {
    bus.emit('ui:toast', {
      title: 'Wiedergabefehler',
      body: 'Track konnte nicht geladen werden (Pfad/Format prüfen).',
    });
  });

  function ctrlBtn(label, title, onClick, extraClass = '') {
    return el('button', {
      className: 'music-ctrl' + (extraClass ? ' ' + extraClass : ''),
      type: 'button',
      title,
      text: label,
      onClick,
    });
  }

  function current() {
    return playlist[index] || null;
  }

  function loadTrack(autoplay = false) {
    const t = current();
    if (!t) return;
    titleEl.textContent = t.title;
    artistEl.textContent = t.artist || 'Unbekannt';
    meta?.setTitle?.(`${t.title} — Medienplayer`);
    audio.src = t.src;
    audio.load();
    seek.value = '0';
    timeCur.textContent = '0:00';
    paintList();
    if (autoplay) {
      audio.play().catch((err) => {
        console.warn(err);
        bus.emit('ui:toast', { title: 'Autoplay blockiert', body: 'Play-Taste drücken' });
      });
    }
  }

  function togglePlay() {
    if (!audio.src) {
      loadTrack(true);
      return;
    }
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  function next(fromEnded = false) {
    if (!playlist.length) return;
    if (shuffle) {
      let n = index;
      if (playlist.length > 1) {
        while (n === index) n = Math.floor(Math.random() * playlist.length);
      }
      index = n;
    } else if (index < playlist.length - 1) {
      index++;
    } else if (repeat === 'all' || fromEnded) {
      index = 0;
    } else {
      return;
    }
    loadTrack(true);
  }

  function prev() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    if (!playlist.length) return;
    index = index <= 0 ? playlist.length - 1 : index - 1;
    loadTrack(true);
  }

  function paintList() {
    clear(list);
    if (!playlist.length) {
      list.append(el('div', { className: 'music-empty', text: 'Playlist ist leer — importiere .wav Dateien.' }));
      return;
    }
    playlist.forEach((t, i) => {
      const row = el('button', {
        className: 'music-track' + (i === index ? ' active' : ''),
        type: 'button',
      },
        el('span', { className: 'music-track-idx', text: String(i + 1) }),
        el('span', { className: 'music-track-meta' },
          el('span', { className: 'music-track-title', text: t.title }),
          el('span', { className: 'music-track-artist', text: t.artist || '' }),
        ),
        el('span', { className: 'music-track-badge', text: /\.wav$/i.test(t.src) || t.mime?.includes('wav') ? 'WAV' : 'AUDIO' }),
      );
      row.addEventListener('click', () => {
        index = i;
        loadTrack(true);
      });
      row.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        playlist.splice(i, 1);
        if (index >= playlist.length) index = Math.max(0, playlist.length - 1);
        if (i === index || !playlist.length) {
          if (playlist.length) loadTrack(false);
          else {
            audio.pause();
            audio.removeAttribute('src');
            titleEl.textContent = '—';
            artistEl.textContent = '—';
          }
        } else if (i < index) {
          index--;
        }
        paintList();
      });
      list.append(row);
    });
    listTitle.textContent = `Playlist (${playlist.length})`;
  }

  // Cleanup object URLs when window closes
  const onClose = (m) => {
    if (m?.id === meta?.id) {
      audio.pause();
      audio.removeAttribute('src');
      for (const u of objectUrls) URL.revokeObjectURL(u);
      objectUrls = [];
      bus.off('window:close', onClose);
    }
  };
  bus.on('window:close', onClose);

  loadTrack(Boolean(opts.autoplay || opts.fileId));
  paintList();
}
