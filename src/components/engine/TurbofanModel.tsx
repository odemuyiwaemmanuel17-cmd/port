import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface EnginePartDef {
  id: string;
  label: string;
  blurb: string;
  assembledX: number;
  explodedX: number;
}

export const ENGINE_PARTS: EnginePartDef[] = [
  { id: 'nacelle', label: 'Nacelle & Cowl', blurb: 'The outer shell forms the bypass duct. Its internal contour accelerates fan air around the core — 5–6 times more airflow than the core itself on a high-bypass engine.', assembledX: -0.2, explodedX: -0.2 },
  { id: 'fan', label: 'Fan', blurb: 'Wide-chord swept fan blades. The only compressor stage that drives both the core and the bypass stream; tip speed is limited by transonic losses and stress.', assembledX: 2.35, explodedX: 4.6 },
  { id: 'booster', label: 'Booster / LP Compressor', blurb: 'Low-pressure stages mounted on the LP shaft, continuing compression behind the fan before the split to the core.', assembledX: 1.55, explodedX: 3.1 },
  { id: 'hpc', label: 'HP Compressor', blurb: 'High-pressure stages on the HP shaft. Each stage adds pressure; the rear blades shrink as the gas gets hotter and denser.', assembledX: 0.55, explodedX: 1.5 },
  { id: 'combustor', label: 'Combustion Chamber', blurb: 'Annular liner with swirling primary holes. Fuel burns continuously at near-constant pressure; the liner holes also cool the flame tube.', assembledX: -0.45, explodedX: -0.5 },
  { id: 'hpt', label: 'HP Turbine', blurb: 'Cooled first-stage blades extract shaft work to drive the HP compressor. Ceramics and film cooling let it survive above the metal melting point.', assembledX: -1.25, explodedX: -2.2 },
  { id: 'lpt', label: 'LP Turbine', blurb: 'Drives the fan through the LP shaft. Most of the remaining gas energy becomes shaft work here rather than jet kinetic energy.', assembledX: -1.95, explodedX: -3.4 },
  { id: 'shaft', label: 'Dual Shaft', blurb: 'Co-rotating concentric spools: HP shaft inside the LP shaft. Counter-rotation variants trim gyroscopic loads.', assembledX: 0.2, explodedX: 0.2 },
  { id: 'core-nozzle', label: 'Core Exhaust Cone', blurb: 'The plug accelerates core flow and fills the exhaust annulus left by the LP turbine.', assembledX: -2.75, explodedX: -4.8 },
  { id: 'nozzle', label: 'Exhaust Nozzle', blurb: 'Convergent nozzle sets the exit area. On fighters a divergent petal section adds afterburner and thrust-vectoring options.', assembledX: -3.15, explodedX: -5.9 },
];

export interface TurbofanModelProps {
  explode: number;
  throttle: number;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const ALU = { color: '#b9c6d2', roughness: 0.28, metalness: 0.85 };
const DARKMETAL = { color: '#39424d', roughness: 0.4, metalness: 0.75 };

function BladeRing({
  count,
  radius,
  chord,
  color,
}: {
  count: number;
  radius: number;
  chord: number;
  color: string;
}) {
  const blades = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        return (
          <mesh key={i} position={[0, Math.sin(a) * radius, Math.cos(a) * radius]} rotation={[a, 0.5, 0]}>
            <boxGeometry args={[chord, radius * 0.55, 0.035]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
          </mesh>
        );
      }),
    [count, radius, chord, color],
  );
  return <>{blades}</>;
}

