import { AutoSuggestService } from "@/services/client";
import { TSuggestions } from "@/types";
import { getAutosuggestionIsEnabled } from "@/utils/shared";
import { normalizeTextForSearch } from "@/utils/shared/normalizeTextForSearch";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

export function useSearchTextSuggestions(textToDebounce: string) {
  const text = useDebounce(textToDebounce, 500);

  function fetch({ text, signal }: { text: string; signal: AbortSignal }) {
    return AutoSuggestService.get<TSuggestions>(`/v7.0/Suggestions`, {
      params: { q: text, mkt: "pt-BR" },
      signal,
    })
      .then(async (res) => {
        let response = res;
        response.data.suggestionGroups = response.data.suggestionGroups.map(
          (el) => ({
            ...el,
            searchSuggestions: el.searchSuggestions.map((el) => {
              const { displayText } = el;
              const normalizedDisplayText = normalizeTextForSearch(displayText);
              return {
                ...el,
                displayText: normalizedDisplayText,
              };
            }),
          }),
        );
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  }

  return useQuery<TSuggestions>({
    queryKey: [`textSearchSuggestions`, text],
    queryFn: ({ signal }) => fetch({ text: textToDebounce, signal }),
    enabled: !!(textToDebounce?.length >= 2 && getAutosuggestionIsEnabled()),
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    refetchOnMount: false,
  });
}
