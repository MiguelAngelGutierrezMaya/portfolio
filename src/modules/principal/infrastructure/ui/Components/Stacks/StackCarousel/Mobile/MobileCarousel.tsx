//
// React dependencies
//
import React from 'react';

//
// Components
//
import StackCarousel from "../StackCarousel.tsx";

//
// Hooks
//
import {useMobileCarouselLogic} from "./UseMobileCarouselLogic.ts";

//
// Models
//
import {CarouselType} from "../../../../../../models/constants/CarouselType.ts";

interface MobileCarouselProps {
}

const MobileCarousel: React.FC<MobileCarouselProps> = () => {
    //
    // Hooks
    //
    const {items} = useMobileCarouselLogic()

    return (
        <section id={CarouselType.MOBILE} className={'animate-fade-up w-full mt-6'}>
            <StackCarousel items={items}/>
        </section>
    )
}

export default MobileCarousel