"use server";
import { stopwordsPtBr } from "@/constants";
import natural from "natural";
import { removeUnintendedSymbols } from "../shared/removeUnintendedSymbols";

const stemmer = natural.PorterStemmerPt;

export async function normalizeTextForSearch(text: string): Promise<string> {
  const sanitizedText = removeUnintendedSymbols(text);

  const noDiacriticsText = natural.removeDiacritics(sanitizedText);

  const lowerCaseText = noDiacriticsText.toLowerCase();

  const filteredWords = lowerCaseText
    .split(" ")
    .filter((word) => !stopwordsPtBr.includes(word));

  const stemmedWords = filteredWords.map((word) => stemmer.stem(word));

  return new Promise((resolve, _) => resolve(stemmedWords.join(" ")));
}
