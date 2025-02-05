//
// React dependencies
//
import React from 'react';

//
// Components
//
import Icon from "../Icon/Icon.tsx";
import SectionLink from "../SectionLink/SectionLink.tsx";
import SectionLinkWithPopover from "../SectionLink/SectionLinkWithPopover.tsx";

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
            <figure className={'w-14 h-14'}>
                <img
                    src={`${PUBLIC_FIREBASE_URL}/logo.webp?alt=media&token=1edaded3-067f-4168-bf41-494052a21bae`}
                    alt="Miguel Gutierrez"
                    className="animate-fade w-full h-full object-contain rounded-sm shadow"/>
            </figure>

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
                    className={'text-white hover:text-white/90'}
                    title={'About me'}
                    onClick={
                        () => setScroll('presentation-title')
                    }
                />
                <SectionLink
                    className={'text-white hover:text-white/90'}
                    title={'Experiences'}
                    onClick={
                        () => setScroll('experiences-title')
                    }
                />
                <SectionLinkWithPopover
                    title={'Let\'s talk'}
                    onClick={
                        () => setScroll('contact')
                    }
                    onClickWhasapp={
                        () => openWhatsapp()
                    }
                />
            </div>
        </header>
    )
}

export default Header;