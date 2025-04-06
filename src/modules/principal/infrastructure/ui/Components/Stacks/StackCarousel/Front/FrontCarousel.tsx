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
import { useFrontCarouselLogic } from '@principal/infrastructure/ui/Components/Stacks/StackCarousel/Front/UseFrontCarouselLogic';

//
// Models
//
import { CarouselType } from '@principal/models/constants/CarouselType';

// Use type Record<never, never> instead of empty interface
type FrontCarouselProps = Record<never, never>;

const FrontCarousel: React.FC<FrontCarouselProps> = () => {
  //
  // Hooks
  //
  const { items } = useFrontCarouselLogic();

  return (
    <section id={CarouselType.FRONT} className={'animate-fade-up w-full mt-6'}>
      <StackCarousel items={items} />
    </section>
  );
};

export default FrontCarousel;
