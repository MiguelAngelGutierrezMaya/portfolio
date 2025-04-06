//
// React dependencies
//
import { useState } from 'react';

//
// Models
//
import { CarouselType, type CarouselTypeData } from '@principal/models/constants/CarouselType';

export const useStacksLogic = () => {
  //
  // Hooks
  //
  const [stackSelected, setStackSelected] = useState<CarouselTypeData>(CarouselType.FRONT);

  //
  // Methods
  //
  const setCarousel = (element: CarouselTypeData): void => {
    setStackSelected(element);

    setTimeout(() => {
      const elementDOM = document.getElementById(element);
      if (elementDOM) {
        elementDOM.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  return {
    stackSelected,
    setCarousel,
  };
};
