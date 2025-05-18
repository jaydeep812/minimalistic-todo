/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        architects: ['"Architects Daughter"', 'cursive'],
      },
      colors: {
        pastelPink: '#FADADD',
        pastelBlue: '#D0EFFF',
        pastelPeach: '#FFD6C2',
        pastelMint: '#D4F5DC',
        pastelLavender: '#E6E6FA',
        pastelYellow: '#FFF9C4',
      }
    },
  },
  plugins: [],
}

