/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#34d399',
        secondary: '#60a5fa',
        accent: '#fbbf24',
        neutral: '#f3f4f6',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
}
