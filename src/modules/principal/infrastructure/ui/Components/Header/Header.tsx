//
// React dependencies
//
import React from 'react';

//
// Components
//
import SectionLink from '@shared/infrastructure/ui/Components/SectionLink/SectionLink';
import SectionLinkWithPopover from '@shared/infrastructure/ui/Components/SectionLink/SectionLinkWithPopover';
import IconGroup from '@shared/infrastructure/ui/Components/Icon/IconGroup';
import MainImage from '@shared/infrastructure/ui/Components/MainImage/MainImage';

//
// Hooks
//
import { useHeaderLogic } from '@principal/infrastructure/ui/Components/Header/UseHeaderLogic';
import { navigate } from 'astro:transitions/client';

// Use type Record<never, never> instead of empty interface
type HeaderProps = Record<never, never>;

const Header: React.FC<HeaderProps> = () => {
  //
  // Hooks
  //
  const { setScroll, openWhatsapp } = useHeaderLogic();

  return (
    <header className="w-full h-72 md:h-32 lg:h-32 bg-dark-secondary px-4 py-4 flex flex-col md:flex-row lg:flex-row items-center gap-2">
      <MainImage />

      <IconGroup />

      <div className={'md:ml-auto lg:ml-auto flex flex-col md:flex-row lg:flex-row gap-4'}>
        <SectionLink
          className={'text-white hover:text-white/90'}
          title={'About me'}
          onClick={() => setScroll('presentation-title')}
        />
        <SectionLink
          className={'text-white hover:text-white/90'}
          title={'Experiences'}
          onClick={() => setScroll('experiences-title')}
        />
        <SectionLinkWithPopover
          title={"Let's talk"}
          onClick={() => setScroll('contact')}
          onClickWhasapp={() => openWhatsapp()}
        />
        <SectionLink
          className={'text-white hover:text-white/90'}
          title={'Privacy Policy'}
          onClick={() => navigate('/privacy')}
        />
      </div>
    </header>
  );
};

export default Header;
