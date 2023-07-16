const tones = Array.from({ length: 10 }, (_, i) => i * 100).reduce((tones, tone) => {
    tones[tone] = `var(--color-${tone})`;
    return tones;
}, {});

module.exports = {
    important: true,
    mode: 'jit',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                amber: tones,
                red: tones,
                cyan: tones,
                yellow: tones
            },
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/line-clamp')
    ]
};
