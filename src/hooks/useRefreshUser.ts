import { NextJsApiService } from "@/services/client";
import { useCookies } from ".";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export function useRefreshUser() {
  const { handleLogout } = useAuth();
  const { updateCookie } = useCookies("access_token", "");

  const fetch = async () => {
    const { data } = await NextJsApiService.get<{ access_token: string }>(
      "/api/refresh",
    ).catch((err) => {
      if (err?.response?.status === 401) handleLogout();
      return err;
    });
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
