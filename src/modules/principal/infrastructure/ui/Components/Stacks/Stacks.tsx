//
// React dependencies
//
import React from 'react';

//
// Components
//
import {FaCodepen, FaLaptopCode, FaMobile} from "react-icons/fa6";
import Element from "./Element.tsx";
import FrontCarousel from "./StackCarousel/Front/FrontCarousel.tsx";
import BackCarousel from "./StackCarousel/Back/BackCarousel.tsx";
import MobileCarousel from "./StackCarousel/Mobile/MobileCarousel.tsx";

//
// Hooks
//
import {useStacksLogic} from "./UseStacksLogic.ts";

//
// Models
//
import {CarouselType} from "../../../../models/constants/CarouselType.ts";

interface StacksProps {
}

const Stacks: React.FC<StacksProps> = () => {
    //
    // Hooks
    //
    const {stackSelected, setCarousel} = useStacksLogic();

    //
    // Computed
    //
    const stackSelectedComputed = (): React.JSX.Element => {
        if (stackSelected === CarouselType.FRONT) {
            return <FrontCarousel/>
        }
        if (stackSelected === CarouselType.BACK) {
            return (
                <BackCarousel/>
            )
        }
        if (stackSelected === CarouselType.MOBILE) {
            return (
                <MobileCarousel/>
            )
        }

        return <></>
    }

    return (
        <div className="mt-16 w-full sm:mt-20 pl-8 pr-8">
            <ul role="list" className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-1 lg:grid-cols-3">
                <Element
                    className={"cursor-pointer group relative"}
                    title={'Frontend developer'}
                    icon={<FaCodepen className="text-white h-8 w-8"/>}
                    onClick={() => setCarousel(CarouselType.FRONT)}
                />
                <Element
                    className={"cursor-pointer group relative"}
                    title={'Backend developer'}
                    icon={<FaLaptopCode className="text-white h-8 w-8"/>}
                    onClick={() => setCarousel(CarouselType.BACK)}
                />
                <Element
                    className={"cursor-pointer group relative"}
                    title={'Mobile developer'}
                    icon={<FaMobile className="text-white h-8 w-8"/>}
                    onClick={() => setCarousel(CarouselType.MOBILE)}
                />
            </ul>

            {stackSelectedComputed()}
        </div>
    )
};

export default Stacks;