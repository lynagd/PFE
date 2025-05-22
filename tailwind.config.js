/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        khder: "#537D5D",      // vert foncé
        tchini: "#F5A623",       // orange
        lfond: "#FDFAF6",           // gris très clair
        lsecondary: "#f5f3f0",        // gris clair
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
