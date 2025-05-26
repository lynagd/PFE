/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        khder: "#3d5a40",      // vert foncé (sidebar, boutons verts)
        tchini: "#FFD600",     // jaune bouton (yellow-500)
        lfond: "#fcf9f4",      // fond très clair
        lsecondary: "#e8f0ea", // gris clair (inputs, headers)
        smth: "#f8faf8",       // gris très très clair (inputs)
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

