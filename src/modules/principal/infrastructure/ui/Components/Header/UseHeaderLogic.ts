export const useHeaderLogic = () => {
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
    setScroll,
    openWhatsapp,
  };
};
