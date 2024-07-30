import { AutoSuggestService } from "@/services/client";
import { TSuggestions } from "@/types";
import { getAutosuggestionIsEnabled } from "@/utils/shared";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

export function useSearchTestSuggestions(textToDebounce: string) {
  const text = useDebounce(textToDebounce, 500);

  function fetch({ text, signal }: { text: string; signal: AbortSignal }) {
    return AutoSuggestService.get<TSuggestions>(`/v7.0/Suggestions`, {
      params: { q: text, mkt: "pt-BR" },
      signal,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
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
