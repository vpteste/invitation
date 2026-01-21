/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{App,index}.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dancing': ['"Dancing Script"', 'cursive'],
        'playfair': ['"Playfair Display"', 'serif'],
        'lato': ['"Lato"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
