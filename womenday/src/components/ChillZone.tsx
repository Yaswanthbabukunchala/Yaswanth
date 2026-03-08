/*
  Personal Use License Notice:
  You may use this item multiple times for personal use only.
  You may not resell, redistribute, or use it for any commercial purpose.
  Unauthorized use may result in legal action.
*/
import React, { useEffect, useRef, useState } from "react";
import textConfig from "../textConfig";
import { useAudio } from "../contexts/AudioContext";

import music1 from "../music/music1.mp3";
import music2 from "../music/music2.mp3";
import music3 from "../music/music3.mp3";

import cover1 from "../musiccover/music1.jpg";
import cover2 from "../musiccover/music2.jpg";
import cover3 from "../musiccover/music3.jpg";

type Track = {
  id: number;
  title: string;
  caption: string;
  src: string;
  cover: string;
};

interface ChillZoneProps {
  onNext?: () => void;
}

export default function ChillZone({ onNext }: ChillZoneProps) {
  const tracks: Track[] = [
    { id: 1, title: textConfig.chillZone.tracks[0].title, caption: textConfig.chillZone.tracks[0].caption, src: music1, cover: cover1 },
    { id: 2, title: textConfig.chillZone.tracks[1].title, caption: textConfig.chillZone.tracks[1].caption, src: music2, cover: cover2 },
    { id: 3, title: textConfig.chillZone.tracks[2].title, caption: textConfig.chillZone.tracks[2].caption, src: music3, cover: cover3 },
  ];

  const {
    activeTrack,
    isPlaying,
    progress,
    currentTime,
    duration,
    playTrack,
    togglePlayPause,
    seekTo
  } = useAudio();

  const handleTrackClick = async (track: Track) => {
    if (activeTrack && activeTrack.id === track.id) {
      await togglePlayPause();
    } else {
      await playTrack(track);
    }
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const secs = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${secs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTo(Number(e.target.value));
  };

  const activeIndex = activeTrack ? tracks.findIndex(t => t.id === activeTrack.id) : -1;

  return (
    <div className="cz-root font-display relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Ambient blobs */}
      <div className="cz-blob cz-blob-1" />
      <div className="cz-blob cz-blob-2" />
      <div className="cz-blob cz-blob-3" />

      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="cz-header animate-cz-fadedown">
          <p className="cz-header-tag">{textConfig.chillZone.headerTag}</p>
          <h1 className="cz-header-title">{textConfig.chillZone.heading}</h1>
          <p className="cz-header-sub">{textConfig.chillZone.subheading}</p>
        </div>

        {/* Player Card */}
        <div className="cz-player-card animate-cz-rise">
          {/* Now playing section */}
          <div className="cz-now-playing">
            {activeTrack ? (
              <>
                <div className="cz-np-cover-wrap">
                  <img src={activeTrack.cover} alt={activeTrack.title} className={`cz-np-cover ${isPlaying ? 'cz-cover-spin' : ''}`} />
                  {isPlaying && (
                    <div className="cz-vinyl-ring" />
                  )}
                </div>
                <div className="cz-np-info">
                  <div className="cz-np-label">{textConfig.chillZone.nowPlayingLabel}</div>
                  <div className="cz-np-title">{activeTrack.title}</div>
                  <div className="cz-np-caption">{activeTrack.caption}</div>

                  {/* Progress */}
                  <div className="cz-progress-wrap">
                    <span className="cz-time">{formatTime(currentTime)}</span>
                    <div className="cz-progress-track">
                      <input
                        type="range" min={0} max={100}
                        value={Math.round(progress * 100)}
                        onChange={handleSeek}
                        className="cz-range"
                      />
                      <div className="cz-progress-fill" style={{ width: `${progress * 100}%` }} />
                    </div>
                    <span className="cz-time">{formatTime(duration)}</span>
                  </div>

                  {/* Controls */}
                  <div className="cz-controls">
                    <button onClick={togglePlayPause} className={`cz-play-btn ${isPlaying ? 'cz-play-active' : ''}`}>
                      {isPlaying ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" rx="2" /><rect x="14" y="4" width="4" height="16" rx="2" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                    {isPlaying && (
                      <div className="cz-bars">
                        <div className="cz-bar cz-bar-1" /><div className="cz-bar cz-bar-2" /><div className="cz-bar cz-bar-3" /><div className="cz-bar cz-bar-4" />
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="cz-idle-hint">
                <div className="cz-idle-icon">{textConfig.chillZone.idleIcon}</div>
                <div className="cz-idle-text">{textConfig.chillZone.chooseTrackHint}</div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="cz-divider" />

          {/* Track list */}
          <div className="cz-tracklist">
            {tracks.map((track, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={track.id}
                  className={`cz-track-row ${isActive ? 'cz-track-active' : ''}`}
                  onClick={() => handleTrackClick(track)}
                >
                  <div className="cz-track-num">
                    {isActive && isPlaying ? (
                      <div className="cz-mini-bars">
                        <div className="cz-mini-bar cz-mini-bar-1" />
                        <div className="cz-mini-bar cz-mini-bar-2" />
                        <div className="cz-mini-bar cz-mini-bar-3" />
                      </div>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="cz-track-thumb">
                    <img src={track.cover} alt={track.title} className="cz-thumb-img" />
                    {(!isActive || !isPlaying) && (
                      <div className="cz-thumb-play">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="cz-track-meta">
                    <div className="cz-track-title">{track.title}</div>
                    <div className="cz-track-caption">{track.caption}</div>
                  </div>
                  <div className="cz-track-action">
                    {isActive ? (
                      <div className={`cz-track-dot cz-dot-active`} />
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="cz-track-arrow">
                        <path d="M8 5v14l11-7z" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue button */}
        <div className="flex justify-center mt-8">
          <button onClick={onNext} className="cz-continue-btn">
            <span>{textConfig.chillZone.continueButton}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-2">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .cz-root { background: transparent; font-family: "Plus Jakarta Sans", system-ui, sans-serif; }
        .cz-blob { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
        .cz-blob-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(240,66,153,0.15) 0%, transparent 70%); top: -180px; left: -180px; animation: czBlob1 20s ease-in-out infinite; }
        .cz-blob-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%); bottom: -100px; right: -100px; animation: czBlob2 24s ease-in-out infinite; }
        .cz-blob-3 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); animation: czBlob3 16s ease-in-out infinite; }
        .cz-deco { position: absolute; font-size: 1.3rem; opacity: 0.3; pointer-events: none; z-index: 1; animation: czFloat 8s ease-in-out infinite; }
        .cz-deco-tl { top: 50px; left: 36px; animation-delay: 0s; }
        .cz-deco-tr { top: 70px; right: 44px; animation-delay: 2s; }
        .cz-deco-bl { bottom: 70px; left: 44px; animation-delay: 4s; }
        .cz-deco-br { bottom: 50px; right: 36px; animation-delay: 6s; }

        .cz-header { text-align: center; margin-bottom: 28px; position: relative; z-index: 10; }
        .cz-header-tag { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #f04299; background: #fff0f8; border: 1.5px solid #ffc0de; border-radius: 100px; padding: 4px 14px; margin-bottom: 10px; }
        .cz-header-title { font-size: clamp(1.6rem, 5vw, 2.4rem); font-weight: 900; color: #c026a0; line-height: 1.15; margin-bottom: 6px; }
        .cz-header-sub { font-size: 0.88rem; color: #9a4c73; font-weight: 500; }

        .cz-player-card { position: relative; z-index: 10; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 24px; border: 1.5px solid rgba(249,197,224,0.6); box-shadow: 0 20px 60px rgba(240,66,153,0.1), 0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9); overflow: hidden; }

        /* Now playing section */
        .cz-now-playing { padding: 28px 28px 20px; display: flex; gap: 20px; align-items: center; min-height: 140px; }
        .cz-np-cover-wrap { position: relative; flex-shrink: 0; }
        .cz-np-cover { width: 88px; height: 88px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(240,66,153,0.3); box-shadow: 0 4px 20px rgba(240,66,153,0.25); transition: all 0.5s ease; }
        .cz-cover-spin { animation: coverSpin 12s linear infinite; }
        .cz-vinyl-ring { position: absolute; inset: -4px; border-radius: 50%; border: 2px solid rgba(240,66,153,0.2); animation: ringPulse 2s ease-in-out infinite; pointer-events: none; }

        .cz-np-info { flex: 1; min-width: 0; }
        .cz-np-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #f04299; margin-bottom: 4px; }
        .cz-np-title { font-size: 1.05rem; font-weight: 800; color: #1a0a12; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cz-np-caption { font-size: 0.78rem; color: #9a4c73; margin-bottom: 12px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; white-space: normal; }

        .cz-progress-wrap { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .cz-time { font-size: 0.7rem; color: #9a4c73; font-variant-numeric: tabular-nums; flex-shrink: 0; }
        .cz-progress-track { flex: 1; position: relative; height: 4px; background: rgba(249,197,224,0.4); border-radius: 2px; cursor: pointer; }
        .cz-range { position: absolute; inset: -6px 0; width: 100%; opacity: 0; cursor: pointer; z-index: 2; }
        .cz-progress-fill { position: absolute; left: 0; top: 0; height: 100%; background: linear-gradient(90deg, #f04299, #a855f7); border-radius: 2px; pointer-events: none; transition: width 0.1s linear; }

        .cz-controls { display: flex; align-items: center; gap: 12px; }
        .cz-play-btn { width: 40px; height: 40px; border-radius: 50%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f04299, #a855f7); color: white; box-shadow: 0 4px 14px rgba(240,66,153,0.4); transition: all 0.2s; flex-shrink: 0; }
        .cz-play-btn:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(240,66,153,0.5); }
        .cz-play-btn:active { transform: scale(0.95); }
        .cz-play-active { background: linear-gradient(135deg, #c026a0, #7c3aed); }

        .cz-bars { display: flex; align-items: flex-end; gap: 3px; height: 20px; }
        .cz-bar { width: 3px; background: linear-gradient(180deg, #f04299, #a855f7); border-radius: 2px; }
        .cz-bar-1 { animation: barAnim 0.9s ease-in-out infinite; }
        .cz-bar-2 { animation: barAnim 0.9s ease-in-out infinite 0.15s; }
        .cz-bar-3 { animation: barAnim 0.9s ease-in-out infinite 0.3s; }
        .cz-bar-4 { animation: barAnim 0.9s ease-in-out infinite 0.45s; }

        .cz-idle-hint { width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 12px 0; }
        .cz-idle-icon { font-size: 2.4rem; animation: czFloat 4s ease-in-out infinite; }
        .cz-idle-text { font-size: 0.9rem; color: #9a4c73; font-weight: 600; }

        /* Divider */
        .cz-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(249,197,224,0.6) 30%, rgba(249,197,224,0.6) 70%, transparent); margin: 0 20px; }

        /* Track list */
        .cz-tracklist { padding: 12px 16px 20px; display: flex; flex-direction: column; gap: 4px; }
        .cz-track-row { display: flex; align-items: center; gap: 14px; padding: 10px 12px; border-radius: 14px; cursor: pointer; transition: all 0.2s ease; position: relative; }
        .cz-track-row:hover { background: rgba(240,66,153,0.06); }
        .cz-track-active { background: linear-gradient(135deg, rgba(240,66,153,0.08), rgba(168,85,247,0.06)) !important; border: 1px solid rgba(240,66,153,0.15); }
        .cz-track-active .cz-track-title { color: #f04299; }

        .cz-track-num { width: 20px; text-align: center; font-size: 0.78rem; color: #c0a0b0; font-weight: 600; flex-shrink: 0; }
        .cz-mini-bars { display: flex; align-items: flex-end; gap: 2px; height: 14px; }
        .cz-mini-bar { width: 2.5px; background: #f04299; border-radius: 1px; }
        .cz-mini-bar-1 { animation: barAnim 0.8s ease-in-out infinite; }
        .cz-mini-bar-2 { animation: barAnim 0.8s ease-in-out infinite 0.12s; }
        .cz-mini-bar-3 { animation: barAnim 0.8s ease-in-out infinite 0.24s; }

        .cz-track-thumb { position: relative; flex-shrink: 0; }
        .cz-thumb-img { width: 46px; height: 46px; border-radius: 10px; object-fit: cover; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .cz-thumb-play { position: absolute; inset: 0; background: rgba(240,66,153,0.5); border-radius: 10px; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }
        .cz-track-row:hover .cz-thumb-play { opacity: 1; }

        .cz-track-meta { flex: 1; min-width: 0; }
        .cz-track-title { font-size: 0.88rem; font-weight: 700; color: #1a0a12; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px; }
        .cz-track-caption { font-size: 0.72rem; color: #9a4c73; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; white-space: normal; line-height: 1.35; }

        .cz-track-action { flex-shrink: 0; }
        .cz-track-dot { width: 8px; height: 8px; border-radius: 50%; }
        .cz-dot-active { background: #f04299; box-shadow: 0 0 6px rgba(240,66,153,0.6); animation: dotPulse 1.5s ease-in-out infinite; }
        .cz-track-arrow { color: #c0a0b0; opacity: 0; transition: opacity 0.2s; }
        .cz-track-row:hover .cz-track-arrow { opacity: 1; color: #f04299; }

        /* Continue button */
        .cz-continue-btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 28px; border-radius: 8px; background: #f04299; color: #fff; font-size: 0.9rem; font-weight: 600; border: none; cursor: pointer; outline: none; transition: opacity 0.15s, transform 0.15s; }
        .cz-continue-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .cz-continue-btn:active { transform: scale(0.97); }

        @keyframes czBlob1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,30px); } }
        @keyframes czBlob2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,-20px); } }
        @keyframes czBlob3 { 0%,100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.1); } }
        @keyframes czFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes coverSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ringPulse { 0%,100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.08); opacity: 1; } }
        @keyframes barAnim { 0%,100% { height: 4px; } 50% { height: 16px; } }
        @keyframes dotPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.7; } }

        @keyframes czFadedown { from { opacity: 0; transform: translateY(-18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes czRise { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .animate-cz-fadedown { animation: czFadedown 0.7s ease both; }
        .animate-cz-rise { animation: czRise 0.8s cubic-bezier(.34,1.3,.64,1) both; animation-delay: 0.1s; }
      `}</style>
    </div>
  );
}
