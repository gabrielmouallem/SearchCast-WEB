import { type PluginAPI } from "tailwindcss/types/config";

export const colorVarsPlugin = ({ addBase, theme }: PluginAPI) => {
  const extractColorVars = (
    colorObj: Record<string, string>,
    colorGroup = ""
  ) =>
    Object.entries(colorObj).reduce((vars, [colorKey, value]) => {
      const cssVariable =
        colorKey === "DEFAULT"
          ? `--color${colorGroup}`
          : `--color${colorGroup}-${colorKey}`;

      const newVars: Record<string, string> =
        typeof value === "string"
          ? { [cssVariable]: value }
          : extractColorVars(value, `-${colorKey}`);

      return { ...vars, ...newVars };
    }, {});

  addBase({
    ":root": extractColorVars(theme("colors")),
  });
};
