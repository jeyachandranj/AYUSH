/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5F5F5",
        secondary: "#454545",
        ascent: "#2E7188",
      },
    },
  },
  plugins: [],
};
