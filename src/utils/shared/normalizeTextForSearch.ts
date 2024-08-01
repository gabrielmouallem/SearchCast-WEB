import { stopwordsPtBr } from "@/constants";
import { removeUnintendedSymbols } from "./removeUnintendedSymbols";

export function normalizeTextForSearch(text: string): string {
  const sanitizedText = removeUnintendedSymbols(text);

  const lowerCaseText = sanitizedText.toLowerCase();

  const filteredWords = lowerCaseText
    .split(" ")
    .filter((word) => !stopwordsPtBr.includes(word));

  return filteredWords.join(" ");
}
