/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'bp400': '400px',
        sm: '640px', 
        md: '768px', 
        lg: '1024px',
        'bp1200':'1200px',
        xl: '1280px',
        '2xl': '1536px', 
      },
    },
  },
  plugins: [],
}
