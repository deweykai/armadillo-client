module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
    },
    purge: [
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}'
    ],
    extend: {
        colors: {
            orange: '#ff9100',
            green: '#00796b',
        },
    },
    variants: {
        backgroundColor: ['hover', 'focus', 'responsive', 'active'],
    },
    plugins: [],
}