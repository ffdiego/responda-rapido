/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#22c25f",
        color2: "#68d592",
        color3: "#0f6e42",
        color4: "#527ea9",
        color5: "#d6d5bd",
        color6: "#5f4130",
      },
    },
  },
  plugins: [],
};
