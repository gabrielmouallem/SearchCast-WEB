"use client";
import { useCookies } from "@/hooks";
import { NextJsApiService } from "@/services/client";
import { TTranscription } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useExpandTranscription({
  videoId,
  start,
}: {
  videoId: string;
  start: number;
}) {
  const cookies = useCookies("access_token", "");
  const router = useRouter();

  function fetchExpandTranscription() {
    return NextJsApiService.get<TTranscription>(
      `/api/expand-transcription?videoId=${videoId}&start=${start}`,
    ).catch((err) => {
      if (err?.response?.status === 403) {
        router.push("/plans");
      } else if ([401, 402, 404].includes(err?.response?.status)) {
        cookies.updateCookie("", 1);
        router.push("/login");
      }
    });
  }

  return useQuery({
    queryKey: ["expandTranscription", videoId, start],
    queryFn: fetchExpandTranscription,
    enabled: false,
    refetchOnMount: false,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
  });
}
