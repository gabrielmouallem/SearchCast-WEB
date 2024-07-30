import { useCookies, useUser } from "@/hooks";
import { api } from "@/services/client";
import { OrderByValue, TSearchResult } from "@/types";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { toast } from "react-toastify";
import { mockedSearchResultSwitchCase } from "./useSearchQuery.constants";
import { MockedTextOptions } from "./useSearchQuery.types";
import { AxiosResponse } from "axios";

interface SearchQueryOptions {
  mockedText?: string;
}

interface SearchQueryFilters {
  order_by?: OrderByValue;
}

interface useSearchQueryArgs {
  text: string;
  filters: SearchQueryFilters;
}

function getMockedDataForText(text: MockedTextOptions) {
  const data = mockedSearchResultSwitchCase[text];
  if (data) return data;
  return {
    data: {
      count: 0,
      page: 1,
      results: [],
    },
  } as AxiosResponse;
}

export function useSearchQuery(
  { text, filters }: useSearchQueryArgs,
  options?: SearchQueryOptions,
) {
  const user = useUser();
  const router = useRouter();
  const cookies = useCookies("access_token", "");

  async function fetch({
    text,
    filters,
    pageParam,
    signal,
    ...rest
  }: {
    text: string;
    filters: SearchQueryFilters;
    pageParam: number;
    signal: AbortSignal;
  }) {
    if (options?.mockedText) {
      return new Promise<AxiosResponse<TSearchResult>>((resolve, _reject) => {
        try {
          posthog.capture(
            "demo_search",
            {
              ...user,
              search: options?.mockedText,
            },
            {
              send_instantly: true,
            },
          );
        } catch (err) {
          console.error("Error trying to send 'demo_search' to Posthog", {
            err,
          });
        }
        setTimeout(() => {
          resolve(
            getMockedDataForText(options.mockedText as MockedTextOptions),
          );
        }, 2000);
      });
    }
    return api
      .get<TSearchResult | undefined>("/v1/search", {
        params: { text, page: pageParam, ...filters, ...rest },
        signal,
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          router.push("/plans");
        } else if ([401, 402, 404].includes(err?.response?.status)) {
          cookies.updateCookie("", 1);
          router.push("/login");
          posthog.reset();
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
    queryKey: [`search`, text, filters],
    queryFn: ({ pageParam, signal }) =>
      fetch({ text, filters, pageParam, signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.results) return 1;
      // Check if lastPage or lastPage.data is undefined before accessing properties
      const nextPageCondition =
        lastPage?.data?.results?.length < 10 && lastPage?.data?.page > 1;
      const nextPage = nextPageCondition ? undefined : lastPage?.data?.page + 1;
      return nextPage;
    },
    enabled: !!text?.length,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    refetchOnMount: false,
    staleTime: 1 * 1000 * 60 * 60, // 1 hour
    placeholderData: keepPreviousData,
  });
}
