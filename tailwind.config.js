/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}