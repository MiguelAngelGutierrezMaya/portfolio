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
import {useFrontCarouselLogic} from "./UseFrontCarouselLogic.ts";

//
// Models
//
import {CarouselType} from "../../../../../../models/constants/CarouselType.ts";

interface FrontCarouselProps {
}

const FrontCarousel: React.FC<FrontCarouselProps> = () => {
    //
    // Hooks
    //
    const {items} = useFrontCarouselLogic()

    return (
        <section id={CarouselType.FRONT} className={'animate-fade-up w-full mt-6'}>
            <StackCarousel
                items={items}
            />
        </section>
    )
}

export default FrontCarousel