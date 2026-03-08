/*
  Personal Use License Notice:
  You may use this item multiple times for personal use only.
  You may not resell, redistribute, or use it for any commercial purpose.
  Unauthorized use may result in legal action.
*/
import React from 'react';

const Cake: React.FC = () => {
  return (
    <div className="cake-wrapper">
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="candle">
          <div className="flame"></div>
        </div>
      </div>

      <style>{`
        .cake-wrapper {
          position: relative;
          width: 250px;
          height: 200px;
          margin: 0 auto;
        }

        .cake {
          position: relative;
          width: 250px;
          height: 200px;
        }

        .cake > * {
          position: absolute;
        }

        .plate {
          width: 270px;
          height: 110px;
          position: absolute;
          bottom: -10px;
          left: -10px;
          background: linear-gradient(135deg, #e8e8e8, #d1d1d1);
          border-radius: 50%;
          box-shadow:
            0 2px 0 #b8b8b8,
            0 4px 0 #b8b8b8,
            0 5px 40px rgba(0, 0, 0, 0.3);
        }

        .layer {
          position: absolute;
          display: block;
          width: 250px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b4513, #6b3410);
          box-shadow:
            0 2px 0px #954a18,
            0 4px 0px #7a3d14,
            0 6px 0px #7a3c14,
            0 8px 0px #7a3c13,
            0 10px 0px #793c13,
            0 12px 0px #793b13,
            0 14px 0px #793b12,
            0 16px 0px #783b12,
            0 18px 0px #783a12,
            0 20px 0px #783a11,
            0 22px 0px #773a11,
            0 24px 0px #773911,
            0 26px 0px #773910,
            0 28px 0px #763910,
            0 30px 0px #763810;
        }

        .layer-top { 
          top: 0px; 
        }
        
        .layer-middle { 
          top: 33px; 
        }
        
        .layer-bottom { 
          top: 66px; 
        }

        .icing {
          top: 2px;
          left: 5px;
          background: linear-gradient(135deg, #fff0f5, #ffe4e1);
          width: 240px;
          height: 90px;
          border-radius: 50%;
          position: absolute;
          box-shadow: inset 0 2px 8px rgba(255, 182, 193, 0.3);
        }

        .icing::before {
          content: "";
          position: absolute;
          top: 4px;
          right: 5px;
          bottom: 6px;
          left: 5px;
          background: linear-gradient(135deg, #fff5f8, #ffe7eb);
          box-shadow:
            0 0 8px rgba(255, 192, 203, 0.4),
            0 0 8px rgba(255, 192, 203, 0.4),
            0 0 8px rgba(255, 192, 203, 0.4);
          border-radius: 50%;
          z-index: 1;
        }

        .drip {
          display: block;
          width: 50px;
          height: 60px;
          border-bottom-left-radius: 25px;
          border-bottom-right-radius: 25px;
          background: linear-gradient(180deg, #fff0f5, #ffe4e1);
        }

        .drip1 {
          top: 53px;
          left: 5px;
          transform: skewY(15deg);
          height: 48px;
          width: 40px;
          background: linear-gradient(180deg, #fff0f5, #ffb6c1);
        }

        .drip2 {
          top: 69px;
          left: 181px;
          transform: skewY(-15deg);
          background: linear-gradient(180deg, #fff0f5, #ffb6c1);
        }

        .drip3 {
          top: 54px;
          left: 90px;
          width: 80px;
          border-bottom-left-radius: 40px;
          border-bottom-right-radius: 40px;
          background: linear-gradient(180deg, #fff0f5, #ffb6c1);
        }

        .candle {
          background: linear-gradient(135deg, #ff1493, #dc143c);
          width: 16px;
          height: 50px;
          border-radius: 8px / 4px;
          top: -20px;
          left: 50%;
          margin-left: -8px;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(220, 20, 60, 0.4);
        }

        .candle::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 16px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff69b4, #ff1493);
        }

        .flame {
          position: absolute;
          background: radial-gradient(circle, #ffd700 0%, #ff8c00 30%, #ff4500 70%);
          width: 15px;
          height: 35px;
          border-radius: 10px 10px 10px 10px / 25px 25px 10px 10px;
          top: -34px;
          left: 50%;
          margin-left: -7.5px;
          z-index: 10;
          box-shadow:
            0 0 10px rgba(255, 140, 0, 0.6),
            0 0 20px rgba(255, 140, 0, 0.6),
            0 0 60px rgba(255, 69, 0, 0.4),
            0 0 80px rgba(255, 69, 0, 0.4);
          transform-origin: 50% 90%;
          animation: cake-flicker 1s ease-in-out alternate infinite;
        }

        @keyframes cake-flicker {
          0% {
            transform: skewX(5deg);
            box-shadow: 
              0 0 10px rgba(255, 140, 0, 0.3),
              0 0 20px rgba(255, 140, 0, 0.3),
              0 0 60px rgba(255, 69, 0, 0.2),
              0 0 80px rgba(255, 69, 0, 0.2);
          }
          25% {
            transform: skewX(-5deg);
            box-shadow:
              0 0 10px rgba(255, 140, 0, 0.6),
              0 0 20px rgba(255, 140, 0, 0.6),
              0 0 60px rgba(255, 69, 0, 0.4),
              0 0 80px rgba(255, 69, 0, 0.4);
          }
          50% {
            transform: skewX(10deg);
            box-shadow:
              0 0 10px rgba(255, 140, 0, 0.4),
              0 0 20px rgba(255, 140, 0, 0.4),
              0 0 60px rgba(255, 69, 0, 0.3),
              0 0 80px rgba(255, 69, 0, 0.3);
          }
          75% {
            transform: skewX(-10deg);
            box-shadow:
              0 0 10px rgba(255, 140, 0, 0.5),
              0 0 20px rgba(255, 140, 0, 0.5),
              0 0 60px rgba(255, 69, 0, 0.4),
              0 0 80px rgba(255, 69, 0, 0.4);
          }
          100% {
            transform: skewX(5deg);
            box-shadow:
              0 0 10px rgba(255, 140, 0, 0.6),
              0 0 20px rgba(255, 140, 0, 0.6),
              0 0 60px rgba(255, 69, 0, 0.4),
              0 0 80px rgba(255, 69, 0, 0.4);
          }
        }
      `}</style>
    </div>
  );
};

export default Cake;
