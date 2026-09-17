/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        redbrick: {
          50: "#FFF1F0",
          100: "#FFE1DF",
          200: "#FFC7C4",
          300: "#FFA09B",
          400: "#F86D64",
          500: "#E54035",
          600: "#B5230E", // Official Brand Primary
          700: "#961B0A",
          800: "#7A170A",
          900: "#521109",
          950: "#300704",
        },
        charcoal: {
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#868E96",
          600: "#495057",
          700: "#343A40",
          800: "#2D2D2D", // Brand Charcoal
          900: "#1E2124", // Engineering Dark
          950: "#111315", // Deep Obsidian
        },
      },
      fontFamily: {
        sans: [
          "'Prompt'",
          "'Noto Sans Thai'",
          "'IBM Plex Sans Thai'",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "'Fira Code'",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        // Typography scale for reading comfort
        "heading-1": ["clamp(1.75rem, 3.5vw, 2.5rem)", { lineHeight: "1.25" }], // 28-40px
        "heading-2": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.3" }],     // 24-32px
        "heading-3": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.35" }],   // 20-24px
        "heading-4": ["clamp(1.1rem, 1.5vw, 1.25rem)", { lineHeight: "1.4" }],  // 17-20px
        "body-compact": ["16px", { lineHeight: "1.7" }],
        "body-normal": ["17.5px", { lineHeight: "1.8" }],
        "body-large": ["20px", { lineHeight: "1.85" }],
      },
      lineHeight: {
        thai: "1.8",
        "thai-loose": "1.85",
        "thai-heading": "1.3",
      },
      boxShadow: {
        "glow-red": "0 0 25px -5px rgba(181, 35, 14, 0.35)",
      },
    },
  },
  plugins: [],
};
