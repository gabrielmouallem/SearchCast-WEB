"use client";
import { PythonApiService } from "@/services/client";
import { TTranscription } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useExpandTranscription({
  videoId,
  start,
}: {
  videoId: string;
  start: number;
}) {
  function fetchExpandTranscription() {
    return PythonApiService.get<TTranscription>(
      `/v1/expand-transcription?videoId=${videoId}&start=${start}`,
    );
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
