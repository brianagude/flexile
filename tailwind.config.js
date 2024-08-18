module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#1d1e17',
        'white': '#fff',
        'gray': 'rgba(29, 30, 23, 0.63)',
        'gray-med': '#e7e7e5',
        'gray-light': '#D6D6D4',
        'gray-lightest': '#f3f3f1',
        'blue': '#006CEB',
        'blue-light': 'rgba(0, 108, 235, 0.30)',
      },
    },
  },
  plugins: [],
}