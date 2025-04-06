export const useHeaderLogic = () => {
  //
  // Constants
  //
  const links = [
    {
      name: 'Twitter',
      url: 'https://x.com/MiguelA20878385',
      icon: 'twitter',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/MiguelAngelGutierrezMaya',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/miguel-gutierrez-maya-918461164/',
      icon: 'linkedin',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/gutierrezmayamiguelangel/',
      icon: 'instagram',
    },
  ];

  //
  // Methods
  //
  const setScroll = (element: string): void => {
    const elementDOM = document.getElementById(element);
    if (elementDOM) {
      elementDOM.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsapp = () => {
    window.open('https://wa.me/573113230033', '_blank');
  };

  return {
    links,
    setScroll,
    openWhatsapp,
  };
};
