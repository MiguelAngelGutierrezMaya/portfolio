//
// React dependencies
//
import React from 'react';

//
// Components
//
import { Decal, Float } from '@react-three/drei';

//
// Hooks
//
import { useBallLogic } from '@principal/infrastructure/ui/Components/Technologies/TechnologyComponent/Ball/UseBallLogic';

interface BallProps {
  img: ImageMetadata;
}

const Ball: React.FC<BallProps> = ({ img }) => {
  //
  // Hooks
  //
  const { decal } = useBallLogic(img.src);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#b81d33" polygonOffset polygonOffsetFactor={-5} flatShading />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1} map={decal} />
      </mesh>
    </Float>
  );
};

export default Ball;
