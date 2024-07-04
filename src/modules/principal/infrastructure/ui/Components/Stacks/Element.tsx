//
// React dependencies
//
import React from 'react';

//
// Components
//
import Atropos from "atropos/react";

interface ElementProps {
    title: string;
    icon: React.JSX.Element;
}

const Element: React.FC<ElementProps> = ({title, icon}) => {
    return (
        <li className="group relative">
            <div
                className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"></div>
            <Atropos
                className={'w-full h-full flex flex-col items-center justify-center border border-white/90 px-4 py-10 rounded-lg'}
                activeOffset={40}
                shadowScale={1.05}>
                <div
                    data-atropos-offset="-15"
                    className="relative ml-auto mr-auto z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                    {icon}
                </div>
                <h2 data-atropos-offset="15" className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    <span className="relative z-10">{title}</span>
                </h2>
            </Atropos>
        </li>
    )
}

export default Element;