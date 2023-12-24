import { TSearchResultItem } from "@/types";
import Image from "next/image";
import { Button } from "..";
import { useState } from "react";
import { TranscriptionItem } from "./components/TranscriptionItem/TranscriptionItem";

export function SearchResultItem({
  transcriptions,
  searchText,
  video,
}: TSearchResultItem & { searchText: string }) {
  const [showTranscriptions, setShowTranscriptions] = useState(false);

  const numberOfMoments = transcriptions?.length ?? 0;
  const title = video.title ?? "";
  const publishDate = new Date(video?.publishDate).toLocaleDateString();
  const viewCount = video?.viewCount ?? 0;
  const watchUrl = video?.watchUrl ?? "";
  const thumbnail = video.thumbnail.thumbnails?.at(-1);

  const rotateIconClassName = showTranscriptions ? "rotate-180" : "";

  function handleShowHideTranscriptions() {
    setShowTranscriptions((value) => !value);
  }

  return (
    <div className="max-w-736px flex flex-col gap-4">
      <div
        className="text-xl flex cursor-pointer z-50"
        onClick={handleShowHideTranscriptions}
      >
        <span className="flex-grow">
          {numberOfMoments} Momentos compatíveis
        </span>
        <div>
          <Image
            className={rotateIconClassName}
            src="/arrow_down_icon.svg"
            alt="Expand Arrow Icon"
            width={24}
            height={24}
            priority
          />
        </div>
      </div>
      <div className="self-center">
        <Image
          src={thumbnail?.url ?? ""}
          alt="Video Thumbnail"
          width={545}
          height={350}
          layout="responsive"
          placeholder="blur"
          blurDataURL="/video_placeholder.png"
          priority
        />
      </div>
      <div className="text-center">
        <div>{title}</div>
        <div>
          {publishDate} - {viewCount} Visualizações
        </div>
      </div>
      {showTranscriptions &&
        transcriptions.map((props) => (
          <TranscriptionItem
            key={`TranscriptionItem_${props.duration}_${props.start}_${props.text}`}
            {...props}
            watchUrl={watchUrl}
            searchText={searchText}
          />
        ))}
      {!showTranscriptions && (
        <Button
          className="w-fit self-center"
          onClick={handleShowHideTranscriptions}
        >
          Visualizar momentos compatíveis
        </Button>
      )}
    </div>
  );
}
