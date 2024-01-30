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
        'primary-white': '#E1E5EB',
        'primary-gray': '#444955',
        'primary-black': '#1A1B1C',
      }
    },
  },
  plugins: [],
}

