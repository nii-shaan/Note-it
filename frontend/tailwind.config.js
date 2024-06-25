/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#1c1c1c",
        text:"#F7F9F2",
        second:"#00ADB5",
        secondText:"#222831"
      },
    },
  },
  plugins: [],
};
