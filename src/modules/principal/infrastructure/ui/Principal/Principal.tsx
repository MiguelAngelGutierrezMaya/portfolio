//
// React components
//
import React from 'react';

//
// Components
//
import Header from "../Components/Header/Header.tsx";
import Presentation from "../Components/Presentation/Presentation.tsx";

interface PrincipalProps {
}

const PUBLIC_FIREBASE_URL = import.meta.env.PUBLIC_FIREBASE_URL;

const Principal: React.FC<PrincipalProps> = () => {
    return (
        <>
            <Header/>
            <Presentation/>
        </>
    )
};

export default Principal;