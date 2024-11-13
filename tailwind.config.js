/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in forwards',
        'elegant-drop': 'elegantDrop 1.2s ease-out forwards',
        'drop-in': 'dropIn 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        elegantDrop: {
          '0%': { 
            transform: 'translateY(-50px)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateY(0)', 
            opacity: '1' 
          },
        },
        dropIn: {
          '0%': { 
            transform: 'translateY(-100px)',
            opacity: '0' 
          },
          '50%': { 
            transform: 'translateY(20px)',
            opacity: '0.5' 
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1' 
          },
        },
      },
    },
  },
  plugins: [],
};