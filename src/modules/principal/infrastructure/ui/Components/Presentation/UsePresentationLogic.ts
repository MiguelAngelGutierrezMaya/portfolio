//
// React dependencies
//
import {useEffect, useRef} from "react";

// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';

export const usePresentationLogic = () => {
    //
    // Constants
    //
    const about: string = 'Full stack developer with B2 English and more than 5+ years of experience developing and maintaining web technology solutions and backend services, also more than 3+ years of experience developing cross-platform mobile solutions to address small business requirements.\n' +
        'Experience leading and teaching small frontend teams to achieve business goals by developing scalable solutions, addressing business use cases and applying clean code techniques.\n' +
        'I am fully interested in mobile native development, constant growth, continuous learning and AI at the core in my work experience using development tools with generative AI and vendor services to address different use cases related to AI interactions and actions'

    let typeWriter: Typewriter

    //
    // Use hooks
    //
    const pElement = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if (pElement.current) {
            typeWriter = new Typewriter(pElement.current, {
                loop: false,
                delay: 5
            })

            typeWriter
                .pauseFor(300)
                .typeString(about)
                .start();
        }

        return () => {
            if (typeWriter) {
                typeWriter.stop()
            }
        }
    }, []);

    return {
        pElement
    }
}