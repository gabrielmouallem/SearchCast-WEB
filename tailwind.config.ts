import type { Config } from "tailwindcss";
import { colorVarsPlugin } from "./plugins";

const colors = {
  lightGray: "#F5F5F6",
  gray: "##85888E",
  darkGray: "#333741",
  primary: "#0C111D",
  brand: "#009EA4",
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
      colors: {
        "text-primary": colors.lightGray, //colors.lightGray, // Semantic and functional
        "text-secondary": colors.gray, // Semantic and functional
        border: colors.darkGray, // Functional
        background: colors.primary, //colors.primary, // Semantic
        brand: colors.brand, // Semantic
      },
    },
  },
  plugins: [colorVarsPlugin],
};
export default config;
