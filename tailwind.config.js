/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      rotate: {
        135: '135deg',
        225: '225deg',
        315: '315deg'
      }
    }
  },
  plugins: []
};
