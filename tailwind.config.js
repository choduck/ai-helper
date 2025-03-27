/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00C73C',
        'primary-dark': '#00A32C',
        'secondary': '#4A4A4A',
        'background': '#F8F9FA',
      }
    },
  },
  plugins: [],
}