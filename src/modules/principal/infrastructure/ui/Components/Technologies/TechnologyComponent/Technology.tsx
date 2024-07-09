//
// React dependencies
//
import React, {Suspense} from 'react';

//
// Models
//
import type {Technology} from "../../../../../models/Technology.ts";

//
// Components
//
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Preload} from "@react-three/drei";
import Loader from "./Loader/Loader.tsx";
import Ball from "./Ball/Ball.tsx";

interface TechnologyComponentProps {
    item: Technology
}

const TechnologyComponent: React.FC<TechnologyComponentProps> = ({item}) => {
    return (
        <section className={'w-28 h-28'}>
            <Canvas
                frameloop='demand'
                dpr={[1, 2]}
                gl={{preserveDrawingBuffer: true}}
            >
                <Suspense fallback={<Loader/>}>
                    <OrbitControls enableZoom={false}/>
                    <Ball img={item.icon}/>
                </Suspense>

                <Preload all/>
            </Canvas>
        </section>
    );
};

export default TechnologyComponent;