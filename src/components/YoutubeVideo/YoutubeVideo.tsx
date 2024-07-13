import React from "react";

// eslint-disable-next-line react/display-name
export const YoutubeVideo = React.memo(({ videoId }: { videoId: string }) => (
  <iframe
    className="h-full w-full"
    src={`https://www.youtube.com/embed/${videoId}`}
    title="YouTube video player"
    allowFullScreen
  ></iframe>
));
