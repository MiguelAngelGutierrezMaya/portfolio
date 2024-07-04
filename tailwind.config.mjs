/** @type {import('tailwindcss').Config} */

import tailwindAnimated from 'tailwindcss-animated'

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        fontFamily: {
            poppins: ['Poppins', 'sans-serif']
        },
        extend: {
            colors: {
                'primary': '#b81d33',
                'dark-secondary': '#020202'
            }
        }
    },
    plugins: [
        tailwindAnimated
    ],
}
