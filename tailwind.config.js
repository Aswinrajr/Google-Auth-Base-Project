/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'prima': ['Prima Sans', 'sans-serif'], // Add Prima Sans font
      },
    },
  },
  plugins: [],
}
