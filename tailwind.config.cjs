/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: {
          DEFAULT: "#0F172A", // azul‑escuro ExpressCar
          light:   "#1E293B",
        },
        accent:  "#38BDF8",
      },
    },
  },
  plugins: [],
};
