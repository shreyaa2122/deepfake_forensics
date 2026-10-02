/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forensic: {
          bg: '#0b0f14',
          panel: '#121820',
          accent: '#22d3ee',
          danger: '#f87171',
          safe: '#4ade80',
        },
      },
    },
  },
  plugins: [],
}
