/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: { 950: "#05060a", 900: "#0a0c14", 800: "#12141f", 700: "#1a1d2b" },
        accent: { 400: "#8b7bff", 500: "#6d5bff", 600: "#5240e6" },
        glow: { teal: "#3ee6cf", pink: "#ff6bd6" },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: { glow: "0 0 40px rgba(109,91,255,0.35)", card: "0 8px 30px rgba(0,0,0,0.35)" },
      animation: { marquee: "marquee 30s linear infinite" },
      keyframes: { marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } } },
    },
  },
  plugins: [],
};
