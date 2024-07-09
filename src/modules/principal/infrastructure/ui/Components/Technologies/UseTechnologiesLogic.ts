//
// React dependencies
//
import {useEffect, useRef, useState} from "react";

//
// Models
//
import type {Technology} from "../../../../models/Technology.ts";

export const useTechnologiesLogic = () => {
    //
    // Constants
    //
    const [technologies, setTechnologies] = useState<Technology[]>([]);

    const [isIntersecting, setIntersecting] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!divRef.current) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
                if (!isIntersecting && entry.isIntersecting) {
                    setIntersecting(entry.isIntersecting)
                }
            }
        );

        observer.observe(divRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (isIntersecting) {
            const importImages = async () => {
                const html: ImageMetadata = (await import ('./utils/assets/html.webp')).default
                const css: ImageMetadata = (await import ('./utils/assets/css.webp')).default
                const docker: ImageMetadata = (await import ('./utils/assets/docker.webp')).default
                const figma: ImageMetadata = (await import ('./utils/assets/figma.webp')).default
                const flutter: ImageMetadata = (await import ('./utils/assets/flutter.webp')).default
                const git: ImageMetadata = (await import ('./utils/assets/git.webp')).default
                const javascript: ImageMetadata = (await import ('./utils/assets/javascript.webp')).default
                const kotlin: ImageMetadata = (await import ('./utils/assets/kotlin.webp')).default
                const mongodb: ImageMetadata = (await import ('./utils/assets/mongodb.webp')).default

                setTechnologies([
                    {
                        name: 'HTML',
                        icon: html
                    },
                    {
                        name: 'CSS',
                        icon: css
                    },
                    {
                        name: 'Docker',
                        icon: docker
                    },
                    {
                        name: 'Figma',
                        icon: figma
                    },
                    {
                        name: 'Flutter',
                        icon: flutter
                    },
                    {
                        name: 'Git',
                        icon: git
                    },
                    {
                        name: 'JavaScript',
                        icon: javascript
                    },
                    {
                        name: 'Kotlin',
                        icon: kotlin
                    },
                    {
                        name: 'MongoDB',
                        icon: mongodb
                    }
                ])
            }
            importImages().then()
        }
    }, [isIntersecting]);


    return {
        technologies,
        isIntersecting,
        divRef
    }
}