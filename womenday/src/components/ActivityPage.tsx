/*
  Personal Use License Notice:
  You may use this item multiple times for personal use only.
  You may not resell, redistribute, or use it for any commercial purpose.
  Unauthorized use may result in legal action.
*/
import React, { useState } from "react";
import textConfig from "../textConfig";
import StampSVG from "./StampSVG";
import IntroGif from "../imgs/intro.gif";
import LetterPng from "../imgs/letter.png";

interface ActivityPageProps {
  herName?: string;
  onNext?: () => void;
}

export default function ActivityPage({
  herName = "Beautiful",
  onNext
}: ActivityPageProps) {
  const [envelopeState, setEnvelopeState] = useState<"idle" | "hover" | "opening" | "open">("idle");
  const [showLetter, setShowLetter] = useState(false);
  const [typedSignature, setTypedSignature] = useState("");
  const [showContinue, setShowContinue] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; scale: number }[]>([]);

  const letterMessage = textConfig.letter.letterMessage;
  const lines = letterMessage.split('\n').filter((line: string) => line.trim() !== '');
  const greeting = lines[0];
  const bodyContent = lines.slice(1).join('\n\n').trim();
  const signature = textConfig.letter.signature || "Forever yours 💕";

  const handleEnvelopeClick = () => {
    if (envelopeState !== "idle" && envelopeState !== "hover") return;
    setEnvelopeState("opening");
    setTimeout(() => {
      setEnvelopeState("open");
      setTimeout(() => {
        setShowLetter(true);
        setTimeout(() => startTypingSignature(), 600);
      }, 500);
    }, 900);
  };

  const addSparkle = (e: React.MouseEvent) => {
    if (envelopeState === "open" || envelopeState === "opening") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const sp = { id: Date.now() + Math.random(), x: e.clientX - rect.left, y: e.clientY - rect.top, scale: 0.8 + Math.random() * 0.6 };
    setSparkles(prev => [...prev, sp]);
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== sp.id)), 900);
  };

  const startTypingSignature = () => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedSignature(signature.slice(0, i));
      i++;
      if (i > signature.length) { clearInterval(interval); setTimeout(() => setShowContinue(true), 400); }
    }, 50);
  };

  return (
    <div className="al-root font-display relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Ambient blobs */}
      <div className="al-blob al-blob-1" />
      <div className="al-blob al-blob-2" />

      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Page header */}
        <div className="al-header animate-al-fadedown mb-6 text-center">
          <p className="al-header-tag">{textConfig.letter.headerTag}</p>
          <h1 className="al-header-title">{textConfig.letter.pageHeading}</h1>
          <p className="al-header-sub">{textConfig.letter.pageSubtitle}</p>
        </div>

        {!showLetter ? (
          /* ── ENVELOPE ── */
          <div
            className={`al-envelope-wrap ${envelopeState === "opening" ? "al-env-opening" : ""} ${envelopeState === "open" ? "al-env-opened" : ""}`}
            onClick={handleEnvelopeClick}
            onMouseEnter={() => envelopeState === "idle" && setEnvelopeState("hover")}
            onMouseLeave={() => envelopeState === "hover" && setEnvelopeState("idle")}
            onMouseMove={addSparkle}
          >
            {sparkles.map(sp => (
              <div key={sp.id} className="al-sparkle" style={{ left: sp.x, top: sp.y, transform: `translate(-50%,-50%) scale(${sp.scale})` }}>✦</div>
            ))}

            {/* Intro gif above envelope */}
            <div className="al-intro-img" aria-hidden="true">
              <img src={IntroGif} alt="" className="al-intro-gif" />
            </div>

            <div className="al-envelope">
              <div className="al-env-back-flap" />
              <div className="al-env-body">
                <div className="al-env-fold-left" />
                <div className="al-env-fold-right" />
                {(envelopeState === "opening" || envelopeState === "open") && (
                  <div className="al-letter-peek">
                    <div className="al-letter-peek-lines">
                      <div className="al-peek-line" /><div className="al-peek-line al-peek-line-short" /><div className="al-peek-line" />
                    </div>
                  </div>
                )}
              </div>
              {/* Wax seal — above env-body overflow, z-index above flap */}
              {envelopeState !== "opening" && envelopeState !== "open" && (
                <div className="al-wax-seal"><div className="al-wax-inner">{textConfig.letter.waxSealEmoji}</div></div>
              )}
              <div className={`al-env-flap ${envelopeState === "opening" || envelopeState === "open" ? "al-flap-open" : ""}`} />
            </div>

            {(envelopeState === "idle" || envelopeState === "hover") && (
              <div className="al-click-hint">
                <span className="al-hint-dot" />
                <span className="al-hint-text">{textConfig.letter.envelopeClickHint}</span>
              </div>
            )}
            {envelopeState === "opening" && <div className="al-opening-text">{textConfig.letter.openingText}</div>}
            <div className="al-special-badge"><span>{textConfig.letter.specialDeliveryText}</span></div>
          </div>
        ) : (
          /* ── LETTER ── */
          <div className="al-letter-container animate-al-rise w-full">
            {/* letter.png floating decoration at top */}
            <div className="al-letter-deco-wrap" aria-hidden="true">
              <img src={LetterPng} alt="" className="al-letter-deco-img" />
            </div>
            <div className="al-letter-card">
              <div className="al-letter-topbar">
                <div className="al-letter-dots">
                  <span className="al-dot al-dot-red" /><span className="al-dot al-dot-yellow" /><span className="al-dot al-dot-green" />
                </div>
                <span className="al-letter-toplabel">{textConfig.letter.letterHeaderTitle}</span>
                <div className="al-letter-stamp-mini"><StampSVG className="w-10 h-7" color="#f04299" /></div>
              </div>
              <div className="al-paper-lines" aria-hidden />
              <div className="al-letter-body">
                <div className="al-greeting">{greeting}</div>
                <div className="al-body-text">{bodyContent}</div>
                <div className="al-signature-wrap">
                  <div className="al-sig-line" />
                  <div className="al-signature">
                    {typedSignature}
                    {typedSignature.length < signature.length && <span className="al-cursor" />}
                  </div>
                </div>
              </div>
              <div className="al-postmark" aria-hidden>
                <div className="al-postmark-circle"><span>{textConfig.letter.postmarkEmoji}</span></div>
                <div className="al-postmark-lines"><div className="al-pm-line" /><div className="al-pm-line" /><div className="al-pm-line" /></div>
              </div>
            </div>

            {showContinue && (
              <div className="flex justify-center mt-8 animate-al-popleft">
                <button onClick={onNext} className="al-continue-btn">
                  <span>{textConfig.letter.continueButton}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-2">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Styles */}
      <style>{`
        .al-root {
          background: transparent;
          font-family: "Plus Jakarta Sans", system-ui, sans-serif;
        }
        .al-blob { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
        .al-blob-1 { width: 420px; height: 420px; background: radial-gradient(circle, #ffd6e8 0%, transparent 70%); top: -120px; left: -120px; opacity: 0.5; animation: blobDrift1 18s ease-in-out infinite; }
        .al-blob-2 { width: 380px; height: 380px; background: radial-gradient(circle, #e8d5ff 0%, transparent 70%); bottom: -100px; right: -100px; opacity: 0.4; animation: blobDrift2 22s ease-in-out infinite; }

        .al-header { position: relative; z-index: 10; }
        .al-header-tag { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #f04299; background: #fff0f8; border: 1.5px solid #ffc0de; border-radius: 100px; padding: 4px 14px; margin-bottom: 10px; }
        .al-header-title { font-size: clamp(1.7rem, 5vw, 2.6rem); font-weight: 900; color: #c026a0; line-height: 1.15; margin-bottom: 8px; }
        .al-header-sub { font-size: 0.9rem; color: #9a4c73; font-weight: 500; }

        .al-envelope-wrap { position: relative; z-index: 10; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 20px; transition: transform 0.4s cubic-bezier(.34,1.56,.64,1); }
        .al-envelope-wrap:hover { transform: translateY(-6px) scale(1.01); }
        .al-env-opening { animation: envShake 0.4s ease 0.1s; }
        .al-env-opened { transform: translateY(-16px) scale(1.04); }

        /* Intro gif — absolute top-right of envelope-wrap, like letter.png deco */
        .al-intro-img { position: absolute; top: -38px; right: -18px; z-index: 20; pointer-events: none; width: 88px; height: 88px; }
        .al-intro-gif { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 4px 14px rgba(240,66,153,0.25)); transform: rotate(8deg); }

        .al-envelope { position: relative; width: min(340px, 90vw); height: min(220px, 56vw); filter: drop-shadow(0 18px 48px rgba(240,66,153,0.2)) drop-shadow(0 4px 14px rgba(0,0,0,0.09)); }
        .al-env-body { position: absolute; inset: 0; background: linear-gradient(160deg, #ffeaf5 0%, #fff5fb 50%, #fde9ff 100%); border-radius: 12px; border: 2px solid #f5b8d8; }
        .al-env-back-flap { position: absolute; bottom: 0; left: 0; right: 0; height: 60%; background: linear-gradient(180deg, rgba(255,210,235,0.3) 0%, rgba(255,228,244,0.55) 100%); clip-path: polygon(0 100%, 50% 0%, 100% 100%); border-top: 1.5px solid #f5b8d8; }
        .al-env-fold-left { position: absolute; top: 42%; left: 0; width: 52%; height: 1.5px; background: linear-gradient(90deg, #f5b8d8 0%, transparent 100%); transform: rotate(-34deg) translateX(-28%); opacity: 0.7; }
        .al-env-fold-right { position: absolute; top: 42%; right: 0; width: 52%; height: 1.5px; background: linear-gradient(270deg, #f5b8d8 0%, transparent 100%); transform: rotate(34deg) translateX(28%); opacity: 0.7; }

        /* Wax seal — sibling of flap, z-index above flap:5 */
        .al-wax-seal { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 54px; height: 54px; border-radius: 50%; background: radial-gradient(circle at 38% 32%, #fa8fb5, #f04299 55%, #be1673); box-shadow: 0 3px 12px rgba(240,66,153,0.55), inset 0 1px 3px rgba(255,255,255,0.32); display: flex; align-items: center; justify-content: center; animation: sealPulse 2.5s ease-in-out infinite; z-index: 10; }
        .al-wax-inner { font-size: 1.4rem; line-height: 1; }

        .al-letter-peek { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 85%; background: #fff; border: 1.5px solid #fce4f2; border-radius: 4px; padding: 14px 16px; box-shadow: 0 -4px 12px rgba(240,66,153,0.1); animation: peekUp 0.6s cubic-bezier(.34,1.56,.64,1) forwards; z-index: 3; }
        .al-letter-peek-lines { display: flex; flex-direction: column; gap: 6px; }
        .al-peek-line { height: 6px; background: linear-gradient(90deg, #f9d5e8, #fce4f2); border-radius: 3px; opacity: 0.7; }
        .al-peek-line-short { width: 65%; }

        .al-env-flap { position: absolute; top: 0; left: 0; right: 0; height: 50%; background: linear-gradient(160deg, #ffd6ec 0%, #ffc8e6 50%, #ffb3dc 100%); clip-path: polygon(0 0, 100% 0, 50% 100%); border-radius: 10px 10px 0 0; border: 2px solid #f9c5e0; border-bottom: none; transform-origin: top center; transition: transform 1.0s cubic-bezier(0.16, 1, 0.3, 1); z-index: 5; will-change: transform; backface-visibility: hidden; }
        .al-flap-open { transform: perspective(900px) rotateX(-175deg); background: linear-gradient(160deg, #fce8f4 0%, #ffd6ec 100%); }

        .al-click-hint { display: flex; align-items: center; gap: 8px; padding: 8px 18px; background: rgba(255,255,255,0.85); border: 1.5px solid #fce4f2; border-radius: 100px; backdrop-filter: blur(8px); animation: pulseHint 2s ease-in-out infinite; }
        .al-hint-dot { width: 7px; height: 7px; border-radius: 50%; background: #f04299; display: inline-block; animation: dotPulse 1.4s ease-in-out infinite; }
        .al-hint-text { font-size: 0.8rem; font-weight: 600; color: #9a4c73; }
        .al-opening-text { font-size: 0.85rem; font-weight: 600; color: #f04299; animation: fadeInOut 0.9s ease-in-out; }
        .al-special-badge { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #c0256e; opacity: 0.7; }
        .al-sparkle { position: absolute; pointer-events: none; font-size: 1rem; animation: sparklePop 0.9s ease forwards; z-index: 20; }

        /* letter.png deco floats top-right of letter card */
        .al-letter-deco-wrap { position: absolute; top: -32px; right: -10px; z-index: 20; pointer-events: none; }
        .al-letter-deco-img { width: 72px; height: auto; object-fit: contain; transform: rotate(12deg); filter: drop-shadow(0 3px 8px rgba(240,66,153,0.18)); opacity: 0.88; }

        .al-letter-container { position: relative; z-index: 10; }
        .al-letter-card { position: relative; background: #fff; border-radius: 18px; overflow: hidden; border: 1.5px solid #fce4f2; box-shadow: 0 20px 60px rgba(240,66,153,0.12), 0 4px 20px rgba(0,0,0,0.06); }
        .al-paper-lines { position: absolute; inset: 0; pointer-events: none; z-index: 0; background-image: repeating-linear-gradient(transparent, transparent 31px, rgba(249,197,224,0.25) 31px, rgba(249,197,224,0.25) 32px); background-position: 0 60px; }
        .al-letter-topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1.5px solid #fce4f2; background: linear-gradient(90deg, #fff8fc, #fff4f8); position: relative; z-index: 2; }
        .al-letter-dots { display: flex; gap: 6px; }
        .al-dot { width: 10px; height: 10px; border-radius: 50%; }
        .al-dot-red { background: #ff7eb3; }
        .al-dot-yellow { background: #ffd966; }
        .al-dot-green { background: #9be7c4; }
        .al-letter-toplabel { font-size: 0.8rem; font-weight: 700; color: #9a4c73; letter-spacing: 0.02em; }
        .al-letter-stamp-mini { opacity: 0.5; transform: rotate(-8deg); }

        .al-letter-body { position: relative; z-index: 2; padding: 28px 32px 36px; }
        .al-corner-deco { position: absolute; font-size: 1.1rem; opacity: 0.25; pointer-events: none; }
        .al-corner-tl { top: 10px; left: 14px; }
        .al-corner-br { bottom: 10px; right: 14px; }
        .al-greeting { font-family: 'Kalam', cursive; font-size: 1.05rem; font-weight: 700; color: #f04299; margin-bottom: 16px; line-height: 1.4; }
        .al-body-text { font-family: 'Kalam', cursive; font-size: 0.95rem; line-height: 1.9; color: #3d1a2d; white-space: pre-line; margin-bottom: 24px; text-indent: 1.5rem; }
        .al-signature-wrap { margin-top: 8px; }
        .al-sig-line { height: 1.5px; background: linear-gradient(90deg, transparent, #fce4f2 30%, #fce4f2 70%, transparent); margin-bottom: 12px; }
        .al-signature { font-family: 'Kalam', cursive; font-size: 1.1rem; font-weight: 700; color: #c0256e; text-align: right; padding-right: 8px; }
        .al-cursor { display: inline-block; width: 2px; height: 1.1em; background: #f04299; margin-left: 2px; vertical-align: middle; animation: cursorBlink 1s infinite; }

        .al-postmark { position: absolute; bottom: 18px; left: 20px; display: flex; align-items: center; gap: 6px; opacity: 0.22; transform: rotate(-12deg); pointer-events: none; }
        .al-postmark-circle { width: 40px; height: 40px; border-radius: 50%; border: 2px solid #f04299; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
        .al-postmark-lines { display: flex; flex-direction: column; gap: 4px; }
        .al-pm-line { height: 3px; width: 36px; background: #f04299; border-radius: 2px; }

        .al-continue-btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 28px; border-radius: 8px; background: #f04299; color: #fff; font-size: 0.9rem; font-weight: 600; border: none; cursor: pointer; outline: none; transition: opacity 0.15s, transform 0.15s; letter-spacing: 0.01em; }
        .al-continue-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .al-continue-btn:active { transform: scale(0.97); }

        @keyframes blobDrift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,20px) scale(1.05); } }
        @keyframes blobDrift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,-15px) scale(1.08); } }
        @keyframes floatDeco { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(6deg); } }
        @keyframes sealPulse { 0%,100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.07); } }
        @keyframes peekUp { from { transform: translateX(-50%) translateY(50%); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
        @keyframes envShake { 0%,100% { transform: translateX(0) rotate(0deg); } 20% { transform: translateX(-5px) rotate(-1.5deg); } 40% { transform: translateX(5px) rotate(1.5deg); } 60% { transform: translateX(-3px) rotate(-1deg); } 80% { transform: translateX(3px) rotate(1deg); } }
        @keyframes pulseHint { 0%,100% { box-shadow: 0 0 0 0 rgba(240,66,153,0); } 50% { box-shadow: 0 0 0 6px rgba(240,66,153,0.12); } }
        @keyframes dotPulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
        @keyframes fadeInOut { 0% { opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes sparklePop { 0% { opacity: 0; transform: translate(-50%,-50%) scale(0) rotate(0deg); } 40% { opacity: 1; transform: translate(-50%,-70%) scale(1.2) rotate(20deg); } 100% { opacity: 0; transform: translate(-50%,-120%) scale(0.7) rotate(40deg); } }
        @keyframes cursorBlink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        @keyframes alFadedown { from { opacity: 0; transform: translateY(-18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes alRise { from { opacity: 0; transform: translateY(28px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes alPopleft { from { opacity: 0; transform: translateX(-16px) scale(0.95); } to { opacity: 1; transform: translateX(0) scale(1); } }

        .animate-al-fadedown { animation: alFadedown 0.7s ease both; }
        .animate-al-rise { animation: alRise 0.8s cubic-bezier(.34,1.3,.64,1) both; }
        .animate-al-popleft { animation: alPopleft 0.6s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>
    </div>
  );
}
