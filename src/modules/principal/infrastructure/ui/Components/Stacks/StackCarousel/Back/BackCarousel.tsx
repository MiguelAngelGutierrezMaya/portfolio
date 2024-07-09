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
import {useBackCarouselLogic} from "./UseBackCarouselLogic.ts";

//
// Models
//
import {CarouselType} from "../../../../../../models/constants/CarouselType.ts";

interface BackCarouselProps {
}

const BackCarousel: React.FC<BackCarouselProps> = () => {
    //
    // Hooks
    //
    const {items} = useBackCarouselLogic()

    return (
        <section id={CarouselType.BACK} className={'animate-fade-up w-full mt-6'}>
            <StackCarousel items={items}/>
        </section>
    )
}

export default BackCarousel