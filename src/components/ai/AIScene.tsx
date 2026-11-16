import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import NeuralNetworkModel, { AINode, AI_NODES } from './NeuralNetworkModel';
import { useScrollStore } from '../../store/useScrollStore';
import { Brain, Cpu, Sparkles, Network, Terminal, CheckCircle2 } from 'lucide-react';

export default function AIScene() {
  const [selectedNode, setSelectedNode] = useState<AINode | null>(AI_NODES[1]); // Default to Attention Heads
  const { isOrbitEnabled } = useScrollStore();

  return (
    <section id="ai-chamber" className="relative min-h-screen w-full bg-[#070a0f] py-20 px-5 sm:px-10 overflow-hidden border-t border-cyan-500/15">
      {/* Background Grid Accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(129,140,248,0.07),rgba(255,255,255,0))]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10">
          <p className="eyebrow flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            CHAMBER 03 · ARTIFICIAL INTELLIGENCE & AGENTS
          </p>
          <h2 className="display mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Autonomous <span className="text-indigo-400">Intelligence Systems.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-haze sm:text-base">
            Engineering genuine AI architectures: transformer attention mechanics, high-dimensional vector embeddings, multi-agent cooperative societies, and deterministic tool-use execution.
          </p>
        </div>

        {/* 3D Neural Chamber Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive 3D Neural Canvas (7 cols) */}
          <div className="lg:col-span-7 h-[520px] rounded-2xl border border-indigo-500/25 bg-slate-950/60 backdrop-blur-md relative overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.06)]">
            <Canvas
              camera={{ position: [0, 0.2, 5.8], fov: 48 }}
              className="w-full h-full"
            >
              <ambientLight intensity={0.6} />
              <pointLight position={[8, 8, 8]} intensity={1.5} color="#818cf8" />
              <pointLight position={[-8, -8, -8]} intensity={0.9} color="#22d3ee" />

              <Suspense fallback={null}>
                <NeuralNetworkModel
                  onSelectNode={(node) => setSelectedNode(node)}
                  selectedId={selectedNode ? selectedNode.id : null}
                />
              </Suspense>

              <OrbitControls
                enableZoom={isOrbitEnabled}
                enablePan={false}
                minDistance={3.2}
                maxDistance={8.5}
                autoRotate={!isOrbitEnabled}
                autoRotateSpeed={0.6}
              />
            </Canvas>

            {/* In-Canvas Tag */}
            <div className="pointer-events-none absolute bottom-4 left-4 text-[10px] font-mono text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded bg-[#070a0f]/80">
              SYNAPTIC FLOW // CLICK NODES TO INSPECT AGENT PIPELINES
            </div>
          </div>

          {/* Right: Technical Inspector Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-[520px] rounded-2xl border border-indigo-500/25 bg-[#0d1218]/80 backdrop-blur-md p-6 sm:p-8">
            {selectedNode ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-semibold">
                      {selectedNode.stage}
                    </span>
                    <h3 className="display text-2xl font-bold text-white mt-1">
                      {selectedNode.name}
                    </h3>
                  </div>
                  <div
                    className="w-4 h-4 rounded-full border shadow-[0_0_10px_currentColor]"
                    style={{ backgroundColor: selectedNode.color, color: selectedNode.color }}
                  />
                </div>

                <p className="text-sm leading-relaxed text-slate-300">
                  {selectedNode.description}
                </p>

                {/* Metrics Table */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3 font-mono text-xs">
                  <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mb-2">
                    NEURAL & AGENT METRICS
                  </div>
                  {Object.entries(selectedNode.metrics).map(([label, val]) => (
                    <div key={label} className="flex justify-between items-center border-b border-slate-900 pb-1.5 last:border-none">
                      <span className="text-slate-500">{label}:</span>
                      <span className="text-indigo-200 font-semibold">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Node Switcher Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {AI_NODES.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setSelectedNode(n)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        selectedNode.id === n.id
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 font-semibold'
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
                <Brain className="w-10 h-10 mb-3 text-indigo-500/40" />
                <p>Select any neural node on the 3D graph to inspect its model architecture.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
