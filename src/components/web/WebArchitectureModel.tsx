import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore } from '../../store/useScrollStore';

export interface ArchNode {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
  color: string;
  geometryType: 'box' | 'cylinder' | 'octahedron' | 'torus';
  description: string;
  specs: Record<string, string>;
}

export const ARCH_NODES: ArchNode[] = [
  {
    id: 'frontend',
    name: 'Frontend Client & Edge UI',
    category: 'Presentation',
    position: [0, 2.4, 0],
    color: '#67e8f9',
    geometryType: 'octahedron',
    description:
      'High-performance React 19, Next.js, and Three.js client applications. Features optimistic UI updates, shader pipelines, and WebGL 60fps rendering.',
    specs: {
      Framework: 'React 19 / Next.js',
      Rendering: 'WebGL / Three.js',
      Hydration: 'Streaming SSR',
      Latency: '< 16ms frame target',
    },
  },
  {
    id: 'api-gateway',
    name: 'API Gateway & Reverse Proxy',
    category: 'Ingress & Routing',
    position: [0, 1.0, 0],
    color: '#38bdf8',
    geometryType: 'cylinder',
    description:
      'Unified request routing, TLS termination, distributed rate-limiting, and microservice dispatch layer routing thousands of concurrent operations.',
    specs: {
      Protocol: 'HTTP/2 + gRPC + WebSocket',
      RateLimit: 'Token Bucket / Redis',
      AuthCheck: 'JWT Verification < 2ms',
    },
  },
  {
    id: 'auth-vault',
    name: 'Auth Vault & Row-Level Security',
    category: 'Security & Identity',
    position: [-2.4, 0.4, 1.2],
    color: '#a855f7',
    geometryType: 'box',
    description:
      'Multi-tenant identity provider, cryptographic token issuance, Supabase Row-Level Security (RLS) enforcement, and biometric session guards.',
    specs: {
      Engine: 'Supabase Auth / GoTrue',
      Policies: 'Declarative PostgreSQL RLS',
      Encryption: 'AES-256-GCM at rest',
    },
  },
  {
    id: 'business-engine',
    name: 'Business State Machine & Microservices',
    category: 'Core Logic',
    position: [2.4, 0.4, 1.2],
    color: '#34d399',
    geometryType: 'box',
    description:
      'Autonomous transaction state machines, escrow lock-in logic, and algorithmic business valuation models powering applications like Compbuy and HandyTrust.',
    specs: {
      Runtime: 'Node.js / Express / Python',
      Transactions: 'Two-phase escrow commit',
      Reliability: 'ACID transactional consistency',
    },
  },
  {
    id: 'database-cluster',
    name: 'Distributed Database & Vector Store',
    category: 'Persistence',
    position: [-1.6, -1.2, -1.0],
    color: '#f59e0b',
    geometryType: 'cylinder',
    description:
      'Relational PostgreSQL cluster with read-replicas, temporal partitioning, pgvector embeddings for semantic retrieval, and real-time CDC replication.',
    specs: {
      Primary: 'PostgreSQL 16',
      Vectors: 'pgvector (HNSW indexing)',
      Replication: 'Async hot-standby stream',
    },
  },
  {
    id: 'cache-bus',
    name: 'Redis Cache & Event Bus',
    category: 'Messaging',
    position: [1.6, -1.2, -1.0],
    color: '#f43f5e',
    geometryType: 'torus',
    description:
      'In-memory key-value caching layer and asynchronous event stream with Pub/Sub workers handling background jobs, telemetry pings, and live notifications.',
    specs: {
      Throughput: '100k+ ops/sec',
      PubSub: 'Redis Stream + WebSockets',
      Persistence: 'AOF + RDB snapshots',
    },
  },
  {
    id: 'cloud-infra',
    name: 'Cloud Infrastructure & Telemetry',
    category: 'Platform & SRE',
    position: [0, -2.4, 0],
    color: '#06b6d4',
    geometryType: 'octahedron',
    description:
      'Containerized deployments, serverless functions, automated CI/CD pipelines, Prometheus telemetry, and zero-downtime rolling updates.',
    specs: {
      Deployment: 'Vercel + Docker + AWS',
      CI_CD: 'GitHub Actions automated matrix',
      Monitoring: 'Health telemetry & OpenTelemetry',
    },
  },
];

