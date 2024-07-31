"use server";
import { stopwordsPtBr } from "@/constants";
import natural from "natural";

const stemmer = natural.PorterStemmerPt;

function removeUnintendedSymbols(text: string): string {
  return text.replace(/[^\w\s]/gi, "");
}

export async function normalizeSearchText(text: string): Promise<string> {
  const sanitizedText = removeUnintendedSymbols(text);

  const noDiacriticsText = natural.removeDiacritics(sanitizedText);

  const lowerCaseText = noDiacriticsText.toLowerCase();

  const filteredWords = lowerCaseText
    .split(" ")
    .filter((word) => !stopwordsPtBr.includes(word));

  const stemmedWords = filteredWords.map((word) => stemmer.stem(word));

  return new Promise((resolve, _) => resolve(stemmedWords.join(" ")));
}
