//
// React dependencies
//
import React from 'react';

//
// Components
//
import Icon from "../Icon/Icon.tsx";
import SectionLink from "../SectionLink/SectionLink.tsx";

//
// Hooks
//
import {useHeaderLogic} from "./UseHeaderLogic.ts";

interface HeaderProps {
}

const PUBLIC_FIREBASE_URL = import.meta.env.PUBLIC_FIREBASE_URL;

const Header: React.FC<HeaderProps> = () => {
    //
    // Hooks
    //
    const {links, setScroll, openWhatsapp} = useHeaderLogic();

    return (
        <header
            className="w-full h-48 md:h-32 lg:h-32 bg-dark-secondary px-4 py-4 flex flex-col md:flex-row lg:flex-row items-center gap-2">
            <img
                src={`${PUBLIC_FIREBASE_URL}/logo-simple.avif?alt=media&token=1bca8201-08d8-48d3-998d-2a6e5506b036`}
                alt="Miguel Gutierrez"
                className="w-48 h-12 rounded-sm shadow"/>

            <section className={'md:ml-4 lg:ml-4 flex flex-col items-center gap-2'}>
                <div className={'flex flex-row items-center gap-2'}>
                    {
                        links.map((link, index) => (
                            <Icon key={index} {...link}/>
                        ))
                    }
                </div>
            </section>


            <div className={'md:ml-auto lg:ml-auto flex flex-row gap-4'}>
                <SectionLink
                    title={'About me'}
                    onClick={
                        () => setScroll('presentation-title')
                    }
                />
                <SectionLink
                    title={'Experiences'}
                    onClick={
                        () => setScroll('experiences-title')
                    }
                />
                <SectionLink
                    title={'Let\'s talk'}
                    onClick={
                        () => openWhatsapp()
                    }
                />
            </div>
        </header>
    )
}

export default Header;