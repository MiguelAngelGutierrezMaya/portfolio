//
// React dependencies
//
import React from 'react';

//
// Hooks
//
import { useLoaderLogic } from '@principal/infrastructure/ui/Components/Technologies/TechnologyComponent/Loader/UseLoaderLogic';
import { Html } from '@react-three/drei';

// Use type Record<never, never> instead of empty interface
type LoaderProps = Record<never, never>;

const Loader: React.FC<LoaderProps> = () => {
  //
  // Hooks
  //
  const { progress } = useLoaderLogic();

  return (
    <Html>
      <span className="canvas-load" />
      <p
        style={{
          fontSize: 14,
          color: `#f1f1f1`,
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default Loader;
