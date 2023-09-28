/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/screens/**/*.tsx', './app/components/**/*.tsx', './ignite/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#DB2031',
      },
    },
  },
  plugins: [],
}
