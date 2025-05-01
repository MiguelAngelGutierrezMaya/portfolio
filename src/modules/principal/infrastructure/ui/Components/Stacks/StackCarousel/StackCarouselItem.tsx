//
// React dependencies
//
import React from 'react';

//
// Models
//
import type { Item } from '@principal/models/Item';
import { FaGithub } from 'react-icons/fa6';

//
// Components
//
import LazyImage from '@principal/infrastructure/ui/Components/shared/LazyImage';

interface StackCarouselItemProps {
  item: Item;
}

const StackCarouselItem: React.FC<StackCarouselItemProps> = ({ item }) => {
  //
  // Computed
  //
  const getColor = (index: number): string => {
    const colors = [
      'text-green-400',
      'text-red-400',
      'text-blue-400',
      'text-yellow-400',
      'text-indigo-400',
      'text-purple-400',
      'text-pink-400',
    ];

    return colors[index % colors.length];
  };

  return (
    <div className={'flex flex-col gap-4 p-4 ml-2 mr-2 rounded-2xl bg-dark-secondary'}>
      <section className={'relative w-full h-[230px] mb-4'}>
        <LazyImage
          src={item.image}
          alt={item.title}
          className={'w-full h-full object-cover rounded-2xl shadow'}
        />
        {item.githubLink && (
          <button
            aria-label={'Github link' + item.title}
            onClick={() => window.open(item.githubLink, '_blank')}
            className={
              'cursor-pointer absolute top-1 right-1 p-2 rounded-full bg-dark-secondary/80'
            }
          >
            <FaGithub className={'text-white'} size={20} />
          </button>
        )}
      </section>
      <h2 className={'font-semibold text-start text-white text-2xl'}>{item.title}</h2>
      <span className={'text-white text-start text-base'}>{item.description}</span>
      <section className={'flex flex-row gap-1 flex-wrap'}>
        {item.technologies.map((technology, index) => (
          <span key={`${item.title}-${technology}`} className={`${getColor(index)} text-sm`}>
            #{technology}
          </span>
        ))}
      </section>
    </div>
  );
};

export default StackCarouselItem;
