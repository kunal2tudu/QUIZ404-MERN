/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#f4d125",
                "background-light": "#f8f8f5",
                "background-dark": "#221f10",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"],
                "quicksand": ["Quicksand", "sans-serif"], // Keeping existing font
            },
            borderRadius: { "DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px" },
        },
    },
    plugins: [],
}
