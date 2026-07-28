"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  formatBadge,
  soundcloudEmbedUrl,
  trackNumber,
  type MediaCatalog,
  type MediaTrack,
} from "../../lib/media-catalog";

type Props = {
  catalog: MediaCatalog;
  source: "remote" | "same-origin" | "fallback";
  catalogUrl: string | null;
};

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function ListenPlayer({ catalog, source, catalogUrl }: Props) {
  const tracks = catalog.tracks;
  const hostable = useMemo(
    () => tracks.map((t, i) => ({ track: t, index: i })).filter((x) => Boolean(x.track.src)),
    [tracks],
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(
    hostable[0]?.track.id ?? null,
  );
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const activeTrack: MediaTrack | null = useMemo(() => {
    if (!activeId) return null;
    return tracks.find((t) => t.id === activeId) ?? null;
  }, [activeId, tracks]);

  const load = useCallback(
    (track: MediaTrack, autoplay: boolean) => {
      const audio = audioRef.current;
      if (!audio || !track.src) return;
      setError(null);
      setActiveId(track.id);
      if (audio.src !== track.src) {
        audio.src = track.src;
        audio.load();
      }
      if (autoplay) {
        void audio.play().catch(() => {
          setPlaying(false);
          setError("Autoplay blockiert — Play drücken.");
        });
      }
    },
    [],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      const idx = hostable.findIndex((h) => h.track.id === activeId);
      if (idx >= 0 && idx < hostable.length - 1) {
        load(hostable[idx + 1].track, true);
      } else {
        setPlaying(false);
      }
    };
    const onErr = () => {
      setPlaying(false);
      setError("Track konnte nicht geladen werden (URL/CORS prüfen).");
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onErr);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onErr);
    };
  }, [activeId, hostable, load]);

  // Prefill first hostable track without autoplay
  useEffect(() => {
    if (hostable[0] && audioRef.current && !audioRef.current.src) {
      load(hostable[0].track, false);
    }
  }, [hostable, load]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!activeTrack?.src && hostable[0]) {
      load(hostable[0].track, true);
      return;
    }
    if (audio.paused) void audio.play().catch(() => setError("Wiedergabe nicht möglich."));
    else audio.pause();
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = (value / 1000) * duration;
  };

  const sourceLabel =
    source === "remote"
      ? "Media-Host Katalog"
      : source === "same-origin"
        ? "Lokaler Katalog"
        : "Fallback (SoundCloud)";

  return (
    <div className="listen-player">
      <audio ref={audioRef} preload="metadata" />

      <div className="listen-player-status">
        <span className="listen-pill">{sourceLabel}</span>
        {catalog.artist ? <span className="listen-pill muted">{catalog.artist}</span> : null}
        {catalogUrl ? (
          <span className="listen-pill muted" title={catalogUrl}>
            catalog ok
          </span>
        ) : null}
        {hostable.length > 0 ? (
          <span className="listen-pill acid">{hostable.length} native</span>
        ) : (
          <span className="listen-pill muted">kein Host-Audio · SoundCloud</span>
        )}
      </div>

      {hostable.length > 0 ? (
        <div className="native-deck">
          <div className="native-deck-meta">
            <p className="eyebrow dark">NOW PLAYING</p>
            <h3>{activeTrack?.title ?? "—"}</h3>
            <p>
              {activeTrack?.artist ?? catalog.artist ?? "DJ Peet"}
              {activeTrack?.mood ? ` · ${activeTrack.mood}` : ""}
            </p>
          </div>

          <div className="native-controls">
            <button type="button" className="native-play" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
              {playing ? "PAUSE" : "PLAY"}
            </button>
            <div className="native-seek-row">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={1000}
                value={duration ? Math.floor((currentTime / duration) * 1000) : 0}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label="Position"
              />
              <span>{formatTime(duration)}</span>
            </div>
            {error ? <p className="native-error">{error}</p> : null}
          </div>
        </div>
      ) : null}

      <div className="track-stack">
        {tracks.map((track, i) => {
          const n = trackNumber(i);
          const isActive = track.id === activeId;
          const hasSrc = Boolean(track.src);
          const canDownload = Boolean(track.download && track.src);

          return (
            <article className={`track${isActive ? " is-active" : ""}`} key={track.id}>
              <div className="track-meta">
                <span>{n}</span>
                <div>
                  <h2>{track.title}</h2>
                  <p>
                    {track.mood ?? track.artist ?? "—"}
                    <span className="track-format"> · {formatBadge(track)}</span>
                  </p>
                  <div className="track-actions">
                    {hasSrc ? (
                      <button
                        type="button"
                        className="track-action"
                        onClick={() => load(track, true)}
                      >
                        {isActive && playing ? "Läuft…" : "Abspielen"}
                      </button>
                    ) : null}
                    {canDownload ? (
                      <a
                        className="track-action"
                        href={track.src}
                        download
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download
                      </a>
                    ) : null}
                    {track.soundcloud ? (
                      <a
                        className="track-action ghost"
                        href={track.soundcloud}
                        target="_blank"
                        rel="noreferrer"
                      >
                        SoundCloud ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              {hasSrc ? (
                <div className="track-native-slot">
                  <div className="track-wave" aria-hidden="true">
                    {Array.from({ length: 24 }).map((_, k) => (
                      <i
                        key={k}
                        style={{
                          height: `${30 + ((k * 17) % 70)}%`,
                          opacity: isActive && playing ? 1 : 0.35,
                        }}
                      />
                    ))}
                  </div>
                  <p className="track-src-hint">
                    Host-Audio · {formatBadge(track)}
                    {canDownload ? " · Download freigeschaltet" : ""}
                  </p>
                </div>
              ) : track.soundcloud ? (
                <iframe
                  title={`${track.title} – Webplayer`}
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  loading="lazy"
                  src={soundcloudEmbedUrl(track.soundcloud)}
                />
              ) : (
                <p className="track-missing">Keine Audio-Quelle für diesen Track.</p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