export default function TurbofanModel({ explode, throttle, selectedId, onSelect }: TurbofanModelProps) {
  const fan = useRef<THREE.Group>(null);
  const booster = useRef<THREE.Group>(null);
  const hpc = useRef<THREE.Group>(null);
  const hpt = useRef<THREE.Group>(null);
  const lpt = useRef<THREE.Group>(null);
  const throttleRef = useRef(throttle);
  throttleRef.current = throttle;
  const spin = useRef(0);

  useFrame((_, delta) => {
    spin.current += delta * (0.4 + throttleRef.current * 22);
    const slow = spin.current * 0.35;
    if (fan.current) fan.current.rotation.x = spin.current;
    if (booster.current) booster.current.rotation.x = spin.current;
    if (hpc.current) hpc.current.rotation.x = -slow * 1.4;
    if (hpt.current) hpt.current.rotation.x = -spin.current * 1.15;
    if (lpt.current) lpt.current.rotation.x = spin.current * 0.8;
  });

  const xOf = (part: EnginePartDef) =>
    THREE.MathUtils.lerp(part.assembledX, part.explodedX, THREE.MathUtils.clamp(explode, 0, 1));

  const nacelleDef = ENGINE_PARTS[0];
  const nacelleX = xOf(nacelleDef);
  const nacelleOpen = explode > 0.05;

  const partWrap = (id: string, position: [number, number, number], children: React.ReactNode) => {
    const selected = selectedId === id;
    return (
      <group
        key={id}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(selected ? null : id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        {children}
        {selected && <pointLight color="#67e8f9" intensity={5} distance={2.6} />}
      </group>
    );
  };

  return (
    <group rotation={[0, 0, 0]}>
      {partWrap(
        'nacelle',
        [nacelleX, 0, 0],
        <>
          {[1, -1].map((side) => (
            <mesh key={side} castShadow position={[0, side * (nacelleOpen ? 1.5 : 0), 0]} rotation={[side > 0 ? 0 : Math.PI, 0, 0]}>
              <cylinderGeometry args={[1.32, 1.22, 4.6, 36, 1, true, 0, Math.PI]} />
              <meshStandardMaterial {...ALU} color="#c4d0da" side={THREE.DoubleSide} transparent opacity={nacelleOpen ? 0.55 : 0.92} />
            </mesh>
          ))}
        </>,
      )}

      {partWrap(
        'fan',
        [xOf(ENGINE_PARTS[1]), 0, 0],
        <group ref={fan} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.28, 0.28, 0.3, 18]} />
            <meshStandardMaterial {...DARKMETAL} />
          </mesh>
          <BladeRing count={22} radius={0.95} chord={0.5} color="#dfe8ef" />
        </group>,
      )}

      {partWrap(
        'booster',
        [xOf(ENGINE_PARTS[2]), 0, 0],
        <group ref={booster} rotation={[0, 0, Math.PI / 2]}>
          {[0, 0.32, 0.64].map((dx, i) => (
            <group key={dx} position={[dx, 0, 0]}>
              <mesh>
                <cylinderGeometry args={[0.62 - i * 0.06, 0.62 - i * 0.06, 0.1, 20]} />
                <meshStandardMaterial {...ALU} />
              </mesh>
              <BladeRing count={16} radius={0.55 - i * 0.05} chord={0.2} color="#aebfd0" />
            </group>
          ))}
        </group>,
      )}

      {partWrap(
        'hpc',
        [xOf(ENGINE_PARTS[3]), 0, 0],
        <group ref={hpc} rotation={[0, 0, Math.PI / 2]}>
          {[0, 0.26, 0.52, 0.78].map((dx, i) => (
            <group key={dx} position={[dx, 0, 0]}>
              <mesh>
                <cylinderGeometry args={[0.5 - i * 0.07, 0.5 - i * 0.07, 0.08, 18]} />
                <meshStandardMaterial {...ALU} />
              </mesh>
              <BladeRing count={14} radius={0.44 - i * 0.07} chord={0.15} color="#9fb2c6" />
            </group>
          ))}
        </group>,
      )}

      {partWrap(
        'combustor',
        [xOf(ENGINE_PARTS[4]), 0, 0],
        <>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.52, 0.2, 14, 30]} />
            <meshStandardMaterial color="#5a4632" roughness={0.55} metalness={0.5} emissive="#ff6a20" emissiveIntensity={0.25 + throttle * 0.8} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.66, 0.66, 0.8, 24, 1, true]} />
            <meshStandardMaterial {...DARKMETAL} side={THREE.DoubleSide} transparent opacity={0.65} />
          </mesh>
          <pointLight color="#ff7a30" intensity={2 + throttle * 14} distance={4} />
        </>,
      )}

      {partWrap(
        'hpt',
        [xOf(ENGINE_PARTS[5]), 0, 0],
        <group ref={hpt} rotation={[0, 0, Math.PI / 2]}>
          {[0, 0.3].map((dx, i) => (
            <group key={dx} position={[dx, 0, 0]}>
              <mesh>
                <cylinderGeometry args={[0.46 - i * 0.04, 0.46 - i * 0.04, 0.1, 18]} />
                <meshStandardMaterial color="#c9a06a" roughness={0.35} metalness={0.85} />
              </mesh>
              <BladeRing count={15} radius={0.42 - i * 0.05} chord={0.16} color="#d9b57e" />
            </group>
          ))}
        </group>,
      )}

      {partWrap(
        'lpt',
        [xOf(ENGINE_PARTS[6]), 0, 0],
        <group ref={lpt} rotation={[0, 0, Math.PI / 2]}>
          {[0, 0.3, 0.6].map((dx, i) => (
            <group key={dx} position={[dx, 0, 0]}>
              <mesh>
                <cylinderGeometry args={[0.52 - i * 0.05, 0.52 - i * 0.05, 0.1, 18]} />
                <meshStandardMaterial color="#bfa98a" roughness={0.4} metalness={0.8} />
              </mesh>
              <BladeRing count={15} radius={0.5 - i * 0.06} chord={0.18} color="#cdb99b" />
            </group>
          ))}
        </group>,
      )}

      {partWrap(
        'shaft',
        [xOf(ENGINE_PARTS[7]), 0, 0],
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.13, 0.13, 4.4, 14]} />
          <meshStandardMaterial color="#8f9aa5" roughness={0.25} metalness={0.9} />
        </mesh>,
      )}

      {partWrap(
        'core-nozzle',
        [xOf(ENGINE_PARTS[8]), 0, 0],
        <mesh castShadow rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.34, 1.1, 20]} />
          <meshStandardMaterial {...DARKMETAL} />
        </mesh>,
      )}

      {partWrap(
        'nozzle',
        [xOf(ENGINE_PARTS[9]), 0, 0],
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.42, 0.7, 22, 1, true]} />
          <meshStandardMaterial color="#4a525c" roughness={0.35} metalness={0.8} side={THREE.DoubleSide} emissive="#ff5a1f" emissiveIntensity={throttle * 0.5} />
        </mesh>,
      )}
    </group>
  );
}
