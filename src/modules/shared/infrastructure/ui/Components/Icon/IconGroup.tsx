//
// React dependencies
//
import React from 'react';

//
// Components
//
import Icon from '@/modules/shared/infrastructure/ui/Components/Icon/Icon';

//
// Hooks
//
import { useIconGroupLogic } from '@shared/infrastructure/ui/Components/Icon/UseIconGroupLogic';

const IconGroup: React.FC = () => {
  //
  // Hooks
  //
  const { links } = useIconGroupLogic();

  return (
    <section className={'md:ml-4 lg:ml-4 flex flex-col items-center gap-2'}>
      <div className={'flex flex-row items-center gap-2'}>
        {links.map(link => (
          <Icon key={link.name} icon={link.icon} url={link.url} />
        ))}
      </div>
    </section>
  );
};

export default IconGroup;
