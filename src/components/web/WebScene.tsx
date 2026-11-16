import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WebArchitectureModel, { ArchNode, ARCH_NODES } from './WebArchitectureModel';
import { useScrollStore } from '../../store/useScrollStore';
import { Server, Database, Shield, Layers, Code, Globe, Cpu } from 'lucide-react';

export default function WebScene() {
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(ARCH_NODES[0]);
  const { isOrbitEnabled } = useScrollStore();

  return (
    <section id="web-engineering" className="relative min-h-screen w-full bg-[#070a0f] py-20 px-5 sm:px-10 overflow-hidden border-t border-cyan-500/15">
      {/* Background Grid Accent */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(103,232,249,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(103,232,249,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10">
          <p className="eyebrow flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            CHAMBER 02 · FULL-STACK & WEB SYSTEMS
          </p>
          <h2 className="display mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Distributed Software <span className="text-ion">Architecture.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-haze sm:text-base">
            Complete full-stack systems engineering: from streaming WebGL client interfaces and high-throughput API gateways to row-level secured database clusters and cloud infrastructure.
          </p>
        </div>

        {/* 3D Chamber & Architecture Inspection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive 3D Architecture Canvas (7 cols) */}
          <div className="lg:col-span-7 h-[520px] rounded-2xl border border-cyan-500/20 bg-slate-950/60 backdrop-blur-md relative overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.05)]">
            <Canvas
              camera={{ position: [0, 1.2, 5.5], fov: 50 }}
              className="w-full h-full"
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
              <pointLight position={[-10, -10, -10]} intensity={0.8} color="#f59e0b" />
              
              <Suspense fallback={null}>
                <WebArchitectureModel
                  onSelectNode={(node) => setSelectedNode(node)}
                  selectedId={selectedNode ? selectedNode.id : null}
                />
              </Suspense>

              <OrbitControls
                enableZoom={isOrbitEnabled}
                enablePan={false}
                minDistance={3.5}
                maxDistance={9}
                autoRotate={!isOrbitEnabled}
                autoRotateSpeed={0.8}
              />
            </Canvas>

            {/* In-Canvas Tech Watermark */}
            <div className="pointer-events-none absolute bottom-4 left-4 text-[10px] font-mono text-cyan-400/70 border border-cyan-500/20 px-2.5 py-1 rounded bg-[#070a0f]/80">
              CLICK NODES TO INSPECT SYSTEM TELEMETRY
            </div>
          </div>

          {/* Right: Technical Inspector Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-[520px] rounded-2xl border border-cyan-500/25 bg-[#0d1218]/80 backdrop-blur-md p-6 sm:p-8">
            {selectedNode ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                      {selectedNode.category}
                    </span>
                    <h3 className="display text-2xl font-bold text-white mt-1">
                      {selectedNode.name}
                    </h3>
                  </div>
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: selectedNode.color, borderColor: selectedNode.color }}
                  />
                </div>

                <p className="text-sm leading-relaxed text-slate-300">
                  {selectedNode.description}
                </p>

                {/* Specs Table */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3 font-mono text-xs">
                  <div className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-wider mb-2">
                    ENGINEERING SPECIFICATIONS
                  </div>
                  {Object.entries(selectedNode.specs).map(([label, val]) => (
                    <div key={label} className="flex justify-between items-center border-b border-slate-900 pb-1.5 last:border-none">
                      <span className="text-slate-500">{label}:</span>
                      <span className="text-slate-200 font-semibold">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Node Switcher Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {ARCH_NODES.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setSelectedNode(n)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        selectedNode.id === n.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-semibold'
                          : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {n.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                <Layers className="w-10 h-10 mb-3 text-cyan-500/40" />
                <p>Select any architecture node on the 3D grid to inspect its technical implementation details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
