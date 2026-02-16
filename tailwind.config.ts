import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                peach: {
                    300: '#FFD6A5',
                },
                orange: {
                    200: '#FED7AA',
                },
            },
            fontFamily: {
                sans: ['var(--font-sora)', 'sans-serif'],
                heading: ['var(--font-space-grotesk)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
