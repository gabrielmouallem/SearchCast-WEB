import type { Config } from "tailwindcss";
import { colorVarsPlugin } from "./plugins";

const colors = {
  lightGray: "#F5F5F6" as const,
  gray: "#85888E" as const,
  darkGray: "#333741" as const,
  darkerGray: "#161B26" as const,
  primary: "#0C111D" as const,
  brand: "#009EA4" as const,
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: colors.darkGray,
      },
      backgroundImage: {
        pattern: "url('/bg_pattern.svg')",
      },
      width: {
        "1190px": "1190px",
        "985px": "985px",
      },
      colors: {
        "text-primary": colors.lightGray, //colors.lightGray, // Semantic and functional
        "text-secondary": colors.gray, // Semantic and functional
        border: colors.darkGray, // Functional
        background: colors.primary, //colors.primary, // Semantic
        brand: colors.brand, // Semantic
        "dark-gray": colors.darkerGray,
      },
    },
  },
  plugins: [colorVarsPlugin],
};
export default config;
