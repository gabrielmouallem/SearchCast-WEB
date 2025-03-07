import type { Config } from "tailwindcss";
import { colorVarsPlugin } from "./plugins";

const colors = {
  lightGray: "#F5F5F6" as const,
  gray: "#85888E" as const,
  darkGray: "#333741" as const,
  darkerGray: "#161B26" as const,
  darkestGray: "#05070d" as const,
  primary: "#0C111D" as const,
  brand: "#009EA4" as const,
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        primary: colors.darkGray,
        "radial-gradient":
          "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
      },
      backgroundImage: {
        pattern: "url('/bg_pattern.svg')",
        "default-gradient":
          "radial-gradient(circle at center top, rgba(0,0,0,0) 0%, #0C111D 50%)",
        "foggy-gradient":
          "radial-gradient(circle at center top, rgba(12,17,29,0.5) 0%, #0C111D 50%)",
        "tight-gradient":
          "radial-gradient(circle at center top, rgba(0,0,0,0) 0%, #0C111D 3%)",
      },
      backgroundPosition: {
        "top-center": "top center",
      },
      maxWidth: {
        "736px": "736px",
      },
      width: {
        "1190px": "1190px",
        "985px": "985px",
        "500px": "500px",
        "360px": "360px",
      },
      outlineWidth: {
        "24": "6rem",
      },
      gradientColorStops: {
        "black-transparent": "rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.35)",
      },
      colors: {
        "text-primary": colors.lightGray, //colors.lightGray, // Semantic and functional
        "text-secondary": colors.gray, // Semantic and functional
        border: colors.darkGray, // Functional
        background: colors.primary, //colors.primary, // Semantic
        brand: colors.brand, // Semantic
        "dark-gray": colors.darkerGray,
        "darker-gray": colors.darkestGray,
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        slideDown: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        slideUp: "slideUp 1s forwards",
        slideDown: "slideDown 1s forwards",
      },
    },
  },
  plugins: [colorVarsPlugin],
};
export default config;
