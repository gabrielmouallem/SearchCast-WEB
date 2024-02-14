import { Button } from "@/components";
import { TTranscription } from "@/types";
import { getFormatTime } from "@/utils/getFormatTime";
import { getHighlightText } from "@/utils/getHighlightText";
import { getSecondsToHMS } from "@/utils/getSecondsToHMS";
import { useExpandTranscription } from "./hooks/useExpandTranscription";

export function TranscriptionItem({
  videoId,
  searchText,
  watchUrl,
  text,
  start,
}: TTranscription & { searchText: string; watchUrl: string; videoId: string }) {
  const { isLoading, data, refetch, isFetched } = useExpandTranscription({
    videoId,
    start,
  });

  const transcriptionText = data ? data?.data?.text : text;
  const transcriptionStart = data ? data?.data?.start : start;

  const timeSuffix = getFormatTime(transcriptionStart);
  const videoLink = `${watchUrl}&t=${timeSuffix}`;
  return (
    <div className="border-t border-b border-border flex flex-col items-center justify-center text-center py-3 gap-4">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <div>"{getHighlightText(searchText, transcriptionText)}"</div>
      {!isFetched && (
        <Button
          className="scale-[65%] -my-[10px]"
          disabled={isLoading}
          onClick={() => refetch()}
        >
          {isLoading && "Carregando..."}
          {!isLoading && "Ver mais"}
        </Button>
      )}
      <a href={videoLink} className="underline" target="_blank">
        Ir para o trecho do vídeo {getSecondsToHMS(transcriptionStart)}
      </a>
    </div>
  );
}
