import { PythonApiService } from "@/services/client";
import { useCookies } from ".";
import { useQuery } from "@tanstack/react-query";

export function useRefreshAccessToken() {
  const { updateCookie } = useCookies("access_token", "");

  const fetchAccessToken = async () => {
    const { data } = await PythonApiService.get<{ access_token: string }>(
      "/v1/refresh",
    );
    updateCookie(data.access_token, 1);
    return data.access_token;
  };

  return useQuery({
    queryKey: ["refreshToken"],
    queryFn: fetchAccessToken,
    staleTime: 0, // Ensures the data is always considered stale
    refetchOnMount: true, // Ensures the query refetches on mount
    refetchOnWindowFocus: false,
  });
}
