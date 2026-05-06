/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                zitface: "#FF4500", // Our signature campus orange
            },
        },
    },
    plugins: [],
}