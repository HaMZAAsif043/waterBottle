"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Center, Html, Environment, Lightformer } from "@react-three/drei";
import { Model } from "./Model";
import FloatingLines from "./FloatingLines";

function MouseRig({ children }) {
  const group = useRef();
  useFrame((state) => {
    // Smoothly rotate the model based on mouse X position
    const targetRotationY = state.pointer.x * 1.5; // Increased max rotation angle left/right for more dramatic effect
    // Increased interpolation speed (from 0.05 to 0.15) for much faster, snappier following
    group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 0.15;
  });
  return <group ref={group}>{children}</group>;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');

  @keyframes waveFlow {
    0%   { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -2400; }
  }
  @keyframes waveFlowRev {
    0%   { stroke-dashoffset: -2400; }
    100% { stroke-dashoffset: 0; }
  }
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
  @keyframes dashSlide {
    0%   { opacity: 0; transform: scaleX(0); }
    30%  { opacity: 1; transform: scaleX(1); }
    70%  { opacity: 1; transform: scaleX(1); }
    100% { opacity: 0; transform: scaleX(1.3); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .wave-blue { stroke-dasharray: 2400; animation: waveFlow 14s linear infinite; }
  .wave-gold { stroke-dasharray: 2400; animation: waveFlowRev 18s linear infinite; }
  .wave-blue2 { stroke-dasharray: 2400; animation: waveFlow 20s linear infinite; }
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
      <div className="w-full h-screen max-h-screen relative overflow-hidden flex flex-col [font-family:'Montserrat',sans-serif] bg-[linear-gradient(160deg,#f0f6ff_0%,#e8f2fe_30%,#ddeeff_60%,#f5faff_100%)]">

        {/* ── FLOATING LINES BACKGROUND ── */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <FloatingLines 
           enabledWaves={["middle"]}
                  // Array - specify line count per wave; Number - same count for all waves
                  lineCount={10}
                  // Array - specify line distance per wave; Number - same distance for all waves
                  lineDistance={24}
                  bendRadius={10}
                  bendStrength={15}
                  interactive={false}
                  parallax={true}
                  animationSpeed={3.9}
                  // Fixed the props (FloatingLines uses linesGradient, not gradientStart/End)
                  linesGradient={['#1d4171', '#151a21', '#D6B852']}
                  mixBlendMode="normal"
          />
        </div>

        {/* ── WAVES ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
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
          <div key={i} className="absolute h-[3px] rounded-[2px] pointer-events-none opacity-55" style={{
            width: d.width,
            top: d.top, left: d.left, right: d.right, bottom: d.bottom,
            background: d.background,
            animation: `dashSlide ${d.animDuration} ${d.animDelay} ease-in-out infinite`,
          }} />
        ))}

        {/* ── TOP LABEL ── */}
        {/* <p className="text-center font-medium text-[#4a6fa5] tracking-[.06em] pt-[clamp(16px,3vw,32px)] opacity-0 [animation:fadeSlideUp_.8s_.2s_forwards] text-[clamp(11px,1.2vw,14px)]">The Hero Bottle – 500ml Starter Kit</p> */}

        {/* ── HEADLINE ── */}
        <div className="text-center px-[clamp(16px,5vw,80px)] pt-[clamp(8px,1.5vw,16px)] pb-0 leading-[1.1] opacity-0 [animation:fadeSlideUp_.9s_.45s_forwards]">
          <h1 className="font-[Montserrat] font-extrabold text-[clamp(24px,4vw,56px)] text-[#0a1a2b] tracking-tight uppercase">One Bottle. Two Towels.</h1>
          <h1 className="font-[Montserrat] font-extrabold text-[clamp(24px,4vw,56px)] text-[#0a1a2b] tracking-tight uppercase">Zero Water. Infinite Waow.</h1>
        </div>

        {/* ── PRODUCT STAGE ── */}
        <div className="flex items-end justify-center gap-[clamp(16px,3vw,48px)] py-[clamp(10px,2vw,24px)] px-0 flex-1 min-h-0 relative z-10 opacity-0 [animation:fadeSlideUp_1s_.75s_forwards]">
          {/* Removed max-h-[600px] to allow the 3D canvas to expand further down without getting cut off */}
          <div className="flex flex-col items-center justify-center w-[clamp(300px,50vw,700px)] h-full w-full relative z-20">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
              <ambientLight intensity={1.5} />
              <spotLight position={[10, 20, 10]} angle={0.2} penumbra={1} intensity={2.5} />
              <directionalLight position={[-10, 10, -5]} intensity={1.5} />
              <pointLight position={[0, -5, 5]} intensity={0.8} />
              
              <Suspense fallback={
                <Html center>
                  <div className="flex flex-col items-center gap-2 min-w-[200px]">
                    <div className="w-8 h-8 rounded-full border-4 border-[#4a6fa5] border-t-transparent animate-spin"></div>
                    <span className="text-[#4a6fa5] font-bold text-sm tracking-widest uppercase">Loading 3D</span>
                  </div>
                </Html>
              }>
                {/* Follows the mouse cursor seamlessly */}
                <MouseRig>
                  {/* Floating up and down infinitely */}
                  {/* Kept speed high, but reduced the vertical travel distance so it stays in frame */}
                  <Float speed={4.5} rotationIntensity={0.8} floatIntensity={1} floatingRange={[0, 0.8]}>
                    {/* <Center> fixes any absurd pivot offsets inside the 3D model */}
                    <Center position={[0, -1.5, 0]}>
                      <group scale={11}>
                        <Model />
                      </group>
                    </Center>
                  </Float>
                </MouseRig>
                
                {/* Replaced 'city' preset with a lightweight generated environment to avoid network fetch failures */}
                <Environment resolution={256}>
                  <group rotation={[-Math.PI / 2, 0, 0]}>
                    <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                    <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
                    <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
                    <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
                  </group>
                </Environment>
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* ── BOTTOM CAPTION ── */}
        {/* <p className="text-center font-medium text-[#4a6fa5] tracking-[.06em] pb-2 opacity-0 [animation:fadeSlideUp_.8s_1.1s_forwards] text-[clamp(11px,1.2vw,14px)]">The Hero Bottle – 500ml Starter Kit</p> */}

        {/* ── FOOTER ── */}
        <div className="bg-[#0a1a2be0] backdrop-blur-md py-[clamp(10px,1.5vw,18px)] px-[clamp(16px,4vw,60px)] flex items-center flex-wrap gap-1.5 z-20 opacity-0 [animation:fadeSlideUp_.7s_1.3s_forwards]">
          <span className="font-bold text-[clamp(10px,1.1vw,13px)] text-white tracking-[.08em] mr-2 whitespace-nowrap">NEXUS-ECO-ENERGY</span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-[clamp(9px,1vw,12px)] text-white/70 font-['Montserrat'] whitespace-nowrap">Founder &amp; CEO: Dr. Babar Ali Tariq</span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-[clamp(9px,1vw,12px)] text-white/70 font-['Montserrat'] whitespace-nowrap">📞 +92-303-46-47-187</span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-[clamp(9px,1vw,12px)] text-white/70 font-['Montserrat'] whitespace-nowrap">✉ <a href="mailto:dr.alishah911@gmail.com" className="text-[#6b8cffe6] no-underline">dr.alishah911@gmail.com</a></span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-[clamp(9px,1vw,12px)] text-white/70 font-['Montserrat'] whitespace-nowrap">LinkedIn: <a href="https://www.linkedin.com/in/alishah911" target="_blank" rel="noreferrer" className="text-[#6b8cffe6] no-underline">www.linkedin.com/in/alishah911</a></span>
        </div>
      </div>
    </>
  );
}
