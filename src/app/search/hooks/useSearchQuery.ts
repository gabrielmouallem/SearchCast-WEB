import api from "@/services/ApiService/ApiService";
import { TSearchResult } from "@/types";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useSearchQuery(text: string) {
  const router = useRouter();

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
          toast.warn(
            "Erro ao realizar pesquisa. Por favor realize o pagamento para poder usar a ferramenta de pesquisa ou clique aqui para saber mais.",
            {
              position: "top-right",
              autoClose: 15000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              onClick: () => {
                const phoneNumber = "+5535998607515";
                const message = encodeURIComponent(
                  "Olá, gostaria de saber como realizar o pagamento e ter acesso a ferramenta SearchCast."
                );

                // Create the WhatsApp URL with the phone number and message
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

                // Open the WhatsApp URL in a new tab
                window.open(whatsappUrl, "_blank");
              },
              progress: undefined,
              theme: "dark",
            }
          );
        } else if ([401, 402, 404].includes(err?.response?.status)) {
          router.push("/login");
        }
        if (typeof err?.response?.status === "number") {
          toast.error(
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
            }
          );
        }
        console.error(err); // Re-throw the error to indicate that the query has failed
        return undefined;
      });
  }

  return useInfiniteQuery({
    queryKey: [`search`, text],
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
    enabled: text?.length >= 1,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    refetchOnMount: false,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
}
