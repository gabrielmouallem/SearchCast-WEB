import React from "react";

export function getHighlightText(
  searchText: string,
  text: string,
): React.ReactNode {
  if (!searchText) {
    return <>{text}</>;
  }

  // Function to normalize the text (e.g., remove accents, convert to lower case)
  const normalize = (str: string): string =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Split the search text into an array of words
  const searchWords = searchText.split(/\s+/).map(normalize);

  // Create a regular expression to match any of the normalized search words
  const searchRegex = new RegExp(`(${searchWords.join("|")})`, "gi");

  // Split the normalized text into parts using the searchRegex
  const normalizedText = normalize(text);
  const parts = normalizedText.split(searchRegex);

  // Use the parts from normalized text to match with the original text
  let originalIndex = 0;

  return (
    <>
      {parts.map((part, i) => {
        const originalPart = text.slice(
          originalIndex,
          originalIndex + part.length,
        );
        originalIndex += part.length;

        return searchWords.some((word) => part === word) ? (
          <span key={i} style={{ backgroundColor: "#333741" }}>
            {originalPart}
          </span>
        ) : (
          <span key={i}>{originalPart}</span>
        );
      })}
    </>
  );
}
