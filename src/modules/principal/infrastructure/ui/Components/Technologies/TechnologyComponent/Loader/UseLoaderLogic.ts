//
// Hooks
//
import { useProgress } from '@react-three/drei';

export const useLoaderLogic = () => {
  //
  // Hooks
  //
  const { progress } = useProgress();

  return {
    progress,
  };
};
