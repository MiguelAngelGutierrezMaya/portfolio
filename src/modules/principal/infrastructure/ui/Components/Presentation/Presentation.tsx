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

const PUBLIC_FIREBASE_URL = import.meta.env.PUBLIC_FIREBASE_URL;

const Presentation: React.FC<PresentationProps> = () => {
    //
    // Hooks
    //
    const {pElement} = usePresentationLogic()

    return (
        <div id={'presentation'}
            className="w-full mt-6 mb-6 pl-6 pr-6">
            <div className="relative px-4 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-2xl lg:max-w-5xl">
                    <div className="max-w-2xl">
                        <img
                            className="inline-block h-14 w-14 rounded-full"
                            src={`${PUBLIC_FIREBASE_URL}/imagen-perfil.avif?alt=media&token=11cecd35-452c-4563-a7ba-6aab44b4cf41`}
                            alt="Avatar image"
                        />
                        <h1
                            id={'presentation-title'}
                            className="mt-8 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                            Front end developer, Backend developer and Mobile developer
                        </h1>
                        <p ref={pElement} className="mt-6 text-base text-zinc-600 dark:text-zinc-400"></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presentation;