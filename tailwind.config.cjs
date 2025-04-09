/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  plugins: [require("tailwindcss/nesting")],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "100%",
        md: "90%",
        lg: "900px",
        xl: "1100px",
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        header: ["var(--header-font-family)"],
        alt: ["var(--alt-font-family)"],
        body: ["var(--body-font-family)"],
      },
      colors: {
        primary: {
          DEFAULT: "#51733F", /* Olive green */
          text: {
            light: "#1A1A1A",
            dark: "#FFFFFF",
          },
          50: "#F8FAF6",
          100: "#EBF1E9",
          200: "#D6E2D1",
          300: "#B5CBA9",
          400: "#8DAF7C",
          500: "#6B9355",
          600: "#4D6F3B", /* Slightly darker and more vibrant olive */
          700: "#3F5C31",
          800: "#324629",
          900: "#22301C",
          950: "#121A0F",
        },
        secondary: {
          light: "#F7F7EE", /* Brighter off-white paper */
          dark: "#3A4D30", /* Dark olive green for dark mode */
          outline: "#E8E8DE",
          50: "#FCFCF9",
          100: "#F7F7EE",
          200: "#EEEEDD",
          300: "#DEDEC3",
          400: "#BEBE99",
          500: "#9F9F74", 
          600: "#7D7D5A",
          700: "#475C3A", /* Dark olive */
          800: "#3A4D30", /* Darker olive for dark mode backgrounds */
          900: "#2E3D25", /* Darkest olive for dark mode */
          950: "#25331F",
        },
        accent: {
          DEFAULT: "#8E9E82", /* Lighter olive green accent */
          50: "#F4F6F2",
          100: "#E8EDE4",
          200: "#D2DBCA",
          300: "#BAC8AE",
          400: "#A3B393",
          500: "#8E9E82",
          600: "#738662", /* Slightly darker for more contrast */
          700: "#5E6A53",
          800: "#464F3E",
          900: "#2F3529",
        },
      },
    },
  },
};
