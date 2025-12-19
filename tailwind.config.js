/** @type {import('tailwindcss').Config} */
module.exports = {
  // Sesuaikan path ini dengan struktur foldermu
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'cr-dark': '#121212',
        'cr-panel': '#1e1e1e',
        'cr-gold': '#ffd700',
        'cr-blue': '#2196f3',
        'cr-green': '#4caf50',
      }
    },
  },
  plugins: [],
}