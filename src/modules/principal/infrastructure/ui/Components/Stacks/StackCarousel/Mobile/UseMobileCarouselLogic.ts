//
// Models
//
import type {Item} from "../../../../../../models/Item.ts";

const PUBLIC_FIREBASE_URL = import.meta.env.PUBLIC_FIREBASE_URL

export const useMobileCarouselLogic = () => {
    //
    // Constants
    //
    const items: Item[] = [
        {
            title: "Keybe App",
            description: "Keybe App is a multi-channel application for managing customer conversation, CRM, and events",
            githubLink: "",
            image: `${PUBLIC_FIREBASE_URL}/keybe-app.webp?alt=media&token=e3f89a4f-654c-4ed6-b7e3-a9754e036004`,
            technologies: ["flutter", "dart", "firebase"]
        },
        {
            title: "Platzi Tweets",
            description: "Platzi Tweets is a learning project consisting of a mobile application for managing posts by adding image, text or location.",
            githubLink: "https://github.com/MiguelAngelGutierrezMaya/platzi-tweets",
            image: `${PUBLIC_FIREBASE_URL}/tweets.webp?alt=media&token=7c9f3ca5-3364-4fbe-b1dc-2ae7e36e64b0`,
            technologies: ["swift", "firebase"]
        }
    ]

    return {
        items
    }
}