/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue1: "#011f4b",
        white: " #FFFFFF",
        blue5: "#b3cde0",
      },
    },
  },
  plugins: [],
};
