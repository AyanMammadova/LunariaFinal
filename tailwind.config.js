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
        'bp500': '500px',
        'bp600':'600px',
        sm: '640px', 
        md: '768px',
        'bp700':'700px', 
        'bp900':'900px', 
        'bp800':'800px', 
        lg: '1024px',
        'bp1200':'1200px',
        xl: '1280px',
        '2xl': '1536px', 
      },
      fontFamily: {
        cormorant: ['"Cormorant"', 'serif'],
        cormorantgaramond: ['"Cormorant+Garamond"', 'serif'],
        montserrat: ['"Montserrat Ace Regular"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

