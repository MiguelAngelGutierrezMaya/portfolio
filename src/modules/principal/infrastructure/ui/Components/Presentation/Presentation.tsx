//
// React dependencies
//
import React from 'react';

//
// Hooks
//
import { usePresentationLogic } from '@principal/infrastructure/ui/Components/Presentation/UsePresentationLogic';

//
// Styles
//
import '@principal/infrastructure/ui/Components/Presentation/Presentation.css';

// Use type Record<never, never> instead of empty interface
type PresentationProps = Record<never, never>;

const PUBLIC_STORAGE_URL = import.meta.env.PUBLIC_STORAGE_URL;

const Presentation: React.FC<PresentationProps> = () => {
  //
  // Hooks
  //
  const { about, title, fullTitle, keywords, isServerSide } = usePresentationLogic();

  return (
    <div id={'presentation'} className="w-full mt-6 mb-6 pl-6 pr-6">
      <div className="relative px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl lg:max-w-5xl">
          <div className="max-w-2xl">
            <div className={'flex flex-row gap-4 items-center'}>
              <figure className={'h-14 w-14 bg-white rounded-full'}>
                <img
                  className="inline-block h-full w-full rounded-full"
                  src={`${PUBLIC_STORAGE_URL}/header/imagen-perfil.avif`}
                  alt="Avatar image"
                />
              </figure>
              <h2 className={'font-bold text-4xl text-amber-300'}>MIGUEL GUTIERREZ</h2>
            </div>
            <h1
              id={'presentation-title'}
              className="heading mt-8 text-3xl font-bold tracking-tight sm:text-5xl text-zinc-100"
            >
              {isServerSide() ? (
                <>
                  <span aria-hidden="true">Full stack developer {keywords[0]}</span>
                  <span className="sronly">
                    , {keywords[1]} y {keywords[2]}
                  </span>
                </>
              ) : (
                <>
                  <span aria-hidden={'true'} className={'block'}>
                    Fullstack developer
                  </span>
                  <span aria-hidden="true">{title}</span>
                  <span className="sronly">{fullTitle}</span>
                </>
              )}
            </h1>
            <p className="mt-6 text-base text-zinc-400">{about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
