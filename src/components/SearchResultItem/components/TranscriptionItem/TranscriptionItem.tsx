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
    <div className="flex flex-col items-center justify-center gap-4 border-b border-t border-border py-3 text-center">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <div>"(...) {getHighlightText(searchText, transcriptionText)} (...)"</div>
      {!isFetched && (
        <Button
          className="-my-[10px] scale-[65%]"
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
