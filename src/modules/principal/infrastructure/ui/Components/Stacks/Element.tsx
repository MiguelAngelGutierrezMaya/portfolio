//
// React dependencies
//
import React from 'react';

//
// Components
//
import { Tilt } from 'react-tilt';

interface ElementProps {
  title: string;
  className?: string;
  icon: React.JSX.Element;
  onClick?: () => void;
}

const Element: React.FC<ElementProps> = ({ title, className, icon, onClick }) => {
  return (
    <li className={className} onClick={onClick}>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl bg-zinc-800/50" />
      <Tilt
        className={
          'w-full h-full flex flex-col items-center justify-center border border-white/90 px-4 py-10 rounded-lg'
        }
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
      >
        <div className="relative ml-auto mr-auto z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-zinc-900/5 border border-zinc-700/50 bg-zinc-800 ring-0">
          {icon}
        </div>
        <h2 className="mt-6 text-base font-semibold text-zinc-100">
          <span className="relative z-10">{title}</span>
        </h2>
      </Tilt>
    </li>
  );
};

export default Element;
