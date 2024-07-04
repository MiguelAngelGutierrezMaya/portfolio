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
    const about: string = 'I am an Information systems technologist and systems engineering student, able to meet user requirements\n' +
        '                and identify computer solutions for those requirements. I am an Analyst and designer of business\n' +
        '                information systems and have skills in solving problems that require software processes. Experience in\n' +
        '                the development of web and spa applications for the optimization of data loading processes and\n' +
        '                communication with other information systems through API'

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