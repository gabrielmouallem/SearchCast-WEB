import { AutoCompleteService } from "@/services/client";
// import { TSuggestions } from "@/types";
import { getAutosuggestionIsEnabled } from "@/utils/shared";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

export function useAutoCompleteSuggestions(textToDebounce: string) {
  const text = useDebounce(textToDebounce, 500);

  function fetch({ text, signal }: { text: string; signal: AbortSignal }) {
    return AutoCompleteService.get<any>(`/api/autocomplete`, {
      params: { qquery: text },
      signal,
    })
      .then((res) => {
        console.log({ autoCompleteData: res.data });
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  }

  return useQuery<any>({
    queryKey: [`autoCompleteSuggestions`, text],
    queryFn: ({ signal }) => fetch({ text: textToDebounce, signal }),
    enabled: !!(textToDebounce?.length >= 2 && getAutosuggestionIsEnabled()),
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    refetchOnMount: false,
  });
}
