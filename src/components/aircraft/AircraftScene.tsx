import { OrbitControls, ContactShadows } from '@react-three/drei';
import { orbitProps } from '../../lib/threeControls';
import AircraftModel from './AircraftModel';
import HangarBayEffects from './HangarBayEffects';
import type { AircraftRigHandle } from './rig';

export interface AircraftSceneProps {
  rig: AircraftRigHandle;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  showHotspots?: boolean;
}

export default function AircraftScene({
  rig,
  selectedId,
  onSelect,
  showHotspots = true,
}: AircraftSceneProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <hemisphereLight args={['#3a4c66', '#0d1218', 0.6]} />
      
      {/* Overhead Dramatic Lighting */}
      <directionalLight
        position={[8, 14, 6]}
        intensity={1.8}
        color="#eaf4ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />
      <pointLight position={[-9, 4, -8]} color="#67e8f9" intensity={8} distance={26} decay={2} />
      <pointLight position={[4, -2, -10]} color="#f59e0b" intensity={4} distance={20} decay={2} />

      {/* 3D Aircraft Model */}
      <AircraftModel
        rig={rig}
        interactive
        showHotspots={showHotspots}
        selectedId={selectedId}
        onSelect={onSelect}
      />

      {/* Reference B Hangar Bay Elements */}
      <HangarBayEffects />

      {/* Hangar Floor & Polar Laser Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.32, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0a0f15" roughness={0.88} metalness={0.2} />
      </mesh>
      <gridHelper args={[44, 44, '#1f3542', '#122029']} position={[0, -1.3, 0]} />
      <ContactShadows position={[0, -1.28, 0]} scale={16} blur={2.4} opacity={0.55} far={4} resolution={512} color="#000000" />

      <OrbitControls
        {...orbitProps}
        minDistance={5.5}
        maxDistance={24}
        minPolarAngle={Math.PI * 0.16}
        maxPolarAngle={Math.PI * 0.49}
        target={[0, 0.3, 0]}
      />
    </>
  );
}
