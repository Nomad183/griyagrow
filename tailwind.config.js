/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#2A7C13',
        'brand-light': '#e9ece8',
      }
    },
  },
  plugins: [],
}