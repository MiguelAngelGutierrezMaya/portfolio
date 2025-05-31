//
// React components
//
import React from 'react';
import PrimaryDataSection from '@privacy/infrastructure/ui/Components/Section/PrimaryDataSection';
import Header from '@privacy/infrastructure/ui/Components/Header/Header';

// Use type Record<never, never> instead of empty interface
type PrincipalProps = Record<never, never>;

const Principal: React.FC<PrincipalProps> = () => {
  return (
    <>
      <div className="bg-black fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full h-full max-w-7xl lg:px-8">
          <div className="w-full bg-zinc-900 ring-1 ring-zinc-100 ring-zinc-300/20 overflow-y-auto">
            <Header />
            <PrimaryDataSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Principal;
