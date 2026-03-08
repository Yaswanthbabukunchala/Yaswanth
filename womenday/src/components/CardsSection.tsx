/*
  Personal Use License Notice:
  You may use this item multiple times for personal use only.
  You may not resell, redistribute, or use it for any commercial purpose.
  Unauthorized use may result in legal action.
*/
import React, { useState, useEffect } from 'react';
import textConfig from '../textConfig';

import Img1 from "../imgs/pic1.gif"
import Img2 from "../imgs/pic2.gif"
import Img3 from "../imgs/pic3.gif"

interface Card {
  id: number;
  message: string;
  localGif: string;
  accent: string;
}

interface CardsSectionProps {
  onNext: () => void;
}

const CardsSection: React.FC<CardsSectionProps> = ({ onNext }) => {
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const cards: Card[] = [
    {
      id: 1,
      message: textConfig.cards.cardMessages[0],
      localGif: Img1,
      accent: "#f04299"
    },
    {
      id: 2,
      message: textConfig.cards.cardMessages[1],
      localGif: Img2,
      accent: "#a855f7"
    },
    {
      id: 3,
      message: textConfig.cards.cardMessages[2],
      localGif: Img3,
      accent: "#ec4899"
    },
  ];

  const revealCard = (cardId: number) => {
    if (!revealedCards.includes(cardId)) {
      setRevealedCards(prev => [...prev, cardId]);
    }
  };

  const allRevealed = revealedCards.length === cards.length;

  // Show popup when all cards are revealed
  useEffect(() => {
    if (allRevealed && revealedCards.length > 0) {
      setTimeout(() => setShowPopup(true), 600);
    }
  }, [allRevealed, revealedCards.length]);

  const closePopup = () => setShowPopup(false);

  return (
    <div className="cs-root font-display relative min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden">

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="text-center animate-cs-fadedown">
          <p className="cs-header-tag">{textConfig.cards.headerTag}</p>
          <h2 className="cs-header-title">{textConfig.cards.heading}</h2>
          <p className="cs-header-sub">{textConfig.cards.subheading}</p>
        </div>

        {/* Horizontal Cards */}
        <div className="flex flex-col gap-4">
          {cards.map((card, index) => {
            const isRevealed = revealedCards.includes(card.id);
            return (
              <div
                key={card.id}
                className={`cs-card ${isRevealed ? "cs-card-revealed" : "cs-card-hidden"} animate-cs-rise`}
                style={{ animationDelay: `${index * 0.12}s`, '--accent': card.accent } as React.CSSProperties}
                onClick={() => revealCard(card.id)}
              >
                {/* Image side */}
                <div className="cs-card-image-wrap">
                  <img
                    src={card.localGif}
                    alt="Memory"
                    className="cs-card-img"
                    loading="lazy"
                  />
                  {/* Number badge */}
                  <div className="cs-card-num">{index + 1}</div>
                </div>

                {/* Content side */}
                <div className="cs-card-content">
                  {isRevealed ? (
                    <div className="cs-message-reveal">
                      <div className="cs-message-icon">{textConfig.cards.messageIcon}</div>
                      <p className="cs-message-text">{card.message}</p>
                    </div>
                  ) : (
                    <div className="cs-reveal-hint">
                      <div className="cs-hint-icon">{textConfig.cards.hintIcon}</div>
                      <p className="cs-hint-label">{textConfig.cards.tapLabel}</p>
                      <p className="cs-hint-sub">{textConfig.cards.tapToOpen}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div className="text-center animate-cs-rise" style={{ animationDelay: "0.4s" }}>
          <p className="text-xs font-semibold text-[#9a4c73] mb-2">
            {revealedCards.length === 0
              ? textConfig.cards.progress.start
              : revealedCards.length === cards.length
                ? textConfig.cards.progress.complete
                : textConfig.cards.progress.discovered(revealedCards.length, cards.length)}
          </p>
          <div className="cs-progress-track">
            <div
              className="cs-progress-fill"
              style={{ width: `${(revealedCards.length / cards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-cs-fadedown">
          <div className="cs-popup">
            <div className="text-4xl mb-3">{textConfig.cards.popupEmoji}</div>
            <h3 className="cs-popup-title">{textConfig.cards.popup.title}</h3>
            <p className="cs-popup-body">{textConfig.cards.popup.message}</p>
            <div className="flex flex-col gap-2 mt-5">
              <button
                onClick={() => { closePopup(); onNext(); }}
                className="cs-btn-primary"
              >
                {textConfig.cards.popup.openFinal}
              </button>
              <button onClick={closePopup} className="cs-btn-ghost">
                {textConfig.cards.popup.stay}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .cs-root {
          font-family: "Plus Jakarta Sans", system-ui, sans-serif;
        }

        .cs-header-tag { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #f04299; background: #fff0f8; border: 1.5px solid #ffc0de; border-radius: 100px; padding: 4px 14px; margin-bottom: 10px; }
        .cs-header-title { font-size: clamp(1.6rem, 5vw, 2.4rem); font-weight: 900; color: #c026a0; line-height: 1.15; margin-bottom: 6px; }
        .cs-header-sub { font-size: 0.88rem; color: #9a4c73; font-weight: 500; }

        .cs-card {
          display: flex;
          height: 160px;
          border-radius: 18px;
          overflow: hidden;
          border: 1.5px solid #fce4f2;
          background: #fff;
          box-shadow: 0 4px 20px rgba(240,66,153,0.08), 0 1px 6px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
          will-change: transform;
        }
        .cs-card:hover {
          transform: translateY(-4px) scale(1.005);
          box-shadow: 0 10px 32px rgba(240,66,153,0.15), 0 2px 10px rgba(0,0,0,0.06);
          border-color: var(--accent, #f04299);
        }
        .cs-card-revealed {
          border-color: var(--accent, #f04299);
          box-shadow: 0 6px 28px rgba(240,66,153,0.14), 0 2px 8px rgba(0,0,0,0.05);
        }

        .cs-card-image-wrap {
          position: relative;
          flex-shrink: 0;
          width: 38%;
          overflow: hidden;
        }
        .cs-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }
        .cs-card:hover .cs-card-img { transform: scale(1.05); }
        .cs-card-num {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--accent, #f04299);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .cs-card-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 24px;
          overflow: hidden;
        }

        .cs-reveal-hint {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .cs-card:hover .cs-reveal-hint { opacity: 1; }
        .cs-hint-icon { font-size: 1.8rem; animation: csEnvBob 2.4s ease-in-out infinite; }
        .cs-hint-label { font-size: 0.82rem; font-weight: 700; color: #c0256e; }
        .cs-hint-sub { font-size: 0.68rem; color: #b07090; text-transform: uppercase; letter-spacing: 0.08em; }

        .cs-message-reveal {
          display: flex;
          flex-direction: column;
          gap: 8px;
          animation: csMsgReveal 0.5s cubic-bezier(.34,1.3,.64,1) both;
          width: 100%;
        }
        .cs-message-icon { font-size: 1rem; opacity: 0.5; }
        .cs-message-text {
          font-family: 'Kalam', cursive;
          font-size: 0.92rem;
          line-height: 1.7;
          color: #3d1a2d;
          overflow-y: auto;
          max-height: 110px;
          scrollbar-width: thin;
          scrollbar-color: #fce4f2 transparent;
        }

        .cs-progress-track {
          height: 4px;
          border-radius: 2px;
          background: #fce4f2;
          max-width: 220px;
          margin: 0 auto;
          overflow: hidden;
        }
        .cs-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #f04299, #9333ea);
          border-radius: 2px;
          transition: width 0.5s cubic-bezier(.34,1.56,.64,1);
        }

        .cs-popup {
          background: #fff;
          border-radius: 22px;
          padding: 32px 28px;
          max-width: 340px;
          width: 100%;
          text-align: center;
          border: 1.5px solid #fce4f2;
          box-shadow: 0 24px 60px rgba(240,66,153,0.2);
          animation: csPopupBounce 0.4s cubic-bezier(.34,1.56,.64,1) both;
        }
        .cs-popup-title { font-size: 1.3rem; font-weight: 800; color: #f04299; margin-bottom: 8px; }
        .cs-popup-body { font-size: 0.88rem; color: #9a4c73; line-height: 1.6; }
        .cs-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 10px 28px;
          border-radius: 8px;
          background: #f04299;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
        }
        .cs-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .cs-btn-ghost { font-size: 0.78rem; color: #9a4c73; background: none; border: none; cursor: pointer; transition: color 0.2s; }
        .cs-btn-ghost:hover { color: #f04299; }

        @keyframes csEnvBob { 0%,100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-5px) rotate(4deg); } }
        @keyframes csMsgReveal { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes csPopupBounce { from { opacity: 0; transform: scale(0.88) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes csFadedown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes csRise { from { opacity: 0; transform: translateY(22px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-cs-fadedown { animation: csFadedown 0.6s ease both; }
        .animate-cs-rise { animation: csRise 0.7s cubic-bezier(.34,1.3,.64,1) both; }
      `}</style>
    </div>
  );
};

export default CardsSection;
