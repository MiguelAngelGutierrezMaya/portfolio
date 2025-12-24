//
// React components
//
import React, { Suspense, lazy } from 'react';

//
// Styles
//
import '@principal/infrastructure/ui/Principal/Principal.css';
import 'react-toastify/dist/ReactToastify.css';

//
// Components
//
import Header from '@/modules/principal/infrastructure/ui/Components/Header/Header';
import Presentation from '@principal/infrastructure/ui/Components/Presentation/Presentation';
import Contact from '@principal/infrastructure/ui/Components/Contact/Contact';
import { ToastContainer } from 'react-toastify';

// Lazy load heavy components
const Stacks = lazy(() => import('@principal/infrastructure/ui/Components/Stacks/Stacks'));
const Technologies = lazy(
  () => import('@principal/infrastructure/ui/Components/Technologies/Technologies')
);
const Experiences = lazy(
  () => import('@principal/infrastructure/ui/Components/Experiences/Experiences')
);
const Tools = lazy(() => import('@principal/infrastructure/ui/Components/Tools/Tools'));

// Use type Record<never, never> instead of empty interface
type PrincipalProps = Record<never, never>;

const Principal: React.FC<PrincipalProps> = () => {
  return (
    <>
      <div className="bg-black fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full h-full max-w-7xl lg:px-8">
          <div className="w-full bg-zinc-900 ring-1 ring-zinc-100 ring-zinc-300/20 overflow-y-auto">
            <Header />
            <Presentation />
            <Suspense fallback={<div className="w-full min-h-[200px]" />}>
              <Stacks />
            </Suspense>
            <Suspense fallback={<div className="w-full min-h-[400px]" />}>
              <Technologies />
            </Suspense>
            <Suspense fallback={<div className="w-full min-h-[300px]" />}>
              <Experiences />
            </Suspense>
            <Suspense fallback={<div className="w-full min-h-[100px]" />}>
              <Tools />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Principal;
