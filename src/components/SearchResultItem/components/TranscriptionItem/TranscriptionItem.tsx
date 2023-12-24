import { TTranscription } from "@/types";
import { getFormatTime } from "@/utils/getFormatTime";
import { getHighlightText } from "@/utils/getHighlightText";
import { getSecondsToHMS } from "@/utils/getSecondsToHMS";

export function TranscriptionItem({
  searchText,
  watchUrl,
  text,
  start,
}: TTranscription & { searchText: string; watchUrl: string }) {
  const timeSuffix = getFormatTime(start);
  const videoLink = `${watchUrl}&t=${timeSuffix}`;
  return (
    <div className="border-t border-b border-border flex flex-col items-center justify-center text-center py-3 gap-4">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <div>"{getHighlightText(searchText, text)}"</div>
      <a href={videoLink} className="underline">
        Ir para o trecho do vídeo {getSecondsToHMS(start)}
      </a>
    </div>
  );
}
