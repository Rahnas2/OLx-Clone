
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          base: "#002f34",
          light1: "#406367",
          light2: "#7f9799",
          light3: "#d8dfe0",
          light5: "#DFE5E5",
        },
        blue: {
          base: "#3a77ff",
          light1: "#6c99ff",
          light2: "#9cbbff",
          light3: "#ceddff",
          light4: "#ebf1ff",
          light5: "#f2f4f5",
          light6: "#F8F9FA",
          light7: "#f1f3f5",
          dark1: "#1d3c81",
          dark2: "#17284e",
          dark3: "#6c757d",
        },
        accent: {
          base: "#23e5db",
          light1: "#5aece4",
          light2: "#91f2ed",
        },
      },
    },
  },
  plugins: [],
}