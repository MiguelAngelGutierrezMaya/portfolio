//
// React dependencies
//
import React from 'react';

//
// Components
//
import {FaCodepen, FaLaptopCode, FaMobile} from "react-icons/fa6";
import Atropos from "atropos/react";
import Element from "./Element.tsx";

interface StacksProps {
}

const Stacks: React.FC<StacksProps> = () => {
    return (
        <div className="mt-16 sm:mt-20 pl-8 pr-8">
            <ul role="list" className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-1 lg:grid-cols-3">
                <Element
                    title={'Frontend developer'}
                    icon={<FaCodepen className="text-white h-8 w-8"/>}
                />
                <Element
                    title={'Backend developer'}
                    icon={<FaLaptopCode className="text-white h-8 w-8"/>}
                />
                <Element
                    title={'Mobile developer'}
                    icon={<FaMobile className="text-white h-8 w-8"/>}
                />
            </ul>
        </div>
    )
};

export default Stacks;