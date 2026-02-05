/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
  animation: {
    letter: "letterFade 0.6s ease forwards",
    fadeUp: "fadeUp 0.8s ease forwards",
  },
  keyframes: {
    letterFade: {
      "0%": { opacity: "0", transform: "translateY(20px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    fadeUp: {
      "0%": { opacity: "0", transform: "translateY(10px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
  },
},

  },
  plugins: [],
};