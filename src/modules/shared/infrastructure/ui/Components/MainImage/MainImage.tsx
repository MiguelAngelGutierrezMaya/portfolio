//
// React dependencies
//
import React from 'react';

const PUBLIC_STORAGE_URL = import.meta.env.PUBLIC_STORAGE_URL;

const MainImage: React.FC = () => {
  return (
    <figure className={'w-14 h-14'}>
      <img
        src={`${PUBLIC_STORAGE_URL}/header/logo.webp`}
        alt="Miguel Gutierrez"
        className="animate-fade w-full h-full object-contain rounded-sm shadow"
      />
    </figure>
  );
};

export default MainImage;
