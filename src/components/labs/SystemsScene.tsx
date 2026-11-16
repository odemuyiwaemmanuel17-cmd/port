import { OrbitControls, ContactShadows } from '@react-three/drei';
import { orbitProps } from '../../lib/threeControls';
import AircraftModel from '../aircraft/AircraftModel';
import type { AircraftRigHandle } from '../aircraft/rig';
import type { ControlState } from './SystemsLab';

export interface SystemsSceneProps {
  rig: AircraftRigHandle;
  controls: ControlState;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function SystemsScene({ rig, controls, selectedId, onSelect }: SystemsSceneProps) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#3a4c66', '#0d1218', 0.7]} />
      <directionalLight position={[7, 10, 6]} intensity={1.25} color="#eaf4ff" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-8, 4, -7]} color="#67e8f9" intensity={7} distance={22} decay={2} />
      <AircraftModel
        rig={rig}
        interactive
        showHotspots={false}
        selectedId={selectedId}
        onSelect={onSelect}
        controls={controls}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.32, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0a0f15" roughness={0.92} metalness={0.1} />
      </mesh>
      <ContactShadows position={[0, -1.3, 0]} scale={15} blur={2.3} opacity={0.5} far={4} resolution={512} color="#000000" />
      <OrbitControls
        {...orbitProps}
        minDistance={5}
        maxDistance={16}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.5}
        target={[0, 0.2, 0]}
      />
    </>
  );
}
