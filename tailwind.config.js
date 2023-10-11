/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "pastel", "autumn"],
  },
  safelist: [
    "w-8",
    "w-12",
    "alert-success"
  ]
}

