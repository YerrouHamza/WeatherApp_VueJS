/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        max: 9999,
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(4deg, rgba(16,20,29,1) 0%, rgba(31,36,44,1) 39%, rgba(45,51,62,1) 72%)',
      },
    },
  },
  plugins: [],
}

