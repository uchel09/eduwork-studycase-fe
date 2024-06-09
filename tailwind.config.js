/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "custom-bg":
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
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
  plugins: [],
};
