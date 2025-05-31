//
// React dependencies
//
import React, { type MouseEvent } from 'react';

interface SectionLinkProps {
  title: string;
  className?: string;
  onClick: () => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const SectionLink: React.FC<SectionLinkProps> = ({ title, onClick, className }) => {
  return (
    <button
      aria-label={title}
      className={classNames('font-poppins cursor-pointer', className || '')}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick();
      }}
    >
      {title}
    </button>
  );
};

export default SectionLink;
