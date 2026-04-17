import FloatingLines from "@/components/FloatingLines";


export default function Home() {
  return (
      <div className="w-screen h-screen">
          <div style={{ width: '100%', height: '600px', position: 'relative' }}>
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
                  gradientStart="#1d4171"
                  gradientMid="#151a21"
                  gradientEnd="#D6B852"
              />
          </div>
    </div>
  );
}
