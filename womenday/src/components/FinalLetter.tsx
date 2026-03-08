/*
  Personal Use License Notice:
  You may use this item multiple times for personal use only.
  You may not resell, redistribute, or use it for any commercial purpose.
  Unauthorized use may result in legal action.
*/
// src/components/FinalLetter.tsx
import React, { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import textConfig from "../textConfig";

interface FinalLetterProps {
  onRestart: () => void;
}

export default function FinalLetter({ onRestart }: FinalLetterProps) {
  const [showLetter, setShowLetter] = useState(false);
  const [showSealing, setShowSealing] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const typingTextRef = useRef(textConfig.finalLetter.typedDefault);
  const [typedText, setTypedText] = useState("");
  const typingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setShowLetter(true), 420);
    return () => window.clearTimeout(t);
  }, []);

  // typing for signature
  useEffect(() => {
    if (!isSealed) {
      setTypedText("");
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      return;
    }
    const str = typingTextRef.current;
    let i = 0;
    typingTimerRef.current = window.setInterval(() => {
      i += 1;
      setTypedText(str.slice(0, i));
      if (i >= str.length && typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    }, 45);
    return () => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [isSealed]);

  const sealLetter = () => {
    setShowSealing(true);
    setTimeout(() => {
      setIsSealed(true);
      setShowSealing(false);
    }, 1400);
  };

  return (
    <div className="fl-root font-display relative min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden">

      {/* Sealing overlay */}
      {showSealing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fff0f4]/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="fl-seal-spin text-7xl">{textConfig.finalLetter.sealingEmoji}</div>
            <p className="text-sm font-semibold text-[#c0256e]">{textConfig.finalLetter.sealingText}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="text-center animate-fl-fadedown">
          <p className="fl-header-tag">{textConfig.finalLetter.headerTag}</p>
          <h2 className="fl-header-title">{textConfig.finalLetter.pageTitle}</h2>
          <p className="fl-header-sub">{textConfig.finalLetter.pageSubtitle}</p>
        </div>

        {/* Letter card */}
        {showLetter && (
          <div className="animate-fl-rise">
            {!isSealed ? (
              /* Open letter */
              <div className="fl-letter-card">
                <div className="fl-paper-lines" />
                {/* Top bar */}
                <div className="fl-letter-topbar">
                  <div className="fl-letter-dots">
                    <span className="fl-dot fl-dot-red" />
                    <span className="fl-dot fl-dot-yellow" />
                    <span className="fl-dot fl-dot-green" />
                  </div>
                  <span className="fl-letter-toplabel">{textConfig.finalLetter.title}</span>
                  <div className="fl-letter-stamp-mini">✉</div>
                </div>

                <div className="fl-letter-body">
                  <div className="fl-corner-deco fl-corner-tl">{textConfig.finalLetter.decorativeEmojis.topRight}</div>
                  <div className="fl-corner-deco fl-corner-br">{textConfig.finalLetter.decorativeEmojis.bottomLeft}</div>

                  <p className="fl-greeting">{textConfig.finalLetter.letterGreeting}</p>

                  <div className="fl-paragraphs">
                    {textConfig.finalLetter.letterParagraphs.map((paragraph: string, index: number) => (
                      <p key={index} className="fl-para">{paragraph}</p>
                    ))}
                  </div>

                  <div className="fl-actions">
                    <span className="fl-sealing-note">{textConfig.finalLetter.sealingNote}</span>
                    <div className="flex gap-3 flex-wrap">
                      <button onClick={sealLetter} className="fl-btn-seal">
                        {textConfig.finalLetter.sealButton}
                      </button>
                      <button onClick={onRestart} className="fl-btn-restart">
                        {textConfig.finalLetter.restartButton}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Sealed state */
              <div className="fl-sealed-card animate-fl-rise">
                <div className="fl-sealed-shimmer" />

                {/* Wax seal */}
                <div className="fl-wax-seal">
                  <span className="fl-wax-inner">💌</span>
                  <div className="fl-wax-ring" />
                </div>

                <h2 className="fl-sealed-title">{textConfig.finalLetter.sealedTitle}</h2>
                <p className="fl-sealed-sub">{textConfig.finalLetter.sealedSubtitle}</p>

                {/* Hearts row */}
                <div className="fl-hearts-row">
                  {Array.from({ length: textConfig.finalLetter.heartCount || 7 }).map((_, i) => (
                    <Heart
                      key={i}
                      size={16}
                      className="fl-heart-icon"
                      fill="#ffb6c1"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>

                {/* Typed signature */}
                <div className="fl-signature-wrap">
                  <div className="fl-sig-line" />
                  <p className="fl-signature">
                    {typedText || textConfig.finalLetter.typedDefault}
                    {typedText.length < typingTextRef.current.length && (
                      <span className="fl-cursor" />
                    )}
                  </p>
                </div>

                <p className="fl-date">
                  {new Date().toLocaleDateString(textConfig.finalLetter.dateLocale, {
                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                  })}
                </p>

                <button onClick={onRestart} className="fl-btn-restart-sealed">
                  {textConfig.finalLetter.experienceAgain}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .fl-root { font-family: "Plus Jakarta Sans", system-ui, sans-serif; }

        .fl-header-tag { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #f04299; background: #fff0f8; border: 1.5px solid #ffc0de; border-radius: 100px; padding: 4px 14px; margin-bottom: 10px; }
        .fl-header-title { font-size: clamp(1.6rem, 5vw, 2.4rem); font-weight: 900; color: #c026a0; line-height: 1.15; margin-bottom: 6px; }
        .fl-header-sub { font-size: 0.88rem; color: #9a4c73; font-weight: 500; }

        .fl-letter-card { position: relative; background: #fff; border-radius: 18px; overflow: hidden; border: 1.5px solid #fce4f2; box-shadow: 0 20px 60px rgba(240,66,153,0.12), 0 4px 20px rgba(0,0,0,0.06); }
        .fl-paper-lines { position: absolute; inset: 0; pointer-events: none; z-index: 0; background-image: repeating-linear-gradient(transparent, transparent 31px, rgba(249,197,224,0.25) 31px, rgba(249,197,224,0.25) 32px); background-position: 0 60px; }
        .fl-letter-topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1.5px solid #fce4f2; background: linear-gradient(90deg, #fff8fc, #fff4f8); position: relative; z-index: 2; }
        .fl-letter-dots { display: flex; gap: 6px; }
        .fl-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .fl-dot-red { background: #ff7eb3; }
        .fl-dot-yellow { background: #ffd966; }
        .fl-dot-green { background: #9be7c4; }
        .fl-letter-toplabel { font-size: 0.8rem; font-weight: 700; color: #9a4c73; }
        .fl-letter-stamp-mini { font-size: 1rem; opacity: 0.35; transform: rotate(-8deg); display: inline-block; }

        .fl-letter-body { position: relative; z-index: 2; padding: 28px 32px 36px; }
        .fl-corner-deco { position: absolute; font-size: 1rem; opacity: 0.2; pointer-events: none; }
        .fl-corner-tl { top: 10px; left: 14px; }
        .fl-corner-br { bottom: 10px; right: 14px; }
        .fl-greeting { font-family: 'Kalam', cursive; font-size: 1.05rem; font-weight: 700; color: #f04299; margin-bottom: 18px; }
        .fl-paragraphs { display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
        .fl-para { font-family: 'Kalam', cursive; font-size: 0.92rem; line-height: 1.85; color: #3d1a2d; }
        .fl-actions { display: flex; flex-direction: column; align-items: flex-start; border-top: 1.5px solid #fce4f2; padding-top: 20px; gap: 14px; }
        .fl-sealing-note { font-size: 0.75rem; color: #9a4c73; }
        .fl-btn-seal { padding: 10px 24px; border-radius: 8px; background: #f04299; color: #fff; font-size: 0.88rem; font-weight: 600; border: none; cursor: pointer; transition: opacity 0.15s, transform 0.15s; }
        .fl-btn-seal:hover { opacity: 0.88; transform: translateY(-1px); }
        .fl-btn-restart { padding: 10px 20px; border-radius: 100px; background: #f9f0ff; color: #9333ea; font-size: 0.85rem; font-weight: 600; border: 1.5px solid #e0c8ff; cursor: pointer; transition: background 0.2s, transform 0.2s; }
        .fl-btn-restart:hover { background: #ede0ff; transform: scale(1.02); }

        .fl-sealed-card { position: relative; background: #fff; border-radius: 22px; overflow: hidden; border: 2px solid #fce4f2; box-shadow: 0 24px 64px rgba(240,66,153,0.14), 0 4px 20px rgba(0,0,0,0.06); padding: 48px 40px 44px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .fl-sealed-shimmer { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,230,245,0.6) 0%, rgba(240,214,255,0.4) 100%); pointer-events: none; z-index: 0; }
        .fl-wax-seal { position: relative; z-index: 2; width: 80px; height: 80px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #f9758c, #f04299 60%, #c0256e); box-shadow: 0 4px 16px rgba(240,66,153,0.45), inset 0 1px 4px rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; animation: flSealPop 0.6s cubic-bezier(.34,1.56,.64,1) both; }
        .fl-wax-inner { font-size: 2rem; line-height: 1; }
        .fl-wax-ring { position: absolute; inset: -6px; border-radius: 50%; border: 2px dashed rgba(240,66,153,0.3); animation: flRingRotate 14s linear infinite; }
        .fl-sealed-title { position: relative; z-index: 2; font-size: clamp(1.4rem, 4vw, 2rem); font-weight: 900; color: #c026a0; }
        .fl-sealed-sub { position: relative; z-index: 2; font-size: 0.88rem; color: #9a4c73; max-width: 300px; line-height: 1.6; }
        .fl-hearts-row { position: relative; z-index: 2; display: flex; gap: 8px; justify-content: center; }
        .fl-heart-icon { animation: flHeartPulse 1.2s ease-in-out infinite; }
        .fl-signature-wrap { position: relative; z-index: 2; width: 100%; max-width: 280px; }
        .fl-sig-line { height: 1.5px; background: linear-gradient(90deg, transparent, #fce4f2 30%, #fce4f2 70%, transparent); margin-bottom: 10px; }
        .fl-signature { font-family: 'Kalam', cursive; font-size: 1.15rem; font-weight: 700; color: #c0256e; }
        .fl-cursor { display: inline-block; width: 2px; height: 1.1em; background: #f04299; margin-left: 2px; vertical-align: middle; animation: flCursorBlink 1s infinite; }
        .fl-date { position: relative; z-index: 2; font-size: 0.75rem; color: #9a4c73; letter-spacing: 0.02em; }
        .fl-btn-restart-sealed { position: relative; z-index: 2; display: inline-flex; align-items: center; justify-content: center; padding: 10px 28px; border-radius: 8px; background: #f04299; color: #fff; font-size: 0.9rem; font-weight: 600; border: none; cursor: pointer; transition: opacity 0.15s, transform 0.15s; margin-top: 4px; }
        .fl-btn-restart-sealed:hover { opacity: 0.88; transform: translateY(-1px); }

        .fl-seal-spin { display: inline-block; animation: flSealSpin 1.4s ease-in-out; }
        @keyframes flSealSpin { 0% { transform: rotate(0deg) scale(0.8); opacity: 0; } 50% { transform: rotate(180deg) scale(1.1); opacity: 1; } 100% { transform: rotate(360deg) scale(1); opacity: 1; } }
        @keyframes flSealPop { from { opacity: 0; transform: scale(0.5) rotate(-20deg); } to { opacity: 1; transform: scale(1) rotate(0deg); } }
        @keyframes flRingRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes flHeartPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.25); } }
        @keyframes flCursorBlink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        @keyframes flFadedown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes flRise { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-fl-fadedown { animation: flFadedown 0.6s ease both; }
        .animate-fl-rise { animation: flRise 0.7s cubic-bezier(.34,1.3,.64,1) both; }
      `}</style>
    </div>
  );
}
