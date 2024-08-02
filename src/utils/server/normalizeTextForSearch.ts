"use server";
import { stopwordsPtBr } from "@/constants";
import natural from "natural";

const stemmer = natural.PorterStemmerPt;

export async function normalizeTextForSearch(text: string): Promise<string> {
  const noDiacriticsText = natural.removeDiacritics(text);

  const lowerCaseText = noDiacriticsText.toLowerCase();

  const stopWords = lowerCaseText
    .split(" ")
    .filter((word) => stopwordsPtBr.includes(word));

  const filteredWords = lowerCaseText
    .split(" ")
    .filter((word) => !stopwordsPtBr.includes(word));

  if (stopWords?.length) return filteredWords.join(" ");

  const stemmedWords = filteredWords.map((word) => stemmer.stem(word));

  return new Promise((resolve, _) => resolve(stemmedWords.join(" ")));
}
