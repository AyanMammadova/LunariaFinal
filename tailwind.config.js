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
        'bp600':'600px',
        sm: '640px', 
        md: '768px',
        'bp900':'900px', 
        lg: '1024px',
        'bp900': '900px',
        'bp1200':'1200px',
        xl: '1280px',
        '2xl': '1536px', 
      },
    },
  },
  plugins: [],
}

