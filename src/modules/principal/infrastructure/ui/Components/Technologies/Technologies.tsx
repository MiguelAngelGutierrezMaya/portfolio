//
// React dependencies
//
import React from 'react';

//
// Hooks
//
import { useTechnologiesLogic } from '@principal/infrastructure/ui/Components/Technologies/UseTechnologiesLogic';
import type { Technology } from '@principal/models/Technology';
import TechnologyComponent from '@principal/infrastructure/ui/Components/Technologies/TechnologyComponent/Technology';

// Use type Record<never, never> instead of empty interface
type TechnologiesProps = Record<never, never>;

const Technologies: React.FC<TechnologiesProps> = () => {
  //
  // Hooks
  //
  const { technologies, isIntersecting, divRef } = useTechnologiesLogic();

  return (
    <div className="w-full mt-16 sm:mt-20 pl-6 pr-6">
      <div className="relative px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl lg:max-w-5xl">
          <div className="max-w-2xl">
            <h2 className={'text-3xl font-semibold tracking-tight text-zinc-100'}>Hard Skills</h2>
            <div
              ref={divRef}
              className={`${isIntersecting && technologies.length > 0 ? 'animate-fade-right animate-ease-in' : ''} mt-2 flex flex-row flex-wrap w-full`}
            >
              {isIntersecting &&
                technologies.length > 0 &&
                technologies.map((el: Technology) => (
                  <TechnologyComponent item={el} key={el.name} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
