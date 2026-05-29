/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      // Brand palette: every `green-*` utility is remapped to the dark
      // Brighton Road green (#0b4228 = navbar) so the whole site stays
      // perfectly consistent. Light shades stay as soft mint tints so
      // hover text on the dark navbar and subtle backgrounds still read.
      colors: {
        green: {
          50: '#eef4f1',
          100: '#d7e7dd',
          200: '#aecdbb',
          300: '#9fd0b6',
          400: '#4f9d72',
          500: '#15693f',
          600: '#0f5733',
          700: '#0b4228', // brand
          800: '#08311e',
          900: '#051f13',
        },
      },
    },
  },
  plugins: [],
};



  