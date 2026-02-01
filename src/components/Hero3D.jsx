import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Sparkles, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

// --- Standard Colors ---
const EXCEL_GREEN = "#107c41";
const GRID_COLOR = "#a0a0a0"; 
const TEXT_COLOR = "#000000"; 
const PAPER_COLOR = "#ffffff";

// --- Helper: A Single Grid Line ---
const GridLine = ({ position, args }) => (
  <mesh position={position}>
    <boxGeometry args={args} />
    <meshBasicMaterial color={GRID_COLOR} />
  </mesh>
);

// --- The Excel Sheet Component ---
function ExcelSheet({ position, rotation, title, type }) {
  const width = 1.8;
  const height = 1.2;
  const depth = 0.05;

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group position={position} rotation={rotation}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial color={PAPER_COLOR} roughness={0.1} />
        </mesh>
        <mesh position={[0, height/2 - 0.15, depth/2 + 0.001]}>
          <planeGeometry args={[width, 0.3]} />
          <meshBasicMaterial color={EXCEL_GREEN} />
        </mesh>
        <Text position={[-width/2 + 0.1, height/2 - 0.15, depth/2 + 0.01]} fontSize={0.1} color="white" anchorX="left" anchorY="middle">
          {title}
        </Text>
        <group position={[0, -0.15, depth/2 + 0.001]}>
          <GridLine position={[0, 0.3, 0]} args={[width, 0.005, 0]} />
          <GridLine position={[0, 0.15, 0]} args={[width, 0.005, 0]} />
          <GridLine position={[0, 0, 0]} args={[width, 0.005, 0]} />
          <GridLine position={[0, -0.15, 0]} args={[width, 0.005, 0]} />
          <GridLine position={[0, -0.3, 0]} args={[width, 0.005, 0]} />
          <GridLine position={[-0.3, 0, 0]} args={[0.005, 0.9, 0]} />
          <GridLine position={[0.3, 0, 0]} args={[0.005, 0.9, 0]} />
        </group>
        <group position={[-width/2 + 0.1, -0.15, depth/2 + 0.02]}>
          <Text position={[0, 0.4, 0]} color={TEXT_COLOR} fontSize={0.08} anchorX="left" maxWidth={0.5}>ID</Text>
          <Text position={[0.6, 0.4, 0]} color={TEXT_COLOR} fontSize={0.08} anchorX="left">ITEM</Text>
          <Text position={[1.2, 0.4, 0]} color={TEXT_COLOR} fontSize={0.08} anchorX="left">QTY</Text>
          <Text position={[0, 0.22, 0]} color={TEXT_COLOR} fontSize={0.07} anchorX="left">001</Text>
          <Text position={[0.6, 0.22, 0]} color={TEXT_COLOR} fontSize={0.07} anchorX="left">{type === 'CRM' ? "Alpha Co" : "Laptop"}</Text>
          <Text position={[1.2, 0.22, 0]} color={TEXT_COLOR} fontSize={0.07} anchorX="left">50</Text>
          <Text position={[0, 0.07, 0]} color={TEXT_COLOR} fontSize={0.07} anchorX="left">002</Text>
          <Text position={[0.6, 0.07, 0]} color={TEXT_COLOR} fontSize={0.07} anchorX="left">{type === 'CRM' ? "Beta Inc" : "Mouse"}</Text>
          <Text position={[1.2, 0.07, 0]} color={TEXT_COLOR} fontSize={0.07} anchorX="left">120</Text>
          <Text position={[0, -0.08, 0]} color={TEXT_COLOR} fontSize={0.07} anchorX="left">003</Text>
          <Text position={[0.6, -0.08, 0]} color={TEXT_COLOR} fontSize={0.07} anchorX="left">{type === 'CRM' ? "Gamma" : "Cable"}</Text>
          <Text position={[1.2, -0.08, 0]} color={TEXT_COLOR} fontSize={0.07} anchorX="left">25</Text>
        </group>
      </group>
    </Float>
  );
}

// --- Scene Setup ---
function Scene() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} color="white" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#06b6d4" />

      <ExcelSheet position={[-2.2, 1, 0]} rotation={[0, 0.1, 0]} title="Clients.xlsx" type="CRM" />
      <ExcelSheet position={[2.5, -0.5, 0.5]} rotation={[0, -0.2, 0]} title="Stock_Q1.xlsx" type="STOCK" />
      <ExcelSheet position={[-2.5, -1.8, -1]} rotation={[-0.1, 0.1, 0]} title="Sales_Data.csv" type="CRM" />
      <ExcelSheet position={[2.2, 2.2, -2]} rotation={[0.1, -0.1, 0]} title="Products.db" type="STOCK" />

      {/* Keep OrbitControls for auto-rotation, but disable interactions */}
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="h-screen w-full relative flex items-center justify-center bg-[#0f172a]">
      
      {/* THE FIX: We apply pointer-events-none to the Wrapper AND the Canvas style.
         This guarantees that touches pass through to the page scroll.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas 
          camera={{ position: [0, 0, 7], fov: 50 }}
          style={{ pointerEvents: "none" }} // <--- FORCE DISABLE POINTER EVENTS
        >
          <Scene />
        </Canvas>
      </div>
      
      {/* Content Layer (Clickable) */}
      <div className="relative z-10 text-center px-4 max-w-4xl pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-auto" // Re-enable clicks for buttons
        >
          <h2 className="text-sm md:text-base font-bold text-green-400 mb-4 tracking-[0.3em] uppercase">
            SYSTEM STATUS: ONLINE
          </h2>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            Mastering the<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
              Flow of Data.
            </span>
          </h1>
          
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
            Professional Data Entry & Management with Software Engineering Precision.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link to="services" smooth={true}>
              <button className="px-8 py-4 rounded-lg bg-green-600 text-white font-bold hover:bg-green-500 transition-all cursor-pointer shadow-lg shadow-green-500/30 hover:scale-105">
                View Services
              </button>
            </Link>
            <Link to="contact" smooth={true}>
              <button className="px-8 py-4 rounded-lg border border-white/20 bg-black/40 hover:bg-white/10 transition-all backdrop-blur-sm cursor-pointer text-white hover:scale-105">
                Contact Me
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}