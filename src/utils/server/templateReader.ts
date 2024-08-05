"use server";
import fs from "fs";
import path from "path";

export const readTemplate = (templateName: string) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "email",
    `${templateName}.html`,
  );

  try {
    return fs.readFileSync(templatePath, "utf-8");
  } catch (error) {
    console.log({ error });
    throw new Error(`Error reading template: ${templateName}. Error: ${error}`);
  }
};
