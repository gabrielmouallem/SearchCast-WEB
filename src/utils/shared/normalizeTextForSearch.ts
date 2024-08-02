import { stopwordsPtBr } from "@/constants";

export function normalizeTextForSearch(text: string): string {
  const lowerCaseText = text.toLowerCase();

  const filteredWords = lowerCaseText
    .split(" ")
    .filter((word) => !stopwordsPtBr.includes(word));

  return filteredWords.join(" ");
}
