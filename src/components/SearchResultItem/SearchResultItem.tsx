"use client";
import { TSearchResultItem } from "@/types";
import Image from "next/image";
import { Button, YoutubeVideo } from "..";
import { useState } from "react";
import { TranscriptionItem } from "./components/TranscriptionItem/TranscriptionItem";

export function SearchResultItem({
  transcriptions,
  searchText,
  video,
}: TSearchResultItem & { searchText: string }) {
  const [showTranscriptions, setShowTranscriptions] = useState(false);

  const numberOfMoments = transcriptions?.length ?? 0;
  const videoId = video._id;
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
        className="text-xl flex cursor-pointer z-40"
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
      <div className="self-center aspect-video w-screen !max-w-736px h-full bg-gray-600">
        <div
          className="aspect-video bg-cover"
          style={{ backgroundImage: `url(${thumbnail?.url})` }}
        >
          <YoutubeVideo videoId={videoId} />
        </div>
      </div>
      <div className="text-center">
        <div>{title}</div>
        <div>
          {publishDate} - {viewCount} Visualizações
        </div>
      </div>
      {showTranscriptions &&
        transcriptions
          .sort((a, b) => a.start - b.start)
          .map((props) => (
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
          🔭 Visualizar momentos compatíveis
        </Button>
      )}
    </div>
  );
}