// Connection edges between architectural components
export const ARCH_CONNECTIONS: [string, string][] = [
  ['frontend', 'api-gateway'],
  ['api-gateway', 'auth-vault'],
  ['api-gateway', 'business-engine'],
  ['business-engine', 'database-cluster'],
  ['business-engine', 'cache-bus'],
  ['auth-vault', 'database-cluster'],
  ['database-cluster', 'cloud-infra'],
  ['cache-bus', 'cloud-infra'],
];

function DataPacket({
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
    const t = ((clock.getElapsedTime() * speed + offset) % 1);
    meshRef.current.position.lerpVectors(startVec, endVec, t);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default function WebArchitectureModel({
  onSelectNode,
  selectedId,
}: {
  onSelectNode: (node: ArchNode) => void;
  selectedId: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  const nodeMap = useMemo(() => {
    const map = new Map<string, ArchNode>();
    ARCH_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Central Axis Light */}
      <pointLight color="#22d3ee" intensity={3} distance={10} position={[0, 0, 0]} />

      {/* Connection Edges & Pulsing Data Packets */}
      {ARCH_CONNECTIONS.map(([srcId, dstId], idx) => {
        const src = nodeMap.get(srcId);
        const dst = nodeMap.get(dstId);
        if (!src || !dst) return null;

        const points = [new THREE.Vector3(...src.position), new THREE.Vector3(...dst.position)];
        const lineGeom = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <group key={`${srcId}-${dstId}`}>
            <primitive object={new THREE.Line(lineGeom, new THREE.LineBasicMaterial({ color: '#1e293b', transparent: true, opacity: 0.7 }))} />
            <DataPacket
              start={src.position}
              end={dst.position}
              speed={0.4}
              offset={idx * 0.25}
              color={src.color}
            />
          </group>
        );
      })}

      {/* 3D Geometric Architecture Nodes */}
      {ARCH_NODES.map((node) => {
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
            {/* Geometric Mesh Based on Type */}
            {node.geometryType === 'octahedron' && (
              <mesh scale={isSelected ? 1.3 : isHovered ? 1.15 : 1}>
                <octahedronGeometry args={[0.55, 0]} />
                <meshStandardMaterial
                  color={node.color}
                  metalness={0.8}
                  roughness={0.2}
                  wireframe={!isSelected && !isHovered}
                  emissive={node.color}
                  emissiveIntensity={isSelected ? 0.8 : isHovered ? 0.4 : 0.15}
                />
              </mesh>
            )}

            {node.geometryType === 'cylinder' && (
              <mesh scale={isSelected ? 1.3 : isHovered ? 1.15 : 1}>
                <cylinderGeometry args={[0.45, 0.45, 0.6, 24]} />
                <meshStandardMaterial
                  color={node.color}
                  metalness={0.7}
                  roughness={0.3}
                  wireframe={!isSelected && !isHovered}
                  emissive={node.color}
                  emissiveIntensity={isSelected ? 0.8 : isHovered ? 0.4 : 0.15}
                />
              </mesh>
            )}

            {node.geometryType === 'box' && (
              <mesh scale={isSelected ? 1.3 : isHovered ? 1.15 : 1}>
                <boxGeometry args={[0.65, 0.65, 0.65]} />
                <meshStandardMaterial
                  color={node.color}
                  metalness={0.75}
                  roughness={0.25}
                  wireframe={!isSelected && !isHovered}
                  emissive={node.color}
                  emissiveIntensity={isSelected ? 0.8 : isHovered ? 0.4 : 0.15}
                />
              </mesh>
            )}

            {node.geometryType === 'torus' && (
              <mesh scale={isSelected ? 1.3 : isHovered ? 1.15 : 1} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.45, 0.15, 16, 32]} />
                <meshStandardMaterial
                  color={node.color}
                  metalness={0.8}
                  roughness={0.2}
                  wireframe={!isSelected && !isHovered}
                  emissive={node.color}
                  emissiveIntensity={isSelected ? 0.8 : isHovered ? 0.4 : 0.15}
                />
              </mesh>
            )}

            {/* Orbiting Halo Ring on Hover/Select */}
            {(isHovered || isSelected) && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.75, 0.8, 32]} />
                <meshBasicMaterial color={node.color} side={THREE.DoubleSide} transparent opacity={0.6} />
              </mesh>
            )}

            {/* In-3D Floating Label */}
            <Html distanceFactor={14} position={[0, 0.75, 0]} center className="pointer-events-none">
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
