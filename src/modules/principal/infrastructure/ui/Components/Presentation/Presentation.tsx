//
// React dependencies
//
import React from 'react';

//
// Hooks
//
import {usePresentationLogic} from "./UsePresentationLogic.ts";

interface PresentationProps {
}

const Presentation: React.FC<PresentationProps> = () => {
    //
    // Hooks
    //
    const {pElement} = usePresentationLogic()

    return (
        <div
            className="w-full md:w-1/2 lg:w-1/2 ml-auto mr-auto  m-4 px-4 py-3 rounded-xl bg-white shadow-sm border">
            <div className="flex gap-1.5 text-lg items-center font-poppins font-medium text-primary">
                about_me.md
            </div>
            <div className="border-b-2 border-primary my-2"></div>
            <section ref={pElement} className="mt-2 font-poppins">
            </section>
        </div>
    )
}

export default Presentation;