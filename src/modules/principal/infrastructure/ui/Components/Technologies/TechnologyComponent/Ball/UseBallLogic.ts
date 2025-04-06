//
// Hooks
//
import { useTexture } from '@react-three/drei';

export const useBallLogic = (url: string) => {
  //
  // Hooks
  //
  const [decal] = useTexture([url]);

  return {
    decal,
  };
};
