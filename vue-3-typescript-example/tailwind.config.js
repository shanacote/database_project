// To install tailwind: https://tailwindcss.com/docs/guides/vue-3-vite
// To fix error with tailwind:
// https://tailwindcss.com/docs/installation#post-css-7-compatibility-build
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
