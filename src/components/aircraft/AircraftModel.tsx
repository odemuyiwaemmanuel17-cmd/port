import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { AIRCRAFT_PARTS } from './parts';
import type { AircraftRigHandle } from './rig';

export interface ControlState {
  aileron: number;
  elevator: number;
  rudder: number;
  gear: number;
}

export interface AircraftModelProps {
  rig: AircraftRigHandle;
  interactive?: boolean;
  showHotspots?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
  controls?: ControlState;
}

const BODY = { color: '#8fa1b3', roughness: 0.38, metalness: 0.62 };
const DARK = { color: '#2c333c', roughness: 0.45, metalness: 0.55 };
const GLASS = { color: '#9fd4e8', roughness: 0.12, metalness: 0.6, transparent: true, opacity: 0.75 };

function usePartRef(id: string, rig: AircraftRigHandle) {
  const ref = useRef<THREE.Group>(null);
  useMemo(() => {
    rig.parts.set(id, ref);
    return ref;
  }, [id, rig]);
  return ref;
}

function Part({
  id,
  rig,
  interactive,
  selectedId,
  onSelect,
  children,
}: {
  id: string;
  rig: AircraftRigHandle;
  interactive?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
  children: React.ReactNode;
}) {
  const ref = usePartRef(id, rig);
  const selected = selectedId === id;
  return (
    <group
      ref={ref}
      onPointerOver={interactive ? (e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; } : undefined}
      onPointerOut={interactive ? () => { document.body.style.cursor = 'auto'; } : undefined}
      onClick={
        interactive
          ? (e) => {
              e.stopPropagation();
              onSelect?.(selected ? null : id);
            }
          : undefined
      }
    >
      <group scale={selected ? 1.0 : 1}>
        {children}
        {selected && (
          <pointLight color="#67e8f9" intensity={6} distance={3.2} position={[0, 0.6, 0]} />
        )}
      </group>
    </group>
  );
}

const metal = (props?: { color?: string; roughness?: number; metalness?: number }) => ({
  ...BODY,
  ...props,
});

