/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', "sans-serif"],
        body: ['"General Sans"', "Manrope", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};