module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1526',
          dark: '#070F1A',
          light: '#112035',
          card: '#0F1C2E',
          border: '#1E3050',
        },
        orange: {
          DEFAULT: '#E85D04',
          hover: '#D05204',
          light: '#FF7722',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-up-slow': 'fade-up 1s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
    },
  },
};
