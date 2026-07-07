import type { Config } from "tailwindcss"
import tailwindAnimated from "tailwindcss-animate"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      gridTemplateColumns: {
        "5": "repeat(5, minmax(0, 1fr))",
        "6": "repeat(6, minmax(0, 1fr))",
      },

      colors: {
        primary: "#2563EB",
        accent: "#06B6D4",

        background: "#F8FAFC",
        background2: "#EEF2F7",

        card: "#FFFFFF",
        reversed: "#FFFFFF",

        text: "#0F172A",

        border: "#E2E8F0",

        success: "#16A34A",
        danger: "#DC2626",
        warning: "#F59E0B",
        info: "#0284C7",
      },

      fontFamily: {
        sans: [
          "var(--font-cairo)",
          "sans-serif",
        ],

        heading: [
          "var(--font-ibm-plex-arabic)",
          "sans-serif",
        ],
      },
    },
  },

  darkMode: "class",

  plugins: [tailwindAnimated],
}

export default config