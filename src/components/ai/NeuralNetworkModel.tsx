import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export interface AINode {
  id: string;
  name: string;
  stage: string;
  position: [number, number, number];
  color: string;
  description: string;
  metrics: Record<string, string>;
}

export const AI_NODES: AINode[] = [
  {
    id: 'input-sensors',
    name: 'Multimodal Sensor Ingestion',
    stage: 'Input & Tokenization',
    position: [-3.2, 0, 0],
    color: '#38bdf8',
    description:
      'High-bandwidth telemetry ingestion: parses orbital Keplerian elements, binary Android manifest bytecode, aerodynamic sensor streams, and natural language prompts.',
    metrics: {
      Format: 'SGP4 TLE / Token Tensors',
      Throughput: '100k tokens/sec',
      Embeddings: '1536-dim vector projection',
    },
  },
  {
    id: 'attention-heads',
    name: 'Multi-Head Self-Attention Matrix',
    stage: 'Transformer Core',
    position: [-1.4, 1.4, 0],
    color: '#818cf8',
    description:
      'Dynamic key-value cross-attention layers computing contextual dependencies across temporal states, orbital trajectories, and semantic code syntax trees.',
    metrics: {
      Heads: '32 Parallel Heads',
      Context: '128k Token Window',
      Mechanism: 'FlashAttention-2 Scaled Dot',
    },
  },
  {
    id: 'agent-society',
    name: 'Multi-Agent Society (SynergyMesh)',
    stage: 'Autonomous Agents',
    position: [-1.4, -1.4, 0],
    color: '#34d399',
    description:
      'Autonomous cooperative agent networks executing peer negotiation protocols, goal decomposition, consensus verification, and role-based execution.',
    metrics: {
      Protocol: 'Peer Consensus Auction',
      Topology: 'Dynamic Directed Acyclic Graph',
      Safety: 'Bounded Context Guards',
    },
  },
  {
    id: 'latent-space',
    name: 'Latent Manifold & Vector Memory',
    stage: 'Representation',
    position: [0.8, 0, 0],
    color: '#f59e0b',
    description:
      'High-dimensional vector manifold with HNSW semantic search index, persistent episodic memory storage, and similarity distance calculations.',
    metrics: {
      Similarity: 'Cosine Metric (0.94 threshold)',
      Index: 'HNSW Graph (M=16, efSearch=64)',
      Recall: '99.2% precision',
    },
  },
  {
    id: 'inference-engine',
    name: 'Inference & Generation Engine',
    stage: 'Execution',
    position: [2.6, 1.2, 0],
    color: '#ec4899',
    description:
      'Calibrated decision scoring, greedy/nucleus sampling, speculative decoding, and streaming generation of structured JSON/TypeScript schemas.',
    metrics: {
      Quantization: 'FP8 / Int4 TensorRT',
      Latency: '< 18ms First-Token Time',
      Output: 'Type-Safe JSON Schema',
    },
  },
  {
    id: 'action-dispatcher',
    name: 'Actuator & Tool Dispatcher',
    stage: 'Action Execution',
    position: [2.6, -1.2, 0],
    color: '#06b6d4',
    description:
      'Deterministic sandboxed execution of API calls, CAD macro scripting, orbital trajectory propagation, and verification tests.',
    metrics: {
      Sandbox: 'Wasm / Isolated Subprocess',
      Verification: 'Static Schema & Type Check',
      Rollback: 'Instant State Revert',
    },
  },
];

export const AI_CONNECTIONS: [string, string][] = [
  ['input-sensors', 'attention-heads'],
  ['input-sensors', 'agent-society'],
  ['attention-heads', 'latent-space'],
  ['agent-society', 'latent-space'],
  ['latent-space', 'inference-engine'],
  ['latent-space', 'action-dispatcher'],
  ['inference-engine', 'action-dispatcher'],
];

function SynapseWave({
  start,
  end,
  speed,
  offset,
  color,
}: {
  start: [number, number, number];
  end: [number, number, number];
  speed: number;
  offset: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    meshRef.current.position.lerpVectors(startVec, endVec, t);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.065, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default function NeuralNetworkModel({
  onSelectNode,
  selectedId,
}: {
  onSelectNode: (node: AINode) => void;
  selectedId: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.0006) * 0.2;
    }
  });

  const nodeMap = useMemo(() => {
    const map = new Map<string, AINode>();
    AI_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Ambient neural grid glow */}
      <pointLight color="#818cf8" intensity={2} distance={8} position={[0, 0, 1]} />

      {/* Connection Synapses */}
      {AI_CONNECTIONS.map(([srcId, dstId], idx) => {
        const src = nodeMap.get(srcId);
        const dst = nodeMap.get(dstId);
        if (!src || !dst) return null;

        const points = [new THREE.Vector3(...src.position), new THREE.Vector3(...dst.position)];
        const lineGeom = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <group key={`${srcId}-${dstId}`}>
            <primitive
              object={
                new THREE.Line(
                  lineGeom,
                  new THREE.LineBasicMaterial({
                    color: '#334155',
                    transparent: true,
                    opacity: 0.8,
                  })
                )
              }
            />
            <SynapseWave
              start={src.position}
              end={dst.position}
              speed={0.5}
              offset={idx * 0.3}
              color={src.color}
            />
          </group>
        );
      })}

      {/* 3D Neural Nodes */}
      {AI_NODES.map((node) => {
        const isHovered = hoveredId === node.id;
        const isSelected = selectedId === node.id;

        return (
          <group
            key={node.id}
            position={node.position}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(node.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredId(null);
              document.body.style.cursor = 'auto';
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node);
            }}
          >
            {/* Core Sphere */}
            <mesh scale={isSelected ? 1.35 : isHovered ? 1.2 : 1}>
              <sphereGeometry args={[0.38, 24, 24]} />
              <meshStandardMaterial
                color={node.color}
                roughness={0.2}
                metalness={0.8}
                emissive={node.color}
                emissiveIntensity={isSelected ? 0.9 : isHovered ? 0.5 : 0.25}
              />
            </mesh>

            {/* Pulsing Outer Wireframe Lattice */}
            <mesh scale={isSelected ? 1.6 : isHovered ? 1.4 : 1.25}>
              <icosahedronGeometry args={[0.38, 1]} />
              <meshBasicMaterial
                color={node.color}
                wireframe
                transparent
                opacity={isSelected ? 0.7 : 0.3}
              />
            </mesh>

            {/* Floating 3D Label */}
            <Html distanceFactor={14} position={[0, 0.65, 0]} center className="pointer-events-none">
              <div
                className={`px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                    : isHovered
                    ? 'bg-slate-900/90 border-slate-500 text-white font-semibold'
                    : 'bg-black/60 border-slate-800 text-slate-400'
                }`}
              >
                {node.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
