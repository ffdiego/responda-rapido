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
      animation: {
        "fade-in-top": "fadeInFromTop 500ms ease-in-out",
        "fade-in-left": "fadeInFromLeft 500ms ease-in-out",
        "fill-progress": "fill 5s linear",
      },
      keyframes: {
        fill: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        fadeInFromLeft: {
          "0%": {
            opacity: 0,
            transform: "translateX(-100%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        fadeInFromTop: {
          "0%": {
            opacity: 0,
            transform: "translateY(-100%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
