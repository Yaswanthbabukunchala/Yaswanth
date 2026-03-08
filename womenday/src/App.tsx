/*
  Personal Use License Notice:
  You may use this item multiple times for personal use only.
  You may not resell, redistribute, or use it for any commercial purpose.
  Unauthorized use may result in legal action.
*/
import React, { useState, useMemo } from 'react';
import ActivityPage from './components/ActivityPage';
import ChillZone from './components/ChillZone';
import CardsSection from './components/CardsSection';
import FinalLetter from './components/FinalLetter';
import { AudioProvider } from './contexts/AudioContext';
import './App.css';

const HEART_COUNT = 10;

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const hearts = useMemo(() => Array.from({ length: HEART_COUNT }, (_, i) => ({
    id: i,
    left: `${4 + (i * 9.2) % 88}%`,
    delay: `${(i * 1.4) % 14}s`,
    duration: `${16 + (i * 1.9) % 10}s`,
    size: `${8 + (i * 1.4) % 6}px`,
    opacity: 0.12 + (i % 4) * 0.05,
    drift: i % 2 === 0 ? 18 : -18,
  })), []);

  const pages = [
    <ActivityPage onNext={() => goToPage(1)} />,
    <ChillZone onNext={() => goToPage(2)} />,
    <CardsSection onNext={() => goToPage(3)} />,
    <FinalLetter onRestart={() => goToPage(0)} />
  ];

  const goToPage = (pageIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageIndex);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <AudioProvider>
      <div className="app">
        {/* Shared soft background */}
        <div className="app-bg" aria-hidden="true" />
        {/* Soft ambient blobs */}
        <div className="app-blob app-blob-1" aria-hidden="true" />
        <div className="app-blob app-blob-2" aria-hidden="true" />
        {/* Falling hearts */}
        <div className="hearts-wrap" aria-hidden="true">
          {hearts.map(h => (
            <div
              key={h.id}
              className="heart-petal"
              style={{
                left: h.left,
                fontSize: h.size,
                animationDuration: h.duration,
                animationDelay: h.delay,
                opacity: h.opacity,
                '--drift': `${h.drift}px`,
              } as React.CSSProperties}
            >♥</div>
          ))}
        </div>

        <div className={`page-container ${isTransitioning ? 'transitioning' : ''}`}>
          {pages[currentPage]}
        </div>

        <style>{`
          .app {
            position: relative;
            width: 100%;
            min-height: 100vh;
            overflow: hidden;
            font-family: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          }

          /* Shared page background — matches envelope page exactly */
          .app-bg {
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, #fff4f9 0%, #fff0f5 40%, #fef3ff 100%);
            z-index: 0;
          }

          /* Soft ambient blobs */
          .app-blob {
            position: fixed;
            border-radius: 50%;
            filter: blur(100px);
            pointer-events: none;
            z-index: 0;
          }
          .app-blob-1 {
            width: 600px; height: 600px;
            background: radial-gradient(circle, rgba(255,214,232,0.5) 0%, transparent 70%);
            top: -200px; left: -200px;
            animation: appBlob1 22s ease-in-out infinite;
          }
          .app-blob-2 {
            width: 500px; height: 500px;
            background: radial-gradient(circle, rgba(232,213,255,0.4) 0%, transparent 70%);
            bottom: -150px; right: -150px;
            animation: appBlob2 28s ease-in-out infinite;
          }

          @keyframes appBlob1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(50px,40px); } }
          @keyframes appBlob2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-40px,-30px); } }

          /* Falling hearts — below page content, visible through transparent component roots */
          .hearts-wrap { position: fixed; inset: 0; pointer-events: none; z-index: 2; overflow: hidden; }
          .heart-petal {
            position: absolute;
            top: -20px;
            color: #f9a8d4;
            animation: heartFall linear infinite;
            will-change: transform;
          }
          @keyframes heartFall {
            0%   { transform: translateY(-20px) translateX(0px) rotate(-12deg); opacity: 0; }
            6%   { opacity: 1; }
            50%  { transform: translateY(52vh) translateX(var(--drift, 12px)) rotate(150deg); }
            92%  { opacity: 1; }
            100% { transform: translateY(108vh) translateX(calc(var(--drift, 12px) * -0.6)) rotate(300deg); opacity: 0; }
          }

          /* Page transitions */
          .page-container {
            position: relative;
            z-index: 10;
            transition: opacity 0.45s ease, transform 0.45s ease;
          }
          .page-container.transitioning {
            opacity: 0;
            transform: translateY(8px);
          }

          @media (prefers-reduced-motion: reduce) {
            .app-blob { animation: none !important; }
          }
        `}</style>
      </div>
    </AudioProvider>
  );
}

export default App;
