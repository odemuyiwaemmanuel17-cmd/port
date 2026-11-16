import { OrbitControls, ContactShadows } from '@react-three/drei';
import { orbitProps } from '../../lib/threeControls';
import TurbofanModel from './TurbofanModel';

export interface PropulsionSceneProps {
  explode: number;
  throttle: number;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function PropulsionScene({ explode, throttle, selectedId, onSelect }: PropulsionSceneProps) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <hemisphereLight args={['#3a4c66', '#0d1218', 0.7]} />
      <directionalLight position={[6, 9, 6]} intensity={1.2} color="#eaf4ff" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-8, 3, -6]} color="#67e8f9" intensity={8} distance={22} decay={2} />
      <group rotation={[0, 0.35, 0]} position={[0, 0.2, 0]}>
        <TurbofanModel explode={explode} throttle={throttle} selectedId={selectedId} onSelect={onSelect} />
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0a0f15" roughness={0.92} metalness={0.1} />
      </mesh>
      <ContactShadows position={[0, -1.5, 0]} scale={14} blur={2.2} opacity={0.5} far={4} resolution={512} color="#000000" />
      <OrbitControls
        {...orbitProps}
        minDistance={4.5}
        maxDistance={16}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.52}
        target={[0, 0.2, 0]}
      />
    </>
  );
}
