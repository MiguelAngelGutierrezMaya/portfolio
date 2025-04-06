//
// React dependencies
//
import React from 'react';

//
// Components
//
import StackCarousel from '@principal/infrastructure/ui/Components/Stacks/StackCarousel/StackCarousel';

//
// Hooks
//
import { useMobileCarouselLogic } from '@principal/infrastructure/ui/Components/Stacks/StackCarousel/Mobile/UseMobileCarouselLogic';

//
// Models
//
import { CarouselType } from '@principal/models/constants/CarouselType';

// Use type Record<never, never> instead of empty interface
type MobileCarouselProps = Record<never, never>;

const MobileCarousel: React.FC<MobileCarouselProps> = () => {
  //
  // Hooks
  //
  const { items } = useMobileCarouselLogic();

  return (
    <section id={CarouselType.MOBILE} className={'animate-fade-up w-full mt-6'}>
      <StackCarousel items={items} />
    </section>
  );
};

export default MobileCarousel;
