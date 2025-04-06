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
import { useBackCarouselLogic } from '@principal/infrastructure/ui/Components/Stacks/StackCarousel/Back/UseBackCarouselLogic';

//
// Models
//
import { CarouselType } from '@principal/models/constants/CarouselType';

// Use type Record<never, never> instead of empty interface
type BackCarouselProps = Record<never, never>;

const BackCarousel: React.FC<BackCarouselProps> = () => {
  //
  // Hooks
  //
  const { items } = useBackCarouselLogic();

  return (
    <section id={CarouselType.BACK} className={'animate-fade-up w-full mt-6'}>
      <StackCarousel items={items} />
    </section>
  );
};

export default BackCarousel;
