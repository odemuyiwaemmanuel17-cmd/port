import { useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';

export interface SurfaceRefs {
  aileronL: MutableRefObject<THREE.Mesh | null>;
  aileronR: MutableRefObject<THREE.Mesh | null>;
  stabL: MutableRefObject<THREE.Group | null>;
  stabR: MutableRefObject<THREE.Group | null>;
  rudderL: MutableRefObject<THREE.Mesh | null>;
  rudderR: MutableRefObject<THREE.Mesh | null>;
  gearNose: MutableRefObject<THREE.Group | null>;
  gearMainL: MutableRefObject<THREE.Group | null>;
  gearMainR: MutableRefObject<THREE.Group | null>;
}

/**
 * Shared mutable rig: the scroll driver writes `assemblyTarget`, the render
 * loop eases toward it and writes part transforms. React never re-renders
 * during scroll, so there is no drift and no competing handlers.
 */
export interface AircraftRigHandle {
  assembly: number;
  assemblyTarget: number;
  parts: Map<string, MutableRefObject<THREE.Group | null>>;
  surfaces: SurfaceRefs | null;
}

export function createAircraftRig(): AircraftRigHandle {
  return {
    assembly: 0,
    assemblyTarget: 0,
    parts: new Map(),
    surfaces: null,
  };
}

export function useAircraftRig(): AircraftRigHandle {
  const rig = useRef<AircraftRigHandle>(createAircraftRig());
  return rig.current;
}
