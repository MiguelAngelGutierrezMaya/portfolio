//
// React dependencies
//
import React, { Suspense } from 'react';

//
// Components
//
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

//
// Models
//
import type { Technology } from '@principal/models/Technology';
import Loader from '@principal/infrastructure/ui/Components/Technologies/TechnologyComponent/Loader/Loader';
import Ball from '@principal/infrastructure/ui/Components/Technologies/TechnologyComponent/Ball/Ball';

interface TechnologyComponentProps {
  item: Technology;
}

const TechnologyComponent: React.FC<TechnologyComponentProps> = ({ item }) => {
  return (
    <section className={'w-28 h-28'}>
      <Canvas frameloop="demand" dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
        <Suspense fallback={<Loader />}>
          <OrbitControls enableZoom={false} />
          <Ball img={item.icon} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default TechnologyComponent;
