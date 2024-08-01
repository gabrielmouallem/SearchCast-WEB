export function removeUnintendedSymbols(text: string): string {
  return text.replace(/[^\w\s]/gi, "");
}
