//
// Models
//
import type {Technology} from "../../../../models/Technology.ts";

//
// Assets
//
import html from './utils/assets/html.webp'

const PUBLIC_FIREBASE_URL = import.meta.env.PUBLIC_FIREBASE_URL

export const useTechnologiesLogic = () => {
    //
    // Constants
    //
    const technologies: Technology[] = [
        {
            name: "HTML 5",
            icon: html
        }
    ];

    return {
        technologies
    }
}