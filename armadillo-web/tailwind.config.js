module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
    },
    purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
    variants: {
        backgroundColor: ['hover', 'focus', 'responsive', 'active'],
    },
    plugins: [],
}