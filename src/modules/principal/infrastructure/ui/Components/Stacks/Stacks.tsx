//
// React dependencies
//
import React from 'react';

//
// Components
//
import { FaCodepen, FaLaptopCode, FaMobile } from 'react-icons/fa6';
import Element from '@principal/infrastructure/ui/Components/Stacks/Element';
import FrontCarousel from '@principal/infrastructure/ui/Components/Stacks/StackCarousel/Front/FrontCarousel';
import BackCarousel from '@principal/infrastructure/ui/Components/Stacks/StackCarousel/Back/BackCarousel';
import MobileCarousel from '@principal/infrastructure/ui/Components/Stacks/StackCarousel/Mobile/MobileCarousel';

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
      return <FrontCarousel />;
    }
    if (stackSelected === CarouselType.BACK) {
      return <BackCarousel />;
    }
    if (stackSelected === CarouselType.MOBILE) {
      return <MobileCarousel />;
    }

    return <></>;
  };

  return (
    <div className="mt-16 w-full sm:mt-20 pl-8 pr-8">
      <div className="flex flex-col h-full justify-center gap-4 px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl py-4 font-bold">Stacks</h2>
        <div className="flex flex-row flex-wrap">
          <ul className="flex flex-wrap gap-2">
            <Element
              className={'cursor-pointer group relative'}
              title={'Frontend developer'}
              icon={<FaCodepen className="text-white h-8 w-8" />}
              onClick={() => setCarousel(CarouselType.FRONT)}
            />
            <Element
              className={'cursor-pointer group relative'}
              title={'Backend developer'}
              icon={<FaLaptopCode className="text-white h-8 w-8" />}
              onClick={() => setCarousel(CarouselType.BACK)}
            />
            <Element
              className={'cursor-pointer group relative'}
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
