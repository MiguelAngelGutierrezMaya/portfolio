//
// React dependencies
//
import React from 'react';

const LazyLoader: React.FC = () => {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center">
      <div className="animate-pulse text-zinc-400">Loading...</div>
    </div>
  );
};

export default LazyLoader;
