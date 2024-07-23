/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      keyframes: {
        curtainOpen: {
          "0%": { maxHeight: "0", opacity: "0" },
          "100%": { maxHeight: "50vh", opacity: "1" }, // Adjust to fit your content
        },
        curtainClose: {
          "0%": { maxHeight: "50vh", opacity: "1" }, // Adjust to fit your content
          "100%": { maxHeight: "0", opacity: "0" },
        },
      },
      animation: {
        curtainOpen: "curtainOpen 0.5s ease-out",
        curtainClose: "curtainClose 0.5s ease-in",
      },
      backgroundImage: {
        "custom-bg":
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
        "app-gradient":
          "linear-gradient(106.37deg, #ffe1bc 26.93%, #ffcfd1 51.55%, #f3c6f1 90.85%)",
      },
      gridTemplateColumns: {
        custom: "11rem auto",
        custom1: "3rem auto",
        13: "repeat(13, minmax(0, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
        17: "repeat(17, minmax(0, 1fr))",
        18: "repeat(18, minmax(0, 1fr))",
        19: "repeat(19, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
        "span-17": "span 17 / span 17",
        "span-18": "span 18 / span 18",
        "span-19": "span 19 / span 19",
        "span-20": "span 20 / span 20",
      },
      colors: {
        yellowGradient:
          "linear-gradient(180deg, #f8d49a -146.42%, #f4d79D -46.7%)",
        orange: "#fca61f",
        black: "#242d49",
        gray: "#788097",
        pink: "#ff919d",
        purpleGradient: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        glass: "rgba(255,255,255,0.54)",
        activateItem: "#f799a354",
      },

      boxShadow: {
        custom: "0px 19px 60px rgba(0,0,0,0.08)",
        sm: "-79px 51px 60px rgba(0,0,0,0.08)",
        "custom-card-1": "0px 10px 20px 0px  #f53d59",
        "custom-card-2": "0px 10px 20px 0px  #ff919d",
        "custom-card-3": "0px 10px 20px 0px  #ffe924 ",
      },
      screens: {
        "1000px": "1000px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "600px": "600px",
        "400px": "400px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".camel-case": {
          "text-transform": "lowercase",
          "&::first-letter": {
            "text-transform": "uppercase",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
