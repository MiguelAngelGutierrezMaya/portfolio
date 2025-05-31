//
// React dependencies
//
import { useState } from 'react';

export const useSectionLinkWithPopoverLogic = () => {
  //
  // Hooks
  //
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    setIsOpen,
  };
};
