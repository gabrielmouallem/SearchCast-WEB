import { NextJsApiService } from "@/services/client";
import { useCookies } from ".";
import { useQuery } from "@tanstack/react-query";

export function useRefreshUser() {
  const { updateCookie } = useCookies("access_token", "");

  const fetch = async () => {
    const { data } = await NextJsApiService.get<{ access_token: string }>(
      "/api/refresh",
    );
    updateCookie(data.access_token, 1);
    return data.access_token;
  };

  return useQuery({
    queryKey: ["refreshToken"],
    queryFn: fetch,
    staleTime: 0, // Ensures the data is always considered stale
    refetchOnMount: true, // Ensures the query refetches on mount
    refetchOnWindowFocus: true,
  });
}
