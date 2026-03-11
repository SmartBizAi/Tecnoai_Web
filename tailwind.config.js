/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#f0f3f9',
                    100: '#dde5f0',
                    200: '#c0cce2',
                    300: '#94aacd',
                    400: '#6281b3',
                    500: '#426299',
                    600: '#324b7e',
                    700: '#293e68',
                    800: '#243456',
                    900: '#0f2250',
                    950: '#11172a',
                },
            },
            boxShadow: {
                card: '0 1px 3px 0 rgba(0,0,0,.07), 0 1px 2px -1px rgba(0,0,0,.05)',
                'card-hover': '0 4px 12px 0 rgba(0,0,0,.10)',
            },
        },
    },
    plugins: [],
}
