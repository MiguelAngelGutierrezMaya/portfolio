//
// React dependencies
//
import React from 'react';

//
// Components
//
import MainImage from '@shared/infrastructure/ui/Components/MainImage/MainImage';
import IconGroup from '@shared/infrastructure/ui/Components/Icon/IconGroup';

const Header: React.FC = () => {
  return (
    <header className="w-full h-40 md:h-32 lg:h-32 bg-dark-secondary px-4 py-4 flex flex-col md:flex-row lg:flex-row items-center gap-2">
      <MainImage />

      <IconGroup />

      <div className={'md:ml-auto lg:ml-auto flex flex-row gap-4'}>
        <a className={'font-poppins cursor-pointer text-white hover:text-white/90'} href="/">
          Principal
        </a>
      </div>
    </header>
  );
};

export default Header;
