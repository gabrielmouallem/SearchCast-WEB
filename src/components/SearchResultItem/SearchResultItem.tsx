"use client";
import { TSearchResultItem } from "@/types";
import Image from "next/image";
import { Button, YoutubeVideo } from "..";
import { useState } from "react";
import { TranscriptionItem } from "./components/TranscriptionItem/TranscriptionItem";

export function SearchResultItem({
  transcriptions,
  searchText,
  options,
  video,
}: TSearchResultItem & {
  searchText: string;
  options?: {
    mockedText?: string;
  };
}) {
  const [showTranscriptions, setShowTranscriptions] = useState(false);

  const numberOfMoments = transcriptions?.length ?? 0;
  const videoId = video._id;
  const title = video.title ?? "";
  const publishDate = new Date(video?.publishDate).toLocaleDateString();
  const viewCount = video?.viewCount ?? 0;
  const watchUrl = video?.watchUrl ?? "";
  const thumbnail = video.thumbnail.thumbnails?.at(-1);

  const rotateIconClassName = showTranscriptions ? "rotate-180" : "";

  const blockSeeMoreButton = !!options?.mockedText;

  function handleShowHideTranscriptions() {
    setShowTranscriptions((value) => !value);
  }

  return (
    <div className="flex max-w-736px flex-col gap-4">
      <div
        className="z-40 flex cursor-pointer text-xl"
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
      <div className="aspect-video h-full w-screen !max-w-736px self-center bg-gray-600">
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
              disabled={blockSeeMoreButton}
              videoId={videoId}
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
