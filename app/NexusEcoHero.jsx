"use client";
import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .nexus-hero {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(160deg, #f0f6ff 0%, #e8f2fe 30%, #ddeeff 60%, #f5faff 100%);
    font-family: 'Space Grotesk', sans-serif;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* ── ANIMATED WAVES ── */
  .waves-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .wave-svg { position: absolute; inset: 0; width: 100%; height: 100%; }

  @keyframes waveFlow {
    0%   { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -2400; }
  }
  @keyframes waveFlowRev {
    0%   { stroke-dashoffset: -2400; }
    100% { stroke-dashoffset: 0; }
  }
  .wave-blue  { stroke-dasharray: 2400; animation: waveFlow 14s linear infinite; }
  .wave-gold  { stroke-dasharray: 2400; animation: waveFlowRev 18s linear infinite; }
  .wave-blue2 { stroke-dasharray: 2400; animation: waveFlow 20s linear infinite; }

  /* ── FLOATING ORBS ── */
  .orb { position: absolute; border-radius: 50%; pointer-events: none; }
  @keyframes floatA {
    0%,100% { transform: translateY(0px) scale(1); opacity: .85; }
    50%      { transform: translateY(-18px) scale(1.05); opacity: 1; }
  }
  @keyframes floatB {
    0%,100% { transform: translateY(0px) scale(1); opacity: .7; }
    50%      { transform: translateY(14px) scale(.95); opacity: .9; }
  }
  @keyframes floatC {
    0%,100% { transform: translateX(0px) scale(1); }
    50%      { transform: translateX(12px) scale(1.08); }
  }

  /* ── DASHES ── */
  .dash { position: absolute; height: 3px; border-radius: 2px; pointer-events: none; }
  @keyframes dashSlide {
    0%   { opacity: 0; transform: scaleX(0); }
    30%  { opacity: 1; transform: scaleX(1); }
    70%  { opacity: 1; transform: scaleX(1); }
    100% { opacity: 0; transform: scaleX(1.3); }
  }

  /* ── LAYOUT ── */
  .top-label {
    text-align: center;
    font-size: clamp(13px, 1.4vw, 16px);
    font-weight: 400;
    color: #4a6fa5;
    letter-spacing: .06em;
    padding-top: clamp(24px, 4vw, 44px);
    opacity: 0;
    animation: fadeSlideUp .8s .2s forwards;
  }

  .headline {
    text-align: center;
    padding: clamp(12px, 2vw, 22px) clamp(16px, 5vw, 80px) 0;
    line-height: 1.0;
    opacity: 0;
    animation: fadeSlideUp .9s .45s forwards;
  }
  .headline h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: clamp(32px, 6.5vw, 88px);
    color: #0a1a2b;
    letter-spacing: -.02em;
    text-transform: uppercase;
  }

  /* ── PRODUCT STAGE ── */
  .product-stage {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: clamp(16px, 3vw, 48px);
    padding: clamp(20px, 4vw, 48px) 0 clamp(8px, 2vw, 24px);
    flex: 1;
    position: relative;
    z-index: 10;
    opacity: 0;
    animation: fadeSlideUp 1s .75s forwards;
  }

  /* Towel */
  .towel-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    filter: drop-shadow(0 18px 36px rgba(74,111,165,.22));
  }
  .towel {
    width: clamp(90px, 14vw, 180px);
    height: clamp(68px, 10vw, 130px);
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  }
  .towel::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 4px,
      rgba(255,255,255,.08) 4px,
      rgba(255,255,255,.08) 5px
    );
  }
  .towel::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 20px;
    background: rgba(0,0,0,.12);
    border-radius: 6px 6px 0 0;
  }
  .towel.exterior { background: linear-gradient(135deg, #3a3a3a 0%, #555 40%, #444 60%, #2e2e2e 100%); }
  .towel.interior { background: linear-gradient(135deg, #b0b8c4 0%, #c8d0dc 40%, #bac3cf 60%, #a8b2be 100%); }
  .towel-label {
    font-family: 'Inter', sans-serif;
    font-size: clamp(10px, 1.2vw, 14px);
    font-weight: 500;
    letter-spacing: .18em;
    color: #4a6fa5;
  }

  /* Bottle */
  .bottle-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    filter: drop-shadow(0 24px 48px rgba(74,111,165,.28));
    transform: translateY(-clamp(10px, 2vw, 30px));
  }
  .bottle {
    width: clamp(60px, 9vw, 110px);
    height: clamp(160px, 24vw, 290px);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .bottle-nozzle {
    width: clamp(28px, 4.5vw, 58px);
    height: clamp(14px, 2vw, 28px);
    background: linear-gradient(135deg, #8a9bb5 0%, #b0bfcc 50%, #7a8ea8 100%);
    border-radius: 8px 8px 0 0;
    position: relative;
  }
  .bottle-nozzle::after {
    content: '';
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 14px; height: 8px;
    background: #6a7e98;
    border-radius: 0 0 4px 4px;
  }
  .bottle-neck {
    width: clamp(24px, 3.5vw, 44px);
    height: clamp(14px, 2vw, 28px);
    background: linear-gradient(90deg, #c8d4e0 0%, #e8f0f8 50%, #c0ccda 100%);
    border-radius: 4px;
  }
  .bottle-body {
    width: 100%;
    flex: 1;
    background: linear-gradient(135deg, rgba(200,220,240,.7) 0%, rgba(230,245,255,.95) 30%, rgba(200,225,245,.8) 70%, rgba(180,205,230,.6) 100%);
    border-radius: 10px;
    border: 1px solid rgba(150,190,230,.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 8px 6px;
    backdrop-filter: blur(4px);
    position: relative;
    overflow: hidden;
  }
  .bottle-body::before {
    content: '';
    position: absolute;
    left: 8%; top: 8%; bottom: 8%;
    width: 12%;
    background: rgba(255,255,255,.5);
    border-radius: 4px;
  }
  .bottle-brand {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(6px, .9vw, 10px);
    font-weight: 600;
    color: #2a4a6a;
    letter-spacing: .12em;
  }
  .bottle-name {
    font-family: 'Inter', sans-serif;
    font-size: clamp(5px, .75vw, 8px);
    font-weight: 500;
    color: #3a5a7a;
    text-align: center;
    line-height: 1.3;
  }
  .bottle-size {
    font-family: 'Inter', sans-serif;
    font-size: clamp(5px, .7vw, 8px);
    color: #5a7a9a;
    margin-top: 2px;
  }
  /* wave graphic on bottle */
  .bottle-wave {
    position: absolute;
    bottom: 18%;
    left: 0; right: 0;
    height: 35%;
    background: linear-gradient(0deg, rgba(74,111,165,.18) 0%, transparent 100%);
    border-radius: 0 0 10px 10px;
  }

  /* Card */
  .brochure-card {
    width: clamp(55px, 8vw, 110px);
    height: clamp(72px, 11vw, 145px);
    background: linear-gradient(135deg, #f8faff 0%, #eef4fd 100%);
    border: 1px solid rgba(100,150,200,.25);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 6px;
    gap: 4px;
    box-shadow: 2px 4px 16px rgba(74,111,165,.15);
    margin-bottom: clamp(4px, 1vw, 16px);
  }
  .card-logo { font-size: clamp(5px, .8vw, 9px); font-weight: 600; color: #2a5a9a; letter-spacing: .08em; }
  .card-line { height: 2px; width: 80%; background: linear-gradient(90deg, #4a6fa5, #6b8cff); border-radius: 1px; }
  .card-text-block { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  .card-text { width: 100%; height: 2px; background: rgba(74,111,165,.2); border-radius: 1px; }

  /* Reflections */
  .product-reflection {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 40%;
    background: linear-gradient(0deg, rgba(200,220,240,.25) 0%, transparent 100%);
    pointer-events: none;
    border-radius: 0 0 12px 12px;
  }

  /* ── BOTTOM LABEL ── */
  .bottom-label {
    text-align: center;
    font-size: clamp(13px, 1.4vw, 16px);
    font-weight: 400;
    color: #4a6fa5;
    letter-spacing: .06em;
    padding-bottom: 8px;
    opacity: 0;
    animation: fadeSlideUp .8s 1.1s forwards;
  }

  /* ── FOOTER ── */
  .footer-bar {
    background: rgba(10, 26, 43, .94);
    backdrop-filter: blur(10px);
    padding: clamp(10px, 1.5vw, 18px) clamp(16px, 4vw, 60px);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    z-index: 20;
    opacity: 0;
    animation: fadeSlideUp .7s 1.3s forwards;
  }
  .footer-brand {
    font-weight: 700;
    font-size: clamp(10px, 1.1vw, 13px);
    color: #fff;
    letter-spacing: .08em;
    margin-right: 8px;
    white-space: nowrap;
  }
  .footer-divider { color: rgba(255,255,255,.3); font-size: 12px; }
  .footer-item {
    font-size: clamp(9px, 1vw, 12px);
    color: rgba(255,255,255,.7);
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
  }
  .footer-item a { color: rgba(107,140,255,.9); text-decoration: none; }

  /* ── KEYFRAMES ── */
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── SHINE on bottle ── */
  @keyframes bottleShine {
    0%,100% { opacity: .4; }
    50%      { opacity: .8; }
  }
  .bottle-shine {
    position: absolute;
    left: 18%; top: 10%;
    width: 12%; height: 70%;
    background: rgba(255,255,255,.5);
    border-radius: 4px;
    animation: bottleShine 3s ease-in-out infinite;
  }
`;

const Orb = ({ size, color, top, left, right, bottom, anim, delay, opacity = 0.8 }) => ({
  position: "absolute",
  width: size, height: size,
  borderRadius: "50%",
  background: color,
  top, left, right, bottom,
  animation: `${anim} ${delay}`,
  opacity,
  pointerEvents: "none",
});

export default function NexusEcoHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const orbs = [
    { size: "clamp(18px,3vw,44px)", color: "#4a6fa5", top: "14%",  left: "5%",   anim: "floatA 4.2s ease-in-out infinite", delay: "0s" },
    { size: "clamp(10px,1.8vw,26px)", color: "#6b8cff", top: "8%",  right: "22%", anim: "floatB 5.8s ease-in-out infinite", delay: ".8s" },
    { size: "clamp(28px,4.5vw,62px)", color: "#4a6fa5", bottom: "22%", left: "3%", anim: "floatA 6.1s ease-in-out infinite", delay: "1.2s" },
    { size: "clamp(12px,2vw,30px)", color: "#6b8cff", top: "30%", right: "6%",  anim: "floatC 5s ease-in-out infinite", delay: ".4s" },
    { size: "clamp(8px,1.4vw,20px)",  color: "#6b8cff", top: "55%", left: "18%",  anim: "floatB 7s ease-in-out infinite", delay: "2s" },
    { size: "clamp(20px,3.5vw,50px)", color: "#d4af37", top: "6%",  right: "5%",  anim: "floatA 5.5s ease-in-out infinite", delay: ".6s", opacity: 0.75 },
    { size: "clamp(10px,1.6vw,24px)", color: "#d4af37", bottom: "18%", right: "12%", anim: "floatC 6.8s ease-in-out infinite", delay: "1.5s", opacity: 0.7 },
    { size: "clamp(8px,1.2vw,18px)",  color: "#d4af37", top: "42%", right: "25%", anim: "floatB 4.9s ease-in-out infinite", delay: "2.2s", opacity: 0.65 },
    { size: "clamp(6px,1vw,14px)",   color: "#6b8cff", top: "70%", right: "35%", anim: "floatA 7.5s ease-in-out infinite", delay: "3s", opacity: 0.55 },
  ];

  const dashes = [
    { width: "clamp(24px,4vw,56px)", top: "18%",  left: "10%",  background: "#4a6fa5", animDuration: "5s", animDelay: ".5s" },
    { width: "clamp(14px,2vw,32px)", top: "18%",  left: "calc(10% + clamp(28px,4.5vw,64px))", background: "#d4af37", animDuration: "5s", animDelay: "1s" },
    { width: "clamp(28px,5vw,72px)", top: "40%",  right: "8%",  background: "#4a6fa5", animDuration: "6s", animDelay: "0s" },
    { width: "clamp(16px,2.5vw,40px)", top: "40%", right: "calc(8% + clamp(32px,5.5vw,80px))", background: "#d4af37", animDuration: "6s", animDelay: ".7s" },
    { width: "clamp(20px,3vw,48px)", bottom: "30%", left: "7%",  background: "#d4af37", animDuration: "4.5s", animDelay: "1.5s" },
    { width: "clamp(28px,4vw,60px)", top: "62%",  right: "5%",  background: "#4a6fa5", animDuration: "5.5s", animDelay: ".3s" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="nexus-hero">

        {/* ── WAVES ── */}
        <div className="waves-container">
          <svg className="wave-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            {/* Gold wave - lower right */}
            <path className="wave-gold"
              d="M800,520 C900,480 1000,420 1100,400 C1200,380 1300,420 1400,460 C1500,500 1550,560 1600,600"
              fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" opacity=".55" />
            <path className="wave-gold"
              d="M750,560 C870,520 980,460 1080,450 C1180,440 1280,480 1380,520"
              fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" opacity=".35" />
            <path className="wave-gold"
              d="M820,490 C940,450 1060,390 1160,380 C1260,370 1360,400 1440,440"
              fill="none" stroke="#c9a000" strokeWidth="1" strokeLinecap="round" opacity=".25" />

            {/* Blue wave - upper left */}
            <path className="wave-blue"
              d="M-60,380 C60,340 180,280 300,260 C420,240 540,280 660,320 C780,360 840,420 960,440 C1080,460 1150,440 1260,400"
              fill="none" stroke="#4a6fa5" strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
            <path className="wave-blue"
              d="M-80,420 C40,380 160,320 280,300 C400,280 520,320 640,360 C760,400 820,450 940,470"
              fill="none" stroke="#6b8cff" strokeWidth="1.8" strokeLinecap="round" opacity=".35" />
            <path className="wave-blue2"
              d="M-40,340 C80,300 200,240 320,220 C440,200 560,240 680,280 C800,320 880,390 1000,420"
              fill="none" stroke="#5580cc" strokeWidth="1.2" strokeLinecap="round" opacity=".25" />

            {/* Secondary diagonals */}
            <path className="wave-blue"
              d="M0,600 C120,560 240,500 360,490 C480,480 580,520 700,550"
              fill="none" stroke="#4a6fa5" strokeWidth="1" strokeLinecap="round" opacity=".2" />
            <path className="wave-gold"
              d="M400,120 C520,100 620,80 720,90 C820,100 920,140 1020,160"
              fill="none" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" opacity=".28" />
          </svg>
        </div>

        {/* ── ORBS ── */}
        {orbs.map((o, i) => (
          <div key={i} style={Orb(o)} />
        ))}

        {/* ── DASHES ── */}
        {dashes.map((d, i) => (
          <div key={i} className="dash" style={{
            width: d.width,
            top: d.top, left: d.left, right: d.right, bottom: d.bottom,
            background: d.background,
            opacity: 0.55,
            animation: `dashSlide ${d.animDuration} ${d.animDelay} ease-in-out infinite`,
          }} />
        ))}

        {/* ── TOP LABEL ── */}
        <p className="top-label">The Hero Bottle – 500ml Starter Kit</p>

        {/* ── HEADLINE ── */}
        <div className="headline">
          <h1>One Bottle. Two Towels.</h1>
          <h1>Zero Water. Infinite Waow.</h1>
        </div>

        {/* ── PRODUCT STAGE ── */}
        <div className="product-stage">

          {/* Exterior Towel */}
          <div className="towel-wrap">
            <div className="towel exterior" />
            <span className="towel-label">EXTERIOR</span>
          </div>

          {/* Bottle */}
          <div className="bottle-wrap">
            <div className="bottle">
              <div className="bottle-nozzle" />
              <div className="bottle-neck" />
              <div className="bottle-body">
                <div className="bottle-wave" />
                <div className="bottle-shine" />
                <span className="bottle-brand">NEXUS-ECO</span>
                <span className="bottle-name">All-in-One<br />Waterless<br />Wash</span>
                <span className="bottle-size">500ml</span>
              </div>
            </div>
          </div>

          {/* Interior Towel + Card */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(8px,1.5vw,20px)" }}>
            <div className="towel-wrap">
              <div className="towel interior" />
              <span className="towel-label">INTERIOR</span>
            </div>
            {/* Mini brochure card */}
            <div className="brochure-card">
              <span className="card-logo">⊙ NEXUS-ECO</span>
              <div className="card-line" />
              <div className="card-text-block">
                {[80, 60, 90, 55, 70, 48, 62, 50].map((w, i) => (
                  <div key={i} className="card-text" style={{ width: `${w}%`, marginTop: i > 0 ? "3px" : 0 }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM CAPTION ── */}
        <p className="bottom-label">The Hero Bottle – 500ml Starter Kit</p>

        {/* ── FOOTER ── */}
        <div className="footer-bar">
          <span className="footer-brand">NEXUS-ECO-ENERGY</span>
          <span className="footer-divider">|</span>
          <span className="footer-item">Founder &amp; CEO: Dr. Babar Ali Tariq</span>
          <span className="footer-divider">|</span>
          <span className="footer-item">📞 +92-303-46-47-187</span>
          <span className="footer-divider">|</span>
          <span className="footer-item">✉ <a href="mailto:dr.alishah911@gmail.com">dr.alishah911@gmail.com</a></span>
          <span className="footer-divider">|</span>
          <span className="footer-item">LinkedIn: <a href="https://www.linkedin.com/in/alishah911" target="_blank" rel="noreferrer">www.linkedin.com/in/alishah911</a></span>
        </div>
      </div>
    </>
  );
}
