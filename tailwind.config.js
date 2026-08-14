/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#E6C663',
          DEFAULT: '#D4AF37',
          dark: '#AA8C2C',
        },
        beige: {
          light: '#FAF8F5',
          DEFAULT: '#F8F4EF',
          dark: '#EADFCF',
        },
        luxury: {
          dark: '#1A1A1A',
          charcoal: '#2D2D2D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
