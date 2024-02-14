"use client";
import api from "@/services/ApiService/ApiService";
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
    return api.get<TTranscription>(
      `/v1/expand-transcription?videoId=${videoId}&start=${start}`
    );
  }

  return useQuery({
    queryKey: ["refreshToken", videoId, start],
    queryFn: fetchExpandTranscription,
    enabled: false,
    refetchOnMount: false,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
  });
}
