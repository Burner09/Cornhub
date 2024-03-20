/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#55bdca',
        dark: '#022444',
        light: '#c8efe4',
        neutral: '#96ffff',
        tan: '#f27d42',
      }
    }
  },
  plugins: [],
}
