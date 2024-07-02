/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0C0C0C",
        text: "#F7F9F2",
        second: "#1d1d1d",
        secondText: "#222831",
      },
    },
  },
  plugins: [],
};
