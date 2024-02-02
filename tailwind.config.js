/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/*.tsx",
    "./src/**/*.tsx",
    "./src/*.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'coins-pattern': "url('./src/assets/foto-fundo.png')"
      },
      colors: {
        'primary-green': '#2FC18C',
        'secondary-green': '#036B52',
        'primary-purple': '#8958A3',
        'secondary-purple': '#771884',
        'primary-blue': '#00D5E2',
        'secondary-blue': '#003BE5',
        'primary-gray': '#E1E5EB',
        'secondary-gray': '#444955',
        'primary-black': '#1A1B1C',
      },
      width: {
        '1/8': '12.5%',
        '2/8': '25%',
        '3/8': '37.5%',
        '4/8': '50%',
        '5/8': '62.5%',
        '6/8': '75%',
        '7/8': '87.5%',
      },
    },
  },
  plugins: [],
}

