//
// Models
//
import type {Technology} from "../../../../models/Technology.ts";

//
// Assets
//
import html from './utils/assets/html.webp'
import css from './utils/assets/css.webp'
import docker from './utils/assets/docker.webp'
import figma from './utils/assets/figma.webp'
import flutter from './utils/assets/flutter.webp'
import git from './utils/assets/git.webp'
import javascript from './utils/assets/javascript.webp'
import kotlin from './utils/assets/kotlin.webp'
import mongodb from './utils/assets/mongodb.webp'

export const useTechnologiesLogic = () => {
    //
    // Constants
    //
    const technologies: Technology[] = [
        {
            name: "HTML 5",
            icon: html
        },
        {
            name: "CSS 3",
            icon: css
        },
        {
            name: "JavaScript",
            icon: javascript
        },
        {
            name: "Kotlin",
            icon: kotlin
        },
        {
            name: "Docker",
            icon: docker
        },
        {
            name: "MongoDB",
            icon: mongodb
        },
        {
            name: "Figma",
            icon: figma
        },
        {
            name: "Git",
            icon: git
        },
        {
            name: "Flutter",
            icon: flutter
        }
    ];

    return {
        technologies
    }
}