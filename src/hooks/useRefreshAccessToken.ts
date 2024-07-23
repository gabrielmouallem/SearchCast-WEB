import api from "@/services/ApiService/ApiService";
import { useCookies } from ".";
import { useQuery } from "@tanstack/react-query";

export function useRefreshAccessToken() {
  const { updateCookie } = useCookies("access_token", "");

  const fetchAccessToken = async () => {
    const { data } = await api.get<{ access_token: string }>("/v1/refresh");
    updateCookie(data.access_token, 1);
    return data.access_token;
  };

  return useQuery({
    queryKey: ["refreshToken"],
    queryFn: fetchAccessToken,
    refetchOnMount: false,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
  });
}
