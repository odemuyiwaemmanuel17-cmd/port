import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Holographic calibration targets matching Reference B (0421, 0854, E-16)
const CALIBRATION_BOXES = [
  { id: '0421', pos: [3.2, 1.6, 1.8] as [number, number, number], label: 'CAL-0421' },
  { id: '0854', pos: [-1.2, 2.2, -2.4] as [number, number, number], label: 'CAL-0854' },
  { id: 'E-16', pos: [-2.8, 1.2, 1.5] as [number, number, number], label: 'GRID E-16' },
];

export default function HangarBayEffects() {
  const scanRingRef = useRef<THREE.Mesh>(null);
  const sparkRef = useRef<THREE.Points>(null);

  // Spark particle positions
  const sparkGeo = useRef(() => {
    const geo = new THREE.BufferGeometry();
    const count = 48;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 0.8;
      positions[i + 1] = Math.random() * 0.8;
      positions[i + 2] = (Math.random() - 0.5) * 0.8;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }).current();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Moving laser scan ring along fuselage X axis
    if (scanRingRef.current) {
      scanRingRef.current.position.x = Math.sin(t * 0.8) * 4.2;
    }

    // Spark jitter
    if (sparkRef.current) {
      sparkRef.current.rotation.y = t * 2;
    }
  });

  return (
    <group>
      {/* Dynamic Laser Scanning Ring (Reference B) */}
      <mesh ref={scanRingRef} rotation={[0, Math.PI / 2, 0]} position={[0, 0.4, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.65} />
      </mesh>

      {/* Robotic Arm Welder Spark Points (Reference B) */}
      <group position={[1.8, 0.5, 1.4]}>
        <points ref={sparkRef} geometry={sparkGeo}>
          <pointsMaterial color="#67e8f9" size={0.05} transparent opacity={0.8} />
        </points>
        <pointLight color="#22d3ee" intensity={2.5} distance={3} />
      </group>

      {/* Holographic Calibration Callout Boxes (Reference B) */}
      {CALIBRATION_BOXES.map((box) => (
        <group key={box.id} position={box.pos}>
          {/* Wireframe Box */}
          <mesh>
            <boxGeometry args={[0.4, 0.3, 0.4]} />
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.4} />
          </mesh>

          {/* Floating Cyan Annotation */}
          <Html distanceFactor={12} center className="pointer-events-none select-none">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-cyan-400/40 bg-[#070a0f]/80 text-[9px] font-mono text-cyan-300 whitespace-nowrap shadow-[0_0_8px_rgba(34,211,238,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>{box.label}</span>
            </div>
          </Html>
        </group>
      ))}

      {/* Overhead Hangar Structural Girders */}
      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[30, 0.4, 0.4]} />
        <meshStandardMaterial color="#1a222c" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[0, 7.5, -4]}>
        <boxGeometry args={[30, 0.4, 0.4]} />
        <meshStandardMaterial color="#1a222c" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}
