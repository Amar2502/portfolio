/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // You can add custom colors here if needed
      },
      fontFamily: {
        // You can add custom fonts here if needed
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} 