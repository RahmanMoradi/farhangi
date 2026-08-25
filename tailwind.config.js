/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main_color: "#00aeef",
        second_color: "#ec008c",
        gray: "#E0E0E0",
        light_red: "#E420200A",
        light_red_100: "#FFB7B7",
        light_brown_50: "#DD0000",
        light_brown_200: "#EDEDED",
        light_brown_600: "#DBDBDB",
        Gray59: "#595959",
        black_12: "#121212",
      },
      fontFamily: {
        yekan: ['yekan-bakh', 'sans-serif'],
        kalameh: ['kalameh', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
