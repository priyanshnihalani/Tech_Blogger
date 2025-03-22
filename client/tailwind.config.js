/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          jost: ['Jost', 'sans-serif'],
        },
        keyframes: {
          'fade-in-down': {
            '0%': { opacity: '0', transform: 'translateY(-20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          'fade-in-up': {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          'fade-in-left': {
            '0%': { opacity: '0', transform: 'translateX(-20px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          'fade-in-right': {
            '0%': { opacity: '0', transform: 'translateX(20px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          }
        },
        animation: {
          'fade-in-down': 'fade-in-down 0.8s ease-out',
          'fade-in-up': 'fade-in-up 0.8s ease-out',
          'fade-in-left': 'fade-in-left 0.8s ease-out',
          'fade-in-right': 'fade-in-right 0.8s ease-out',
        }
      }
    },
    plugins: [],
  }