/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      xxl: "1700px",
    },
    extend: {
      colors: {
        "primary": "#646cff",
        "primaryHover": "#8588BE"
      }
    },
  },
  plugins: [],
}

