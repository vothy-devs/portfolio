/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./projects/media-portfolio/src/**/*.{html,ts}" // Crucial: make sure this matches exactly
  ],
  theme: { extend: {} },
  plugins: [],
}