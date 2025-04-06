//
// React dependencies
//
import React from 'react';

//
// Libraries
//
import { Carousel } from 'react-responsive-carousel';

//
// Components
//
import StackCarouselItem from '@principal/infrastructure/ui/Components/Stacks/StackCarousel/StackCarouselItem';

//
// Styles
//
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

//
// Models
//
import type { Item } from '@principal/models/Item';

interface StackCarouselProps {
  items: Item[];
}

const StackCarousel: React.FC<StackCarouselProps> = ({ items }) => {
  //
  // Computed
  //
  const getPercentage = (): number => {
    const width = window.innerWidth;

    if (width < 750) {
      return 100;
    }

    if (width < 1000) {
      return 50;
    }

    return 30;
  };

  return (
    <Carousel
      className={'w-full'}
      axis={'horizontal'}
      swipeable={true}
      autoPlay={false}
      showStatus={false}
      showThumbs={false}
      centerMode={true}
      centerSlidePercentage={getPercentage()}
      infiniteLoop={false}
      showIndicators={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            aria-label={label}
            onClick={onClickHandler}
            title={label}
            className={
              'absolute top-1/2 left-2 z-10 p-2 text-white bg-dark-secondary/80 rounded-full'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            aria-label={label}
            onClick={onClickHandler}
            title={label}
            className={
              'absolute top-1/2 right-2 z-10 p-2 text-white bg-dark-secondary/80 rounded-full'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )
      }
    >
      {items.map(item => (
        <StackCarouselItem item={item} key={`carousel-item-${item.title}`} />
      ))}
    </Carousel>
  );
};

export default StackCarousel;
