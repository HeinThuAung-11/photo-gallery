/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [require("daisyui")],
  theme: {
    colors: {
      'primary1': '#F4D19B',
      'primary2': '#DFC08F',
      'primary3': '#BEA37A',
      'secondary1': '#D7E9F7',
      'secondary2': '#C6D7E3',
      'secondary3': '#739DBE',
      'accent1': '#FDFCE5',
      'accent2': '#E4E4D8',
      'accent3': '#B1B1A9',
      'tertiary1': '#F9F3DF',
      'tertiary2': '#EBE4CD',
      'tertiary3': '#C7C1AE',
    },
  },
  daisyui: {
    themes: false,
  },
}