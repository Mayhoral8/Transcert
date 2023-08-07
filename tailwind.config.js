/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        inter: ['"Inter"'],
        federo:  ['"Federo"'],
        roboto: ['"Roboto"'],
        openSans: ['"Open Sans"'],
      }
    },
    colors: {
      'blue-base': '#213465',
      'orange-base': '#E57E2F',
      'white': '#FFFFFF',
      'gray': '#3A3A3A',
      'red': '#FF3030',
      'white-01': '#F6F6F6'
    },
  },
  plugins: [],
}
