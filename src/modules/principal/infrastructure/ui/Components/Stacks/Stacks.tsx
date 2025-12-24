//
// React dependencies
//
import React, { Suspense, lazy } from 'react';

//
// Components
//
import { FaCodepen, FaLaptopCode, FaMobile } from 'react-icons/fa6';
import Element from '@principal/infrastructure/ui/Components/Stacks/Element';

// Lazy load carousels (they include react-responsive-carousel)
const FrontCarousel = lazy(
  () => import('@principal/infrastructure/ui/Components/Stacks/StackCarousel/Front/FrontCarousel')
);
const BackCarousel = lazy(
  () => import('@principal/infrastructure/ui/Components/Stacks/StackCarousel/Back/BackCarousel')
);
const MobileCarousel = lazy(
  () => import('@principal/infrastructure/ui/Components/Stacks/StackCarousel/Mobile/MobileCarousel')
);

//
// Hooks
//
import { useStacksLogic } from '@principal/infrastructure/ui/Components/Stacks/UseStacksLogic';

//
// Models
//
import { CarouselType } from '@principal/models/constants/CarouselType';

// Use type Record<never, never> instead of empty interface
type StacksProps = Record<never, never>;

const Stacks: React.FC<StacksProps> = () => {
  //
  // Hooks
  //
  const { stackSelected, setCarousel } = useStacksLogic();

  //
  // Computed
  //
  const stackSelectedComputed = (): React.JSX.Element => {
    if (stackSelected === CarouselType.FRONT) {
      return (
        <Suspense fallback={<div className="w-full min-h-[400px]" />}>
          <FrontCarousel />
        </Suspense>
      );
    }
    if (stackSelected === CarouselType.BACK) {
      return (
        <Suspense fallback={<div className="w-full min-h-[400px]" />}>
          <BackCarousel />
        </Suspense>
      );
    }
    if (stackSelected === CarouselType.MOBILE) {
      return (
        <Suspense fallback={<div className="w-full min-h-[400px]" />}>
          <MobileCarousel />
        </Suspense>
      );
    }

    return <></>;
  };

  return (
    <div className="mt-16 w-full sm:mt-20 pl-8 pr-8">
      <div className="flex flex-col h-full justify-center gap-4 px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl py-4 font-bold text-white">Stacks</h2>
        <div className="flex flex-row flex-wrap">
          <ul className="flex flex-wrap gap-2">
            <Element
              className={'cursor-pointer group relative w-[250px]'}
              title={'Frontend developer'}
              icon={<FaCodepen className="text-white h-8 w-8" />}
              onClick={() => setCarousel(CarouselType.FRONT)}
            />
            <Element
              className={'cursor-pointer group relative w-[250px]'}
              title={'Backend developer'}
              icon={<FaLaptopCode className="text-white h-8 w-8" />}
              onClick={() => setCarousel(CarouselType.BACK)}
            />
            <Element
              className={'cursor-pointer group relative w-[250px]'}
              title={'Mobile developer'}
              icon={<FaMobile className="text-white h-8 w-8" />}
              onClick={() => setCarousel(CarouselType.MOBILE)}
            />
          </ul>
        </div>

        {stackSelectedComputed()}
      </div>
    </div>
  );
};

export default Stacks;
