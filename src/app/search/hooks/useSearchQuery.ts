import { useCookies } from "@/hooks";
import api from "@/services/ApiService/ApiService";
import { TSearchResult } from "@/types";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useSearchQuery(text: string) {
  const router = useRouter();
  const cookies = useCookies("access_token", "");

  function fetch({
    text,
    pageParam,
    signal,
    ...options
  }: {
    text: string;
    pageParam: number;
    signal: AbortSignal;
  }) {
    return api
      .get<TSearchResult | undefined>("/v1/search_by_video", {
        params: { text, page: pageParam, ...options },
        signal,
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          router.push("/plans");
        } else if ([401, 402, 404].includes(err?.response?.status)) {
          cookies.updateCookie("", 1);
          router.push("/login");
        }
        if (typeof err?.response?.status === "number") {
          toast(
            "Erro ao realizar pesquisa. Tente procurar por algo mais específico ou tente novamente.",
            {
              position: "top-right",
              autoClose: 8000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              type: "error",
            },
          );
        }
        console.error(err); // Re-throw the error to indicate that the query has failed
        return undefined;
      });
  }

  return useInfiniteQuery({
    queryKey: [`search`],
    queryFn: ({ pageParam, signal }) => fetch({ text, pageParam, signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.results) return 1;
      // Check if lastPage or lastPage.data is undefined before accessing properties
      const nextPageCondition =
        lastPage?.data?.results?.length < 10 && lastPage?.data?.page > 1;
      const nextPage = nextPageCondition ? undefined : lastPage?.data?.page + 1;
      return nextPage;
    },
    enabled: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    refetchOnMount: false,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
}