export default function AircraftModel({
  rig,
  interactive,
  showHotspots,
  selectedId,
  onSelect,
  controls,
}: AircraftModelProps) {
  const aileronL = useRef<THREE.Mesh>(null);
  const aileronR = useRef<THREE.Mesh>(null);
  const stabL = useRef<THREE.Group>(null);
  const stabR = useRef<THREE.Group>(null);
  const rudderL = useRef<THREE.Mesh>(null);
  const rudderR = useRef<THREE.Mesh>(null);
  const gearNose = useRef<THREE.Group>(null);
  const gearMainL = useRef<THREE.Group>(null);
  const gearMainR = useRef<THREE.Group>(null);

  rig.surfaces = { aileronL, aileronR, stabL, stabR, rudderL, rudderR, gearNose, gearMainL, gearMainR };

  const transforms = useMemo(
    () =>
      AIRCRAFT_PARTS.map((part) => ({
        id: part.id,
        a: new THREE.Vector3(...part.assembled.position),
        e: new THREE.Vector3(...part.exploded.position),
        rot: part.assembled.rotation,
      })),
    [],
  );

  useFrame((_, delta) => {
    const target = rig.assemblyTarget;
    rig.assembly += (target - rig.assembly) * Math.min(1, delta * 6);
    const t = THREE.MathUtils.clamp(rig.assembly, 0, 1);
    rig.parts.forEach((partRef, id) => {
      const tf = transforms.find((p) => p.id === id);
      if (!tf || !partRef.current) return;
      partRef.current.position.lerpVectors(tf.a, tf.e, t);
      partRef.current.rotation.set(tf.rot[0], tf.rot[1], tf.rot[2]);
    });
    if (controls) {
      const rad = THREE.MathUtils.degToRad;
      if (aileronL.current) aileronL.current.rotation.x = rad(controls.aileron);
      if (aileronR.current) aileronR.current.rotation.x = rad(-controls.aileron);
      if (stabL.current) stabL.current.rotation.x = rad(controls.elevator);
      if (stabR.current) stabR.current.rotation.x = rad(controls.elevator);
      if (rudderL.current) rudderL.current.rotation.y = rad(controls.rudder);
      if (rudderR.current) rudderR.current.rotation.y = rad(controls.rudder);
      const retract = THREE.MathUtils.clamp(1 - controls.gear, 0, 1);
      if (gearNose.current) {
        gearNose.current.rotation.x = retract * 1.35;
        gearNose.current.position.y = -0.72 + retract * 0.55;
      }
      if (gearMainL.current) {
        gearMainL.current.rotation.x = retract * 1.35;
        gearMainL.current.position.y = -0.62 + retract * 0.42;
      }
      if (gearMainR.current) {
        gearMainR.current.rotation.x = retract * 1.35;
        gearMainR.current.position.y = -0.62 + retract * 0.42;
      }
    }
  });

  return (
    <group>
      <Part id="fuselage" rig={rig} interactive={interactive} selectedId={selectedId} onSelect={onSelect}>
        <mesh castShadow>
          <boxGeometry args={[6.4, 0.95, 1.15]} />
          <meshStandardMaterial {...metal()} />
        </mesh>
        <mesh castShadow position={[-0.4, 0.18, 0]}>
          <boxGeometry args={[5.2, 0.62, 1.5]} />
          <meshStandardMaterial {...metal({ color: '#7d8fa1' })} />
        </mesh>
      </Part>

      <Part id="nose" rig={rig} interactive={interactive} selectedId={selectedId} onSelect={onSelect}>
        <mesh castShadow rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.46, 1.7, 20]} />
          <meshStandardMaterial {...metal({ color: '#5d6b7a' })} />
        </mesh>
      </Part>

      <Part id="canopy" rig={rig} interactive={interactive} selectedId={selectedId} onSelect={onSelect}>
        <mesh scale={[1.7, 0.62, 0.62]}>
          <sphereGeometry args={[0.62, 24, 16]} />
          <meshStandardMaterial {...GLASS} />
        </mesh>
      </Part>

      {(['left', 'right'] as const).map((side) => {
        const z = side === 'left' ? 1 : -1;
        return (
          <Part key={side} id={`wing-${side}`} rig={rig} interactive={interactive} selectedId={selectedId} onSelect={onSelect}>
            <mesh castShadow position={[0, 0, z * 0.75]}>
              <boxGeometry args={[2.6, 0.14, 2.6]} />
              <meshStandardMaterial {...metal({ color: '#8496a8' })} />
            </mesh>
            <mesh ref={side === 'left' ? aileronL : aileronR} position={[-1.5, 0, z * 1.55]}>
              <boxGeometry args={[0.5, 0.1, 1.6]} />
              <meshStandardMaterial {...metal(DARK)} />
            </mesh>
          </Part>
        );
      })}

      {(['left', 'right'] as const).map((side) => {
        const z = side === 'left' ? 1 : -1;
        return (
          <group key={`intake-${side}`}>
            <Part id={`intake-${side}`} rig={rig} interactive={interactive} selectedId={selectedId} onSelect={onSelect}>
              <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.42, 0.5, 1.5, 18]} />
                <meshStandardMaterial {...metal({ color: '#6d7d8d' })} />
              </mesh>
            </Part>
            <Part id={`engine-${side}`} rig={rig} interactive={interactive} selectedId={selectedId} onSelect={onSelect}>
              <mesh castShadow>
                <cylinderGeometry args={[0.44, 0.44, 3.4, 22]} />
                <meshStandardMaterial {...metal(DARK)} />
              </mesh>
              <mesh position={[0, 0.44, 0]}>
                <boxGeometry args={[1.2, 0.14, 0.5]} />
                <meshStandardMaterial color="#454f5a" roughness={0.5} metalness={0.5} />
              </mesh>
            </Part>
            <Part id={`nozzle-${side}`} rig={rig} interactive={interactive} selectedId={selectedId} onSelect={onSelect}>
              <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.44, 1.0, 18]} />
                <meshStandardMaterial {...metal({ color: '#3a424c' })} emissive="#ff7a30" emissiveIntensity={0.12} />
              </mesh>
            </Part>
            <Part id={`fin-${side}`} rig={rig} interactive={interactive} selectedId={selectedId} onSelect={onSelect}>
              <mesh castShadow position={[0, 0.55, 0]}>
                <boxGeometry args={[1.35, 1.15, 0.12]} />
                <meshStandardMaterial {...metal({ color: '#7d8fa1' })} />
              </mesh>
              <mesh ref={side === 'left' ? rudderL : rudderR} position={[-0.72, 0.55, 0.08]}>
                <boxGeometry args={[0.42, 0.95, 0.09]} />
                <meshStandardMaterial {...metal(DARK)} />
              </mesh>
            </Part>
            <Part
              id={`stabilator-${side}`}
              rig={rig}
              interactive={interactive}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              <group ref={side === 'left' ? stabL : stabR}>
                <mesh castShadow position={[0, 0, z * 0.55]}>
                  <boxGeometry args={[1.5, 0.1, 1.5]} />
                  <meshStandardMaterial {...metal({ color: '#8496a8' })} />
                </mesh>
              </group>
            </Part>
          </group>
        );
      })}

      <Part id="gear" rig={rig} interactive={interactive} selectedId={selectedId} onSelect={onSelect}>
        <group ref={gearNose} position={[2.3, -0.72, 0]}>
          <mesh>
            <cylinderGeometry args={[0.06, 0.06, 0.75, 10]} />
            <meshStandardMaterial {...metal({ color: '#b8c4ce' })} />
          </mesh>
          <mesh position={[0, -0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.17, 0.17, 0.14, 16]} />
            <meshStandardMaterial color="#14181d" roughness={0.9} />
          </mesh>
        </group>
        <group ref={gearMainL} position={[0.1, -0.62, 1.05]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.07, 0.8, 10]} />
            <meshStandardMaterial {...metal({ color: '#b8c4ce' })} />
          </mesh>
          <mesh position={[0, -0.46, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.21, 0.21, 0.18, 16]} />
            <meshStandardMaterial color="#14181d" roughness={0.9} />
          </mesh>
        </group>
        <group ref={gearMainR} position={[0.1, -0.62, -1.05]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.07, 0.8, 10]} />
            <meshStandardMaterial {...metal({ color: '#b8c4ce' })} />
          </mesh>
          <mesh position={[0, -0.46, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.21, 0.21, 0.18, 16]} />
            <meshStandardMaterial color="#14181d" roughness={0.9} />
          </mesh>
        </group>
      </Part>

      {showHotspots &&
        AIRCRAFT_PARTS.map((part) => (
          <group key={`hot-${part.id}`} position={part.hotspot}>
            <Html center zIndexRange={[20, 0]} className="pointer-events-none">
              <button
                type="button"
                aria-label={`Inspect ${part.label}`}
                className={`hotspot-dot ${selectedId === part.id ? 'is-active' : ''}`}
                style={{ pointerEvents: 'auto' }}
                onClick={() => onSelect?.(selectedId === part.id ? null : part.id)}
              />
            </Html>
          </group>
        ))}
    </group>
  );
}
