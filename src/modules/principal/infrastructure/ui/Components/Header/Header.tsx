//
// React dependencies
//
import React from 'react';

//
// Components
//
import Icon from '@principal/infrastructure/ui/Components/Icon/Icon';
import SectionLink from '@principal/infrastructure/ui/Components/SectionLink/SectionLink';
import SectionLinkWithPopover from '@principal/infrastructure/ui/Components/SectionLink/SectionLinkWithPopover';

//
// Hooks
//
import { useHeaderLogic } from '@principal/infrastructure/ui/Components/Header/UseHeaderLogic';

// Use type Record<never, never> instead of empty interface
type HeaderProps = Record<never, never>;

const PUBLIC_STORAGE_URL = import.meta.env.PUBLIC_STORAGE_URL;

const Header: React.FC<HeaderProps> = () => {
  //
  // Hooks
  //
  const { links, setScroll, openWhatsapp } = useHeaderLogic();

  return (
    <header className="w-full h-48 md:h-32 lg:h-32 bg-dark-secondary px-4 py-4 flex flex-col md:flex-row lg:flex-row items-center gap-2">
      <figure className={'w-14 h-14'}>
        <img
          src={`${PUBLIC_STORAGE_URL}/header/logo.webp`}
          alt="Miguel Gutierrez"
          className="animate-fade w-full h-full object-contain rounded-sm shadow"
        />
      </figure>

      <section className={'md:ml-4 lg:ml-4 flex flex-col items-center gap-2'}>
        <div className={'flex flex-row items-center gap-2'}>
          {links.map(link => (
            <Icon key={link.name} icon={link.icon} url={link.url} />
          ))}
        </div>
      </section>

      <div className={'md:ml-auto lg:ml-auto flex flex-row gap-4'}>
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
      </div>
    </header>
  );
};

export default Header;
