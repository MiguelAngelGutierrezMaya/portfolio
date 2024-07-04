//
// React components
//
import React from 'react';

//
// Styles
//
import './Principal.css';

//
// Components
//
import Header from "../Components/Header/Header.tsx";
import Presentation from "../Components/Presentation/Presentation.tsx";
import Stacks from "../Components/Stacks/Stacks.tsx";
import Experiences from "../Components/Experiences/Experiences.tsx";

interface PrincipalProps {
}

const PUBLIC_FIREBASE_URL = import.meta.env.PUBLIC_FIREBASE_URL;

const Principal: React.FC<PrincipalProps> = () => {
    return (
        <div className="bg-black fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full h-full max-w-7xl lg:px-8">
                <div className="w-full bg-zinc-900 ring-1 ring-zinc-100 dark:ring-zinc-300/20 overflow-y-auto">
                    <Header/>
                    <Presentation/>
                    <Stacks/>
                    <Experiences />
                </div>
            </div>
        </div>
    )
};

export default Principal;