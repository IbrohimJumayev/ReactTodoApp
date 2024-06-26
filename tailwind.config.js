/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        bgColorDiv: "#1D1825",
        borderInputColor: "#9E78CF",
        taskBacColor: "#15101C",
      }
    },
  },
  plugins: [],
}

