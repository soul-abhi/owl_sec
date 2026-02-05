"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [currentFont, setCurrentFont] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const fonts = [
    "Signika",
    "Roboto",
    "Montserrat",
    "Poppins",
    "Inter",
    "Raleway",
    "Bebas Neue",
    "Oswald",
    "Playfair Display",
    "Space Grotesk",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);

      setTimeout(() => {
        setCurrentFont((prev) => (prev + 1) % fonts.length);
      }, 200);

      setTimeout(() => {
        setIsGlitching(false);
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, [fonts.length]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Signika:wght@700&family=Roboto:wght@700&family=Montserrat:wght@700&family=Poppins:wght@700&family=Inter:wght@700&family=Raleway:wght@700&family=Bebas+Neue&family=Oswald:wght@700&family=Playfair+Display:wght@700&family=Space+Grotesk:wght@700&display=swap');

        @keyframes glitch-anim {
          0% {
            clip-path: inset(40% 0 61% 0);
            transform: translate(0);
          }
          10% {
            clip-path: inset(92% 0 1% 0);
            transform: translate(-5px, 5px);
          }
          20% {
            clip-path: inset(43% 0 1% 0);
            transform: translate(5px, -5px);
          }
          30% {
            clip-path: inset(25% 0 58% 0);
            transform: translate(-5px, 0);
          }
          40% {
            clip-path: inset(54% 0 7% 0);
            transform: translate(5px, 5px);
          }
          50% {
            clip-path: inset(58% 0 43% 0);
            transform: translate(0, 5px);
          }
          60% {
            clip-path: inset(45% 0 40% 0);
            transform: translate(-5px, -5px);
          }
          70% {
            clip-path: inset(14% 0 54% 0);
            transform: translate(5px, 0);
          }
          80% {
            clip-path: inset(45% 0 6% 0);
            transform: translate(-5px, 5px);
          }
          90% {
            clip-path: inset(38% 0 19% 0);
            transform: translate(5px, -5px);
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
        }

        @keyframes glitch-anim2 {
          0% {
            clip-path: inset(65% 0 31% 0);
            transform: translate(0);
          }
          10% {
            clip-path: inset(22% 0 58% 0);
            transform: translate(5px, -5px);
          }
          20% {
            clip-path: inset(51% 0 2% 0);
            transform: translate(-5px, 5px);
          }
          30% {
            clip-path: inset(84% 0 11% 0);
            transform: translate(5px, 0);
          }
          40% {
            clip-path: inset(2% 0 69% 0);
            transform: translate(-5px, -5px);
          }
          50% {
            clip-path: inset(70% 0 27% 0);
            transform: translate(0, -5px);
          }
          60% {
            clip-path: inset(31% 0 65% 0);
            transform: translate(5px, 5px);
          }
          70% {
            clip-path: inset(92% 0 3% 0);
            transform: translate(-5px, 0);
          }
          80% {
            clip-path: inset(12% 0 81% 0);
            transform: translate(5px, -5px);
          }
          90% {
            clip-path: inset(47% 0 15% 0);
            transform: translate(-5px, 5px);
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
        }

        .glitch-wrapper {
          position: relative;
          display: inline-block;
        }

        .glitch-active {
          color: black;
        }

        .glitch-active::before,
        .glitch-active::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .glitch-active::before {
          left: 2px;
          text-shadow: -3px 0 #ff00c1;
          animation: glitch-anim 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        .glitch-active::after {
          left: -2px;
          text-shadow: -3px 0 #00fff9, 3px 3px #ff00c1;
          animation: glitch-anim2 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        .font-transition {
          transition: font-family 0.3s ease-in-out;
        }

        .hero-secion {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
      `}</style>

      <main style={{ overflowX: 'hidden' }}>
        <section className="hero-secion">
          <div
            className={`welcome-main font-transition glitch-wrapper ${isGlitching ? "glitch-active" : ""}`}
            style={{ fontFamily: fonts[currentFont] }}
            data-text={`Thoughts\nNot Profile`}
          >
            Thoughts <br /> Not Profile
          </div>
        </section>
      </main>
    </>
  );
}