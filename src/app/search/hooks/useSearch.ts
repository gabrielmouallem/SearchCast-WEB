import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { useSearchQuery } from "./useSearchQuery";

export function useSearch() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 1000);

  const {
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    data,
    fetchNextPage,
    refetch,
  } = useSearchQuery(debouncedText);

  return {
    text,
    debouncedText,
    setText,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    data,
    fetchNextPage,
    refetch,
  };
}
